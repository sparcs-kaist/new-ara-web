<template>
  <TheLayout>
    <TheBoard :board="board">
      <h1 slot="title"> {{ boardName }} </h1>
    </TheBoard>
  </TheLayout>
</template>

<script>
import store from '@/store'
import { fetchArticles } from '@/api'
import { fetchWithProgress } from './helper.js'
import TheLayout from '@/components/TheLayout.vue'
import TheBoard from '@/components/TheBoard.vue'

export default {
  name: 'board',
  data () {
    return {
      board: {},
      boardName: ''
    }
  },
  async beforeRouteEnter ({ params: { boardSlug }, query }, from, next) {
    const boardId = boardSlug ? store.getters.getIdBySlug(boardSlug) : null
    const [ board ] = await fetchWithProgress([ fetchArticles({ boardId, ...query }) ])
    next(vm => {
      vm.board = board
      vm.boardName = boardId ? store.getters.getNameById(boardId) : '모아보기'
    })
  },
  async beforeRouteUpdate ({ params: { boardSlug }, query }, from, next) {
    const boardId = boardSlug ? store.getters.getIdBySlug(boardSlug) : null
    const [ board ] = await fetchWithProgress([ fetchArticles({ boardId, ...query }) ])
    this.board = board
    this.boardName = boardId ? store.getters.getNameById(boardId) : '모아보기'
    next()
  },
  components: { TheLayout, TheBoard }
}
</script>

<style>

</style>
