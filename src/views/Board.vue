<template>
  <TheLayout class="board">
    <template #aside>
      <TheSidebar searchable />
    </template>

    <TheBoard :board="board" :title="boardName" :from-query="fromQuery" />
  </TheLayout>
</template>

<script>
import store from '@/store'
import { fetchArticles } from '@/api'
import { fetchWithProgress } from './helper.js'
import TheBoard from '@/components/TheBoard.vue'
import TheLayout from '@/components/TheLayout.vue'
import TheSidebar from '@/components/TheSidebar.vue'

export default {
  name: 'board',

  data () {
    return {
      board: {},
      boardId: null
    }
  },

  computed: {
    boardName () { return store.getters.getNameById(this.boardId, this.$i18n.locale) },
    fromQuery () { return { from_view: this.boardId ? 'board' : 'all' } }
  },

  async beforeRouteEnter ({ params: { boardSlug }, query }, from, next) {
    const boardId = boardSlug ? store.getters.getIdBySlug(boardSlug) : null
    const [ board ] = await fetchWithProgress([ fetchArticles({ boardId, ...query }) ])
    next(vm => {
      vm.board = board
      vm.boardId = boardId
    })
  },

  async beforeRouteUpdate ({ params: { boardSlug }, query }, from, next) {
    const boardId = boardSlug ? store.getters.getIdBySlug(boardSlug) : null
    const [ board ] = await fetchWithProgress([ fetchArticles({ boardId, ...query }) ])
    this.board = board
    this.boardId = boardId
    next()
  },

  components: {
    TheBoard,
    TheLayout,
    TheSidebar
  }
}
</script>
