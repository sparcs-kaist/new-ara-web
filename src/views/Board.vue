<template>
  <TheLayout class="board">
    <template #aside>
      <TheSidebar searchable />
    </template>

    <TheBoard :board="board" :title="boardName" :from-query="fromQuery">
      <template #title v-if="topic">
        <span class="board__topic">
          {{ `#${topic[`${$i18n.locale}_name`]}` }}
        </span>
      </template>

      <template #option v-if="topics && topics.length > 0">
        <div class="dropdown is-hoverable board__filter">

          <div class="dropdown-trigger">
            <a class="board__filter-trigger" aria-haspopup="true" aria-controls="dropdown-menu">
              {{ $t('filter') }}
              <i class="icon material-icons">filter_alt</i>
            </a>
          </div>

          <div class="dropdown-menu board__filter-menu">
            <div class="dropdown-content">
              <div class="dropdown-item board__filter-item">
                <router-link :to="{ query: { ...$route.query, topic: undefined } }">
                  {{ $t('no-filter') }}
                </router-link>
              </div>

              <div class="dropdown-item board__filter-item"
                v-for="topicItem in topics"
                :key="topicItem.id"
              >
                <router-link :to="{ query: { ...$route.query, topic: topicItem.slug } }">
                  {{ topicItem[`${$i18n.locale}_name`] }}
                </router-link>
              </div>
            </div>
          </div>
        </div>
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
      boardId: null
    }
  },

  computed: {
    topicId () { return this.$route.query.topic },
    topics () {
      const board = this.$store.getters.getBoardById(this.boardId)

      if (board) return board.topics
      return []
    },
    topic () { return this.topics.find(topic => topic.slug === this.topicId) },
    boardName () { return this.$store.getters.getNameById(this.boardId, this.$i18n.locale) },
    fromQuery () {
      if (this.topicId) { return { from_view: 'topic' } }

      if (this.boardId) { return { from_view: 'board' } }

      return { from_view: 'all' }
    }
  },

  async beforeRouteEnter ({ params: { boardSlug }, query }, from, next) {
    const boardId = boardSlug ? store.getters.getIdBySlug(boardSlug) : null
    const topic = query.topic
      ? store.getters.getBoardById(this.boardId).topics.find(topic => topic.slug === query.topic)
      : null

    const topicId = topic ? topic.id : null

    const [ board ] = await fetchWithProgress([ fetchArticles({ boardId, topicId, ...query }) ])
    next(vm => {
      vm.board = board
      vm.boardId = boardId
      document.title = `Ara - ${vm.boardName}`
    })
  },

  async beforeRouteUpdate ({ params: { boardSlug }, query }, from, next) {
    const boardId = boardSlug ? store.getters.getIdBySlug(boardSlug) : null
    const topic = query.topic
      ? store.getters.getBoardById(this.boardId).topics.find(topic => topic.slug === query.topic)
      : null

    const topicId = topic ? topic.id : null

    const [ board ] = await fetchWithProgress([ fetchArticles({ boardId, topicId, ...query }) ])
    this.board = board
    this.boardId = boardId
    document.title = `Ara - ${this.boardName}`
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
    no-filter: '없음'
    filter: '필터'

  en:
    no-filter: 'No Filter'
    filter: 'Filter'
</i18n>

<style lang="scss" scoped>
  .board {
    &__filter {
      padding: 10px 0;
      padding-right: 10px;
    }

    &__filter-trigger {
      display: inline-flex;
      font-weight: 500;

      .icon {
        margin-left: 10px;
      }
    }

    &__filter-menu {
      min-width: 6rem;
    }

    &__filter-item {
      display: flex;
      border-radius: 5px;
      margin: 0 5px;
      padding-top: 0;
      padding-bottom: 0;

      &:hover {
        background: var(--theme-100);
      }

      & > a {
        padding: 0.375rem 0;
        flex: 1;
      }
    }

    &__topic {
      color: var(--grey-400);
      font-size: 1rem;
    }
  }
</style>
