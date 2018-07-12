<template>
  <div>
    <ThePostDetail :post="post"/>
    <ThePostComments :comments="post.comments"/>
    <!-- @TODO: <TheBoard :board="board"/> -->
  </div>
</template>

<script>
import store from '@/store'
import { progressHandler } from './helper'
import { fetchPost } from '@/api'
import ThePostDetail from '@/components/ThePostDetail'
import ThePostComments from '@/components/ThePostComments'
import TheBoard from '@/components/TheBoard'

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
  components: { ThePostDetail, ThePostComments, TheBoard }
}
</script>

<style>

</style>
