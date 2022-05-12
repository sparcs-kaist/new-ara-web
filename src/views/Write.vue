<template>
  <TheLayout :key="postId">
    <ThePostWrite
      v-if="postFetched"
      ref="write"
      :post="post"
      :saving="saving"
      :empty-warnings="emptyWarnings"
      @save-post="savePost"
    />
  </TheLayout>
</template>

<script>
import { fetchPost, createPost, updatePost, uploadAttachments } from '@/api'
import { fetchWithProgress } from '@/views/helper'
import TheLayout from '@/components/TheLayout.vue'
import ThePostWrite from '@/components/ThePostWrite.vue'

export default {
  name: 'Write',

  components: {
    TheLayout,
    ThePostWrite
  },

  props: {
    postId: String
  },

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

  async beforeRouteEnter ({ params: { postId } }, from, next) {
    // 새로운 글을 작성하는 경우
    if (!postId) {
      next(vm => {
        document.title = vm.$t('document-title.write')
      }) // !주의: next는 한번만 호출돼야 함
    // 기존 글을 수정하는 경우
    } else {
      const [ post ] = await fetchWithProgress([ fetchPost({ postId, context: { override_hidden: true } }) ], 'write-failed-fetch')
      next(vm => {
        document.title = vm.$t('document-title.revise')
        vm.post = post
      })
    }
  },

  async beforeRouteUpdate ({ params: { postId } }, from, next) {
    if (!this.saved) {
      const response = await this.$store.dispatch('dialog/confirm', this.$t('before-unload'))
      if (!response) return
    }

    if (!postId) {
      document.title = this.$t('document-title.write')
      this.post = null
    } else {
      const [ post ] = await fetchWithProgress([ fetchPost({ postId }) ], 'write-failed-fetch')
      document.title = this.$t('document-title.revise')
      this.post = post
    }
    next()
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

      if (boardId === 14) {
        const response = await this.$store.dispatch('dialog/confirm', this.$t('before-realname-write'))
        if (!response) return
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
            text: this.$t('attachment-failed') + (err.apierr ? '\n' + err.apierr : '')
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
          text:
            (this.isEditing ? this.$t('create-failed') : this.$t('update-failed')) +
            (err.apierr ? '\n' + err.apierr : '')
        })
        this.saving = false
        return
      }
      this.saving = false
      this.saved = true
      window.removeEventListener('beforeunload', this.beforeUnloadHandler)
      this.$router.push({ name: 'post', params: { postId: result.id } })
    }
  }
}
</script>

<i18n>
ko:
  no-empty: '빈 칸을 채워주세요.'
  attachment-failed: '첨부파일 업로드에 실패했습니다. 용량을 다시 한 번 확인해주세요.'
  create-failed: '글 작성에 실패했습니다. 다시 한 번 시도해주세요.'
  update-failed: '글 수정에 실패했습니다. 다시 한 번 시도해주세요.'
  before-unload: "아직 게시글을 올리지 않았습니다!\n올리지 않고 나가시겠습니까?"
  before-realname-write: "이 게시판에 게시글을 작성하면 본인의 이름이 실명으로 올라가고, 본인의 닉네임과 개인 프로필은 공개되지 않습니다.\n정말로 글을 작성하시겠습니까?"
  document-title:
    write: 'Ara - 글쓰기'
    revise: 'Ara - 수정하기'

en:
  no-empty: 'Please fill in the empty input.'
  attachment-failed: 'Failed to upload attachments. Please double check the size of files.'
  create-failed: 'Failed to write the post. Please try again after a while.'
  update-failed: 'Failed to update the post. Please try again after a while.'
  before-unload: "This post is not posted yet.\nAre you sure to exit?"
  before-realname-write: "When you write a post in this board, your name will be posted as your real name, and your nickname and personal profile will not be revealed.\nAre you sure to write the post?"
  document-title:
    write: 'Ara - Write'
    revise: 'Ara - Revise'
</i18n>
