<template>
  <TheLayout>
    <TheBoard :board="board"/>
  </TheLayout>
</template>

<script>
import { fetchArticles } from '@/api'
import { fetchWithProgress } from './helper.js'
import TheLayout from '@/components/TheLayout.vue'
import TheBoard from '@/components/TheBoard.vue'

export default {
  name: 'board',
  data () {
    return { board: {} }
  },
  async beforeRouteEnter ({ params: { boardId }, query }, from, next) {
    const [ board ] = await fetchWithProgress([ fetchArticles({ boardId, ...query }) ])
    next(vm => { vm.board = board })
  },
  async beforeRouteUpdate ({ params: { boardId }, query }, from, next) {
    const [ board ] = await fetchWithProgress([ fetchArticles({ boardId, ...query }) ])
    this.board = board
    next()
  },
  components: { TheLayout, TheBoard }
}
</script>

<style>

</style>
