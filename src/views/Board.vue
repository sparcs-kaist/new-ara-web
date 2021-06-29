<template>
  <TheLayout class="board">
    <template #aside-right>
      <TheSidebar searchable />
    </template>

    <TheBoard :board="board" :title="boardName" :from-query="fromQuery">
      <template #title v-if="topic">
        <span class="board__topic">
          {{ `#${topic[`${$i18n.locale}_name`]}` }}
        </span>
      </template>

      <template #option >
        <template v-if="topics && topics.length > 0">
          <div class="dropdown is-hoverable is-right board__filter">

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
        <template v-if="!$route.params.boardSlug">
          <div class="exclude">
            <span class="exclude__text">{{$t('exclude_portal')}}</span>
            <a class="exclude__change"
              @click="changeFilter"
              >
              <span class="icon is-flex-touch exclude__toggle">
                <i class="material-icons exclude__icon exclude__icon--on" v-if="$route.query.portal === 'exclude'">toggle_on</i>
                <i class="material-icons exclude__icon" v-else>toggle_off</i>
              </span>
            </a>
          </div>
        </template>
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
    boardName () {
      return this.$store.getters.getNameById(this.boardId, this.$i18n.locale)
    },
    fromQuery () {
      if (this.$route.query.portal === 'exclude') { return { from_view: '-portal' } }
      if (this.topicId) { return { from_view: 'topic' } }
      if (this.boardId) { return { from_view: 'board' } }

      return { from_view: 'all' }
    }
  },

  async beforeRouteEnter ({ params: { boardSlug }, query }, from, next) {
    let boardId
    let boardData

    // Portal-Notice filter
    if (query.portal === 'exclude') {
      boardId = store.state.boardList.filter(board => board.slug !== 'portal-notice').map(obj => obj.id)
      boardData = store.getters.getBoardById(null)
    } else {
      boardId = boardSlug ? store.getters.getIdBySlug(boardSlug) : null
      boardData = store.getters.getBoardById(boardId)
    }
    const topic = (query.topic && boardData)
      ? boardData.topics.find(topic => topic.slug === query.topic)
      : null

    const topicId = topic ? topic.id : null

    const [ board ] = await fetchWithProgress(
      [ fetchArticles({ boardId, topicId, ...query }) ], 'board-failed-fetch'
    )
    next(vm => {
      vm.board = board
      vm.boardId = boardId
      document.title = `Ara - ${vm.boardName}`
    })
  },

  async beforeRouteUpdate ({ params: { boardSlug }, query }, from, next) {
    let boardId

    // Portal-Notice filter
    if (query.portal === 'exclude') {
      boardId = store.state.boardList.filter(board => board.slug !== 'portal-notice').map(obj => obj.id)
    } else {
      boardId = boardSlug ? store.getters.getIdBySlug(boardSlug) : null
    }
    const topic = query.topic
      ? store.getters.getBoardById(this.boardId).topics.find(topic => topic.slug === query.topic)
      : null

    const topicId = topic ? topic.id : null

    const [ board ] = await fetchWithProgress(
      [ fetchArticles({ boardId, topicId, ...query }) ], 'board-failed-fetch'
    )
    this.board = board
    this.boardId = boardId
    document.title = `Ara - ${this.boardName}`
    next()
  },
  components: {
    TheBoard,
    TheLayout,
    TheSidebar
  },
  methods: {
    changeFilter () {
      if (this.$route.query.portal === 'exclude') {
        this.$router.push({ query: { ...this.$route.query, portal: undefined } })
      } else {
        this.$router.push({ query: { ...this.$route.query, portal: 'exclude' } })
      }
    }
  }
}
</script>

<i18n>
  ko:
    no-filter: '없음'
    filter: '필터'
    exclude_portal: '포탈 공지글 제외하기'

  en:
    no-filter: 'No Filter'
    filter: 'Filter'
    exclude_portal: 'Exclude portal notices'
</i18n>

<style lang="scss" scoped>
@import '@/theme.scss';
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

  .exclude {
    display: flex;
    align-items: center;
    margin: 1rem 0;

    @include breakPoint(min){
      margin-top: 0;
      margin-right: 1rem;
    }
    @include breakPoint(mobile) {
      font-size: 0.85rem;
      margin-right: 0;
    }

    &__toggle {
      margin-left: 12px;
      width: fit-content;

      & > i {
        font-size: 3rem;
      }

      @include breakPoint(mobile) {
        margin-left: 9px;

        & > i {
          font-size: 2.5rem;
        }
      }
    }

    &__icon {
      color: var(--grey-400);
      font-size: 2rem;
      height: initial;
      width: initial;

      @include breakPoint(mobile) {
        font-size: 1.75rem;
      }

      &--on {
        color: var(--theme-400);
      }
    }

    &__change {
      display: inline-flex;
    }
  }
</style>
