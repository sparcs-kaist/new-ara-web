<template>
  <TheLayout>
    <TheBoard :board="board">

      <div slot="title">
        <h1 class="board-name">
          {{ boardName }}
        </h1>
      </div>

      <div slot="tools">
        <div class="search">
          <div class="field has-addons">
            <div class="control">
              <input
                v-model="keywordToSearch"
                class="input input-search"
                type="text"
                placeholder="입력..."
              />
            </div>
            <div class="control">
              <router-link
                :to="{
                  query: {
                    query: this.keywordToSearch
                  }
                }"
                class="button is-text">
                검색
              </router-link>
            </div>
          </div>
        </div>
        <div class="write ">
          <router-link
            :to="{
              name: 'write',
              query: {
                board: $route.params.boardSlug
              }
            }"
            class="button button-write">
            새글 쓰기
          </router-link>
        </div>
      </div>

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
      boardId: null,
      keywordToSearch: ''
    }
  },
  computed: {
    boardName () {
      return store.getters.getNameById(this.boardId, this.$i18n.locale)
    }
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
  components: { TheLayout, TheBoard }
}
</script>

<style scoped>
/* @import '@/theme.scss'; */

.has-addons {
  border: 1px solid rgba(0,0,0,0.5);
  border-radius: 5px;
}

.board-name {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.search {
  display: inline-block;
  margin-right: 0.5rem;
}

.button-write {
  border: none;
  color: white;
  background-color: #ED3A3A;
}

.write {
  display: inline-block;
}
</style>
