<template>
  <div class="post-comments">
    <div>댓글</div>
    <PostComment
      v-for="comment in comments"
      :key="comment.id"
      :comment="comment"
      @new-recomment-uploaded="$emit('new-recomment-uploaded', $event)"
    />
    <textarea
      v-model="content"
      class="textarea new-comment"
      cols="10"
      rows="3"
    />
    <button
      @click="saveComment"
      class="button"
      :class="{ 'is-loading': isUploading }"
      :disabled="isUploading">
      새 댓글
    </button>
  </div>
</template>

<script>
import { createComment } from '@/api'
import PostComment from '@/components/PostComment.vue'

export default {
  name: 'the-post-comments',
  props: {
    comments: { required: true },
    postId: { required: true }
  },
  data () {
    return {
      content: '',
      isUploading: false
    }
  },
  methods: {
    async saveComment () {
      this.isUploading = true
      try {
        const result = await createComment({
          parent_article: this.postId,
          parent_comment: null,
          content: this.content
        })
        this.$emit('new-comment-uploaded', result.data)
        this.content = ''
      } catch (error) {
        // @TODO: 채팅 생성에 실패했다고 알려주기
        alert('Failed to write a comment!')
      } finally {
        this.isUploading = false
      }
    }
  },
  components: { PostComment }
}
</script>

<style>

</style>
