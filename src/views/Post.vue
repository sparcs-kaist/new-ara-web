<template>
  <TheLayout>
    <ThePostDetail :post="post" @vote="refresh"/>
    <ThePostComments
      :comments="post.comments"
      :postId="postId"
      @new-comment-uploaded="addNewComment"
      @new-recomment-uploaded="addNewRecomment"
      @refresh="refresh"
    />
    <!-- @TODO: <TheBoard :board="board"/> -->
  </TheLayout>
</template>

<script>
import { fetchPost } from '@/api'
import { fetchWithProgress } from './helper.js'
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
    async addNewComment (comment) {
      /* Save the new comment in local first. */
      this.post.comments = [
        ...this.post.comments,
        comment
      ]
      /* Then fetch data from DB. */
      this.refresh()
    },
    async addNewRecomment (recomment) {
      /* Save the new recomment in local first. */
      const rootComment = this.post.comments.find(comment => comment.id === recomment.parent_comment)
      rootComment.comments = [
        ...rootComment.comments,
        recomment
      ]
      /* Then fetch data from DB. */
      this.refresh()
    },
    // @TODO: 매번 refresh 하는게 최선인지는 좀 생각해 봐야할듯
    async refresh () {
      this.post = await fetchPost({ postId: this.postId })
    }
  },
  async beforeRouteEnter ({ params: { postId } }, from, next) {
    const [ post ] = await fetchWithProgress([ fetchPost({ postId }) ])
    next(vm => { vm.post = post })
  },
  async beforeRouteUpdate ({ params: { postId } }, from, next) {
    const [ post ] = await fetchWithProgress([ fetchPost({ postId }) ])
    this.post = post
    next()
  },
  components: { TheLayout, ThePostDetail, ThePostComments, TheBoard }
}
</script>

<style>

</style>
