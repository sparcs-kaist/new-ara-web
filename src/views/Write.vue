<template>
  <TheLayout>
    <ThePostWrite
      ref="write"
      v-if="postFetched"
      :post="post"
      :saving="saving"
      :isTitleEmpty="isTitleEmpty"
      :isContentEmpty="isContentEmpty"
      :isBoardEmpty="isBoardEmpty"
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
      isTitleEmpty: false,
      isContentEmpty: false,
      isBoardEmpty: false
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
      const { title, boardId, attachments } = newArticle
      if (title === '') {
        this.isTitleEmpty = true
      }
      if (this.$refs.write.getContent() === '<p></p>') {
        this.isContentEmpty = true
        alert('Cannot post empty article')
      }
      if (boardId === '') {
        this.isBoardEmpty = true
      }
      if (this.isTitleEmpty || this.isContentEmpty || this.isBoardEmpty) {
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
          /* @TODO: 에러 핸들링 */
          alert('Failed to upload attachments!')
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
        attachments: attachmentIds
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
        // @TODO: 에러 핸들링
        /*
         * @TODO: 아마 attachment 삭제...?
         * 근데 그 때 강인이형 말로는 S3 가격 얼마 안 비싸서
         * 별로 상관 없다고 했던 것 같아용
         * - swan
         */
        if (!this.isEditing) alert('Failed to create a post!')
        else alert('Failed to update the post!')
        this.saving = false
        return
      }
      this.saving = false
      this.$router.push({ name: 'post', params: { postId: result.data.id } })
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
  components: { TheLayout, ThePostWrite }
}
</script>

<style>

</style>
