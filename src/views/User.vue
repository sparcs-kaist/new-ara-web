<template>
  <TheLayout>
    <TheBoard :board="board"/>
  </TheLayout>
</template>

<script>
import store from '@/store'
import { fetchArticles } from '@/api'
import { progressHandler } from './helper.js'
import TheLayout from '@/components/TheLayout.vue'
import TheBoard from '@/components/TheBoard.vue'

const fetch = ({ params: { username }, query }) => {
  store.commit('fetch/startProgress')
  return fetchArticles({ username, ...query }, progressHandler)
    .then(board => {
      store.dispatch('fetch/endProgress')
      return board
    })
}

export default {
  name: 'user',
  data () {
    return { board: {} }
  },
  beforeRouteEnter (to, from, next) {
    fetch(to).then(board => {
      next(vm => { vm.board = board })
    }).catch(() => { next(false) })
  },
  beforeRouteUpdate (to, from, next) {
    fetch(to).then(board => {
      this.board = board
      next()
    }).catch(() => { next(false) })
  },
  components: { TheLayout, TheBoard }
}
</script>

<style>

</style>
