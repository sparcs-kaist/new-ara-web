<template>
  <div class="post-comments">
    <div>댓글</div>
    <PostComment
      v-for="comment in comments"
      :key="comment.id"
      :comment="comment"
    />
    <textarea
      v-model="content"
      class="textarea new-comment"
      cols="10"
      rows="3"
    />
    <button
      @click="saveComment">
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
      content: ''
    }
  },
  methods: {
    // @TODO:
    // 1. 업로드하는 중에 disable
    // 2. 업로드 끝나면 폼 클리어
    // 3. 업로드 끝나면 fetch article해서 그 간의 댓글 보여주기
    // 4. 버튼 로딩 상태
    saveComment () {
      createComment({
        parent_article: this.postId,
        parent_comment: null,
        content: this.content
      })
    }
  },
  components: { PostComment }
}
</script>

<style>

</style>
