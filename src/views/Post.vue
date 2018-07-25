<template>
  <TheLayout>
    <ThePostDetail :post="post"/>
    <ThePostComments :comments="post.comments"/>
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
  beforeRouteEnter ({ params: { postId } }, from, next) {
    store.commit('fetch/startProgress')
    fetchPost({ postId }, progressHandler).then(post => {
      store.dispatch('fetch/endProgress')
      next(vm => { vm.post = post })
    }).catch(() => { next(false) })
  },
  beforeRouteUpdate ({ params: { postId } }, from, next) {
    store.commit('fetch/startProgress')
    fetchPost({ postId }, progressHandler).then(post => {
      store.dispatch('fetch/endProgress')
      this.post = post
      next()
    }).catch(() => { next(false) })
  },
  components: { TheLayout, ThePostDetail, ThePostComments, TheBoard }
}
</script>

<style>

</style>
