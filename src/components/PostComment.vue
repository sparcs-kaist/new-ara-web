<template>
  <div class="post-comment">
    댓글by{{ comment.created_by }}: {{ comment.content }}
    <div class="post-recomments">
      <PostRecomment
        v-for="recomment in comment.comments"
        :key="recomment.id"
        :recomment="recomment"/>
    </div>
  </div>
</template>

<script>
import PostRecomment from '@/components/PostRecomment.vue'

export default {
  name: 'post-comment',
  props: {
    comment: { required: true }
  },
  components: { PostRecomment }
}
</script>

<style>

</style>
