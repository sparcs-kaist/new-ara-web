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

export default {
  name: 'user',
  data () {
    return { board: {} }
  },
  async beforeRouteEnter ({ params: { username }, query }, from, next) {
    store.commit('fetch/startProgress')
    try {
      const board = await fetchArticles({ username, ...query }, progressHandler)
      next(vm => { vm.board = board })
    } catch (err) {
      next(false)
    }
    store.dispatch('fetch/endProgress')
  },
  async beforeRouteUpdate ({ params: { username }, query }, from, next) {
    store.commit('fetch/startProgress')
    try {
      const board = await fetchArticles({ username, ...query }, progressHandler)
      this.board = board
      next()
    } catch (err) {
      next(false)
    }
    store.dispatch('fetch/endProgress')
  },
  components: { TheLayout, TheBoard }
}
</script>

<style>

</style>
