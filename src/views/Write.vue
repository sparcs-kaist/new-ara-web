<template>
  <TheLayout>
    <ThePostWrite
      ref="write"
      v-if="postFetched"
      :post="post"
      :saving="saving"
      :empty-warnings="emptyWarnings"
      @save-post="savePost"
    />
  </TheLayout>
</template>

<script>
import { fetchPost, createPost, updatePost, uploadAttachments } from '@/api'
import { fetchWithProgress } from './helper.js'
import TheLayout from '@/components/TheLayout.vue'
import ThePostWrite from '@/components/ThePostWrite.vue'

export default {
  name: 'write',
  props: [ 'postId' ],
  data () {
    return {
      post: null,
      saving: false,
      saved: false,
      emptyWarnings: []
    }
  },
  computed: {
    isEditing () {
      return !!this.postId
    },
    postFetched () {
      return !this.isEditing || // 새로운 글을 작성하는 경우 바로 보여줌
        (this.isEditing && this.post) // 기존 글을 수정하는 경우 데이터 페치를 기다림
    }
  },
  methods: {
    async savePost (newArticle) {
      const { title, boardId, categoryId, isSexual, isSocial, attachments } = newArticle

      this.emptyWarnings = []
      if (title === '') {
        this.emptyWarnings.push('title')
      }

      if (this.$refs.write.getContent() === '<p></p>') {
        this.emptyWarnings.push('content')
      }

      if (boardId === '') {
        this.emptyWarnings.push('board')
      }

      if (categoryId === '$not-set') {
        this.emptyWarnings.push('category')
      }

      if (this.emptyWarnings.length > 0) {
        this.$store.dispatch('dialog/toast', {
          type: 'warning',
          text: this.$t('no-empty')
        })

        return
      }

      this.saving = true

      const uploadNeededFiles = attachments.filter(item => !item.uploaded)
      const attachmentUpdate = {}
      if (attachments) {
        try {
          const results = await uploadAttachments(uploadNeededFiles.map(v => v.file))

          uploadNeededFiles.forEach((item, index) => {
            attachmentUpdate[item.key] = results[index].data

            item.uploaded = true
            item.key = results[index].data.id
          })
        } catch (err) {
          this.$store.dispatch('dialog/toast', {
            type: 'error',
            text: this.$t('attachment-failed')
          })
          this.saving = false
          return
        }
      }

      const attachmentIds = attachments.map(item => item.key)
      this.$refs.write.updateAttachments(attachmentUpdate)

      const content = this.$refs.write.getContent()

      newArticle = {
        title,
        content,
        attachments: attachmentIds,
        parent_topic: categoryId,
        is_content_sexual: isSexual,
        is_content_social: isSocial
      }

      let result
      try {
        if (!this.isEditing) {
          result = await createPost({
            newArticle,
            boardId
          })
        } else {
          result = await updatePost({
            newArticle,
            postId: this.postId
          })
        }
      } catch (err) {
        /*
         * @TODO: 아마 attachment 삭제...?
         * 근데 그 때 강인이형 말로는 S3 가격 얼마 안 비싸서
         * 별로 상관 없다고 했던 것 같아용
         * - swan
         */

        this.$store.dispatch('dialog/toast', {
          type: 'error',
          text: this.isEditing ? this.$t('create-failed') : this.$t('update-failed')
        })
        this.saving = false
        return
      }
      this.saving = false
      this.saved = true
      window.removeEventListener('beforeunload', this.beforeUnloadHandler)
      this.$router.push({ name: 'post', params: { postId: result.id } })
    }
  },
  async beforeRouteEnter ({ params: { postId } }, from, next) {
    // 새로운 글을 작성하는 경우
    if (!postId) {
      next() // !주의: next는 한번만 호출돼야 함
    // 기존 글을 수정하는 경우
    } else {
      const [ post ] = await fetchWithProgress([ fetchPost({ postId }) ])
      next(vm => { vm.post = post })
    }
  },

  async beforeRouteLeave (to, from, next) {
    if (!this.saved) {
      const response = await this.$store.dispatch('dialog/confirm', this.$t('before-unload'))
      if (response) next()
      return
    }
    next()
  },
  mounted () {
    this.beforeUnloadHandler = event => {
      // 대부분의 경우에는 표시되지 않으나 일단 넣어둠
      event.returnValue = this.$t('before-unload')
    }
    window.addEventListener('beforeunload', this.beforeUnloadHandler)
  },
  destroyed () {
    window.removeEventListener('beforeunload', this.beforeUnloadHandler)
  },
  components: { TheLayout, ThePostWrite },
  beforeCreate () {
    document.title = this.$t('document-title')
  },
  beforeUpdate () {
    document.title = this.$t('document-title')
  }
}
</script>

<i18n>
ko:
  no-empty: '빈 칸을 채워주세요.'
  attachment-failed: '첨부파일 업로드에 실패했습니다. 용량을 다시 한번 확인해주세요.'
  create-failed: '글 작성에 실패했습니다. 다시 한 번 시도해주세요.'
  update-failed: '글 수정에 실패했습니다. 다시 한 번 시도해주세요.'
  before-unload: '이 포스트는 아직 저장되지 않았습니다! 정말 빠져나가시겠습니까?'
  document-title: 'Ara - 글쓰기'

en:
  no-empty: 'Please fill in the empty input.'
  attachment-failed: 'Failed to upload attachments. Please double check the size of files.'
  create-failed: 'Failed to write the post. Please try again after a while.'
  update-failed: 'Failed to update the post. Please try again after a while.'
  before-unload: 'This post is not saved yet. Are you sure to exit?'
  document-title: 'Ara Write'
</i18n>
