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
  name: 'board',
  data () {
    return { board: {} }
  },
  async beforeRouteEnter ({ params: { boardId }, query }, from, next) {
    store.commit('fetch/startProgress')
    try {
      const board = await fetchArticles({ boardId, ...query }, progressHandler)
      next(vm => { vm.board = board })
    } catch (err) {
      // @TODO: Fetch 실패 안내..?
      next(false)
    }
    store.dispatch('fetch/endProgress')
  },
  async beforeRouteUpdate ({ params: { boardId }, query }, from, next) {
    store.commit('fetch/startProgress')
    try {
      this.board = await fetchArticles({ boardId, ...query }, progressHandler)
      next()
    } catch (err) {
      // @TODO: Fetch 실패 안내..?
      next(false)
    }
    store.dispatch('fetch/endProgress')
  },
  components: { TheLayout, TheBoard }
}
</script>

<style>

</style>
