<template>
  <TheLayout class="board">
    <template #aside>
      <TheSidebar :listitems="recentArticles">
        {{ $t('recent') }}
      </TheSidebar>
      <TheSidebar :listitems="storedArticles">
        {{ $t('stored') }}
      </TheSidebar>
    </template>

    <TheBoard :board="board">
      <template #title>
        <h1 class="board-name">
          {{ boardName }}
        </h1>
      </template>
    </TheBoard>
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
      boardId: null,
      keywordToSearch: ''
    }
  },
  computed: {
    boardName () { return store.getters.getNameById(this.boardId, this.$i18n.locale) },
    recentArticles () { return this.board.recentArticles },
    storedArticles () { return this.board.storedArticles }
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

<i18n>
ko:
  search: '검색'
  new-post: '새글 쓰기'
  placeholder: '입력...'
  recent: '최근 본 글'
  stored: '담아둔 글'

en:
  search: 'Search'
  new-post: 'New post'
  placeholder: 'Keyword...'
  recent: 'recent articles'
  stored: 'stored articles'
</i18n>

<style lang="scss" scoped>
// @import '@/theme.scss';

.board-name {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
}
</style>
