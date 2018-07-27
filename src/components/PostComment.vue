<template>
  <div class="post-comment">
    댓글by{{ comment.created_by }}: {{ comment.content }}
    <button
      @click="likeComment">
      추천
    </button>
    <button
      @click="dislikeComment">
      비추천
    </button>
    <div class="post-recomments">
      <PostRecomment
        v-for="recomment in comment.comments"
        :key="recomment.id"
        :recomment="recomment"
      />
    </div>
    <textarea
      v-model="content"
      class="textarea new-recomment"
      cols="10"
      rows="3"
    />
    <button
      class="button"
      :class="{ 'is-loading': isUploading }"
      @click="saveRecomment">
      새 대댓글
    </button>
  </div>
</template>

<script>
import { createComment } from '@/api'
import PostRecomment from '@/components/PostRecomment.vue'

export default {
  name: 'post-comment',
  props: {
    comment: { required: true }
  },
  data () {
    return {
      content: '',
      isUploading: false
    }
  },
  methods: {
    likeComment () {
      console.log('liked', this.comment.id)
    },
    dislikeComment () {
      console.log('disliked', this.comment.id)
    },
    async saveRecomment () {
      if (this.isUploading) return

      this.isUploading = true

      try {
        const result = await createComment({
          parent_article: null,
          parent_comment: this.comment.id,
          content: this.content
        })
        this.$emit('newRecommentUploaded', result.data)
        this.content = ''
      } catch (err) {
        // @TODO: 채팅 생성에 실패했다고 알려주기
        alert('Failed to write a recomment!');
      } finally {
        this.isUploading = false
      }
    }
  },
  components: { PostRecomment }
}
</script>

<style>

</style>
