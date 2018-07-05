<template>
  <div class="post-comments">
    <div>댓글</div>
    <PostComment
      v-for="comment in comments"
      :key="comment.id"
      :comment="comment"/>
  </div>
</template>

<script>
import PostComment from '@/components/PostComment'

export default {
  name: 'the-post-comments',
  props: {
    comments: { required: true }
  },
  components: { PostComment }
}
</script>

<style>

</style>
