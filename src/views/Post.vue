<template>
  <TheLayout>
    <ThePostDetail :post="post"/>
    <ThePostComments
      :comments="post.comments"
      :postId="postId"
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
