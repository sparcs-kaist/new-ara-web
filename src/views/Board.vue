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
  },
  beforeCreate () {
    document.title = this.$t(`document-title.${this.$route.params.boardSlug}`)
  },
  beforeUpdate () {
    document.title = this.$t(`document-title.${this.$route.params.boardSlug}`)
  }
}
</script>

<i18n>
  ko:
    document-title:
      undefined: 'Ara - 모아보기'
      food: 'Ara - 식사이야기'
      archive: 'Ara - 담아두기'
      'portal-notice': 'Ara - 포탈공지'
      'organization-notice': 'Ara - 학생공지'
      qa: 'Ara - Q&A'
      wanted: 'Ara - Wanted'
      market: 'Ara - 장터'
  en:
    document-title:
      undefined: 'Ara - All'
      food: 'Ara - food'
      archive: 'Ara - Archive'
      'portal-notice': 'Ara - Portal Notice'
      'organization-notice': 'Ara - Organization Notice'
      qa: 'Ara - Q&A'
      wanted: 'Ara - Wanted'
      market: 'Ara - Buy & Sell'
</i18n>
