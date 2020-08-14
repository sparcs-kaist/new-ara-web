<template>
  <TheLayout class="post">
    <template #aside>
      <TheSidebar />
    </template>

    <ThePostHeader :post="post"/>
    <ThePostDetail :post="post" />
    <ThePostComments
      :comments="post.comments"
      :postId="postId"
      @upload="addNewComment"
      @update="updateComment"
      @refresh="refresh"
    />
    <!-- @TODO: <TheBoard :board="board"/> -->
  </TheLayout>
</template>

<script>
import { fetchPost } from '@/api'
import { fetchWithProgress } from './helper.js'
import ThePostDetail from '@/components/ThePostDetail.vue'
import ThePostHeader from '@/components/ThePostHeader.vue'
import ThePostComments from '@/components/ThePostComments.vue'
import TheBoard from '@/components/TheBoard.vue'
import TheLayout from '@/components/TheLayout.vue'
import TheSidebar from '@/components/TheSidebar.vue'

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
      if (comment.parent_comment) {
        /* Save the new recomment in local first. */
        const rootComment = this.post.comments.find(parent => parent.id === comment.parent_comment)
        rootComment.comments = [
          ...rootComment.comments,
          comment
        ]
        /* Then fetch data from DB. */
        return this.refresh()
      }

      /* Save the new comment in local first. */
      this.post.comments = [
        ...this.post.comments,
        comment
      ]
      /* Then fetch data from DB. */
      return this.refresh()
    },

    async updateComment (update) {
      if (update.parent_comment) {
        const rootComment = this.post.comments.find(comment => comment.id === update.parent_comment)
        const replyIndex = rootComment.comments.findIndex(replyComment => replyComment.id === update.id)
        if (replyIndex < 0) return

        this.$set(rootComment.comments, replyIndex, update)
        return
      }

      const commentIndex = this.post.comments.findIndex(comment => comment.id === update.id)
      if (commentIndex < 0) return

      this.$set(this.post.comments, commentIndex, update)
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
  components: { TheLayout, ThePostComments, ThePostDetail, TheBoard, TheSidebar, ThePostHeader }
}
</script>

<style>

</style>
