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
                class="input"
                type="text"
                placeholder="글 검색"
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
        <div class="write">
          <router-link
            :to="{
              name: 'write',
              query: {
                board: $route.params.boardSlug
              }
            }"
            class="button is-text">
            글 작성
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
      boardName: '',
      keywordToSearch: ''
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

<style scoped>
.board-name {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.search {
  display: inline-block;
}

.write {
  display: inline-block;
}
</style>
