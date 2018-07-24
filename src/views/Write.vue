<template>
  <div>
    작성/수정
    <ThePostWrite
      v-if="postFetched"
      :post="post"
    />
  </div>
</template>

<script>
import store from '@/store'
import { progressHandler } from './helper'
import { fetchPost } from '@/api'
import ThePostWrite from '@/components/ThePostWrite.vue'

export default {
  name: 'write',
  props: [ 'postId' ],
  data () {
    return {
      post: null
    }
  },
  computed: {
    postFetched () {
      return !this.postId || // 새로운 글을 작성하는 경우 바로 보여줌
        (this.postId && this.post) // 기존 글을 수정하는 경우 데이터 페치를 기다림
    }
  },
  beforeRouteEnter ({ params: { postId } }, from, next) {
    // 새로운 글을 작성하는 경우
    if (!postId) {
      next() // !주의: next는 한번만 호출돼야 함
    // 기존 글을 수정하는 경우
    } else {
      store.commit('fetch/startProgress')
      fetchPost({ postId }, progressHandler).then(post => {
        store.dispatch('fetch/endProgress')
        next(vm => { vm.post = post })
      }).catch(() => { next(false) })
    }
  },
  components: { ThePostWrite }
}
</script>

<style>

</style>
