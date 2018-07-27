<template>
  <TheLayout>
    <ThePostDetail :post="post"/>
    <ThePostComments
      :comments="post.comments"
      :postId="postId"
      @newCommentUploaded="addNewComment"
      @newRecommentUploaded="addNewRecomment"
    />
    <!-- @TODO: <TheBoard :board="board"/> -->
  </TheLayout>
</template>

<script>
import store from '@/store'
import { fetchPost } from '@/api'
import { progressHandler } from './helper.js'
import TheLayout from '@/components/TheLayout.vue'
import ThePostDetail from '@/components/ThePostDetail.vue'
import ThePostComments from '@/components/ThePostComments.vue'
import TheBoard from '@/components/TheBoard.vue'

export default {
  name: 'post',
  props: {
    postId: { required: true }
  },
  data () {
    return {
      post: {}
    }
  },
  methods: {
    async addNewComment(comment) {
      /* Save the new comment in local first. */
      this.post.comments = [
        ...this.post.comments,
        comment
      ]
      /* Then fetch data from DB. */
      this.post = await fetchPost({ postId: this.postId }, progressHandler);
    },
    async addNewRecomment(recomment) {
      /* Save the new recomment in local first. */
      const rootComment = this.post.comments.find(comment => comment.id === recomment.parent_comment)
      rootComment.comments = [
        ...rootComment.comments,
        recomment
      ]
      /* Then fetch data from DB. */
      this.post = await fetchPost({ postId: this.postId }, progressHandler);
    }
  },
  async beforeRouteEnter ({ params: { postId } }, from, next) {
    store.commit('fetch/startProgress')
    try {
      const post = await fetchPost({ postId }, progressHandler)
      next(vm => { vm.post = post })
    } catch (err) {
      next(false)
    }
    store.dispatch('fetch/endProgress')
  },
  async beforeRouteUpdate ({ params: { postId } }, from, next) {
    store.commit('fetch/startProgress')
    try {
      const post = await fetchPost({ postId }, progressHandler)
      this.post = post
      next()
    } catch (err) {
      next(false)
    }
    store.dispatch('fetch/endProgress')
  },
  components: { TheLayout, ThePostDetail, ThePostComments, TheBoard }
}
</script>

<style>

</style>
