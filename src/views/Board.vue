/* eslint-disable no-fallthrough */
<template>
  <TheLayout class="board">
    <template #aside-right>
      <TheSidebar searchable />
    </template>

    <TheBoard
      :board="board"
      :title="boardName"
      :from-query="fromQuery"
      :banner-details="bannerDetail"
      :banner-image="bannerImage"
    >
      <template v-if="topic" #title>
        <span class="board__topic">
          {{ `#${topic[`${$i18n.locale}_name`]}` }}
        </span>
      </template>
      <template
        v-if="boardId === 14"
        #filter
        class="filter"
      >
        <div class="dropdown is-hoverable">
          <div class="dropdown-trigger">
            <button
              class="button"
              aria-haspopup="true"
              aria-controls="dropdown-menu"
            >
              <span>{{ selectedOrdering == 0? $t('positive-order') : $t('recent-order') }}</span>
              <span class="icon is-small">
                <i class="material-icons">expand_more</i>
              </span>
            </button>
          </div>
          <div
            id="dropdown-menu"
            class="dropdown-menu"
            role="menu"
          >
            <div class="dropdown-content">
              <a
                v-for="ordering in [1, 0]"
                :key="ordering"
                class="dropdown-item"
                @click="changeOrdering(ordering)"
              >
                {{ ordering == 0 ? $t('positive-order') : $t('recent-order') }}
              </a>
            </div>
          </div>
        </div>
      </template>
      <template
        v-if="boardId === 14"
        #order
        class="order"
      >
        <div class="dropdown is-hoverable">
          <div class="dropdown-trigger">
            <button
              class="button"
              aria-haspopup="true"
              aria-controls="dropdown-menu"
            >
              <span>{{ selectedFilter == 0? $t('answered') : selectedFilter ==1 ? $t('not-answered') : $t('all-post') }}</span>
              <span class="icon is-small">
                <i class="material-icons">expand_more</i>
              </span>
            </button>
          </div>
          <div
            id="dropdown-menu"
            class="dropdown-menu"
            role="menu"
          >
            <div class="dropdown-content">
              <a
                v-for="filter in [2, 0, 1]"
                :key="filter"
                class="dropdown-item"
                @click="changeFilter(filter)"
              >
                {{ filter==0? $t('answered') : (filter ==1 ? $t('not-answered') : $t('all-post')) }}
              </a>
            </div>
          </div>
        </div>
      </template>

      <template #option>
        <template v-if="topics && topics.length > 0">
          <div class="board__filter-menu-tags is-hidden-touch">
            <div
              class="board__filter-item-tag start-tag"
            >
              <p>
                {{ $t('filter') }}
              </p>
            </div>
            <div
              :class="{ 'board__filter-item-tag__selected' : (undefined === $route.query.topic) }"
              class="board__filter-item-tag"
            >
              <router-link :to="{ query: { ...$route.query, topic: undefined, page: 1 } }">
                {{ $t('no-filter') }}
              </router-link>
            </div>
            <div
              v-for="topicItem in topics"
              :key="topicItem.id"
              :class="{ 'board__filter-item-tag__selected' : (topicItem.slug === $route.query.topic) }"
              class="board__filter-item-tag"
            >
              <router-link :to="{ query: { ...$route.query, topic: topicItem.slug, page: 1 } }">
                {{ topicItem[`${$i18n.locale}_name`] }}
              </router-link>
            </div>
          </div>
          <div class="dropdown is-hoverable is-right board__filter is-hidden-desktop">
            <div class="dropdown-trigger">
              <a
                class="board__filter-trigger"
                aria-haspopup="true"
                aria-controls="dropdown-menu"
              >
                {{ $t('filter') }}
                <i class="icon material-icons">filter_alt</i>
              </a>
            </div>

            <div class="dropdown-menu board__filter-menu">
              <div class="dropdown-content">
                <div class="dropdown-item board__filter-item">
                  <router-link :to="{ query: { ...$route.query, topic: undefined, page: 1 } }">
                    {{ $t('no-filter') }}
                  </router-link>
                </div>

                <div
                  v-for="topicItem in topics"
                  :key="topicItem.id"
                  class="dropdown-item board__filter-item"
                >
                  <router-link :to="{ query: { ...$route.query, topic: topicItem.slug, page: 1 } }">
                    {{ topicItem[`${$i18n.locale}_name`] }}
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-if="!$route.params.boardSlug">
          <div class="exclude">
            <span class="exclude__text">{{ $t('exclude_portal') }}</span>
            <a class="exclude__change" @click="changePortalFilter">
              <span class="icon is-flex-touch exclude__toggle">
                <i v-if="$route.query.portal === 'exclude'" class="material-icons exclude__icon exclude__icon--on">toggle_on</i>
                <i v-else class="material-icons exclude__icon">toggle_off</i>
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
import { fetchWithProgress } from '@/views/helper'
import TheBoard from '@/components/TheBoard.vue'
import TheLayout from '@/components/TheLayout.vue'
import TheSidebar from '@/components/TheSidebar.vue'

export default {
  name: 'Board',

  components: {
    TheBoard,
    TheLayout,
    TheSidebar
  },

  data () {
    return {
      board: {},
      boardId: null,
      selectedOrdering: this.$route.query.ordering ? 0 : 1,
      selectedFilter: this.$route.query.communication_article__school_response_status ? 0 : (this.$route.query.communication_article__school_response_status__lt ? 1 : 2)
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
    bannerDetail () {
      return this.$store.getters.getBannerDescriptionById(
        this.boardId,
        this.$i18n.locale
      )
    },
    bannerImage () {
      return this.$store.getters.getBannerImageById(this.boardId)
    },
    fromQuery () {
      const { current } = this.board
      if (this.$route.query.portal === 'exclude') {
        return {
          from_view: '-portal',
          current
        }
      }
      if (this.topicId) {
        return {
          from_view: 'topic',
          topic_id: this.topicId,
          current
        }
      }
      if (this.boardId) {
        return {
          from_view: 'board',
          current
        }
      }
      return { from_view: 'all', current }
    }
  },

  async beforeRouteEnter ({ params: { boardSlug }, query }, from, next) {
    let boardId
    let boardData
    const filter = {}
    // Portal-Notice filter
    if (query.portal === 'exclude') {
      boardId = store.state.boardList.filter(board => board.slug !== 'portal-notice').map(obj => obj.id)
      boardData = store.getters.getBoardById(null)
    } else {
      boardId = boardSlug ? store.getters.getIdBySlug(boardSlug) : null
      boardData = store.getters.getBoardById(boardId)
    }
    if (query.communication_article__school_response_status === '2') {
      filter.communication_article__school_response_status = query.communication_article__school_response_status
    }
    if (query.communication_article__school_response_status__lt === '2') {
      filter.communication_article__school_response_status__lt = query.communication_article__school_response_status__lt
    }

    const topic = (query.topic && boardData)
      ? boardData.topics.find(topic => topic.slug === query.topic)
      : null

    const topicId = topic ? topic.id : null

    const [ board ] = await fetchWithProgress(
      [ fetchArticles({ boardId, topicId, ...query, filter }) ], 'board-failed-fetch'
    )
    next(vm => {
      vm.board = board
      vm.boardId = boardId
      document.title = `Ara - ${vm.boardName}`
    })
  },

  async beforeRouteUpdate ({ params: { boardSlug }, query }, from, next) {
    let boardId
    const filter = {}
    // Portal-Notice filter
    if (query.portal === 'exclude') {
      boardId = store.state.boardList.filter(board => board.slug !== 'portal-notice').map(obj => obj.id)
    } else {
      boardId = boardSlug ? store.getters.getIdBySlug(boardSlug) : null
    }
    if (query.communication_article__school_response_status === '2') {
      filter.communication_article__school_response_status = query.communication_article__school_response_status
    }
    if (query.communication_article__school_response_status__lt === '2') {
      filter.communication_article__school_response_status__lt = query.communication_article__school_response_status__lt
    }
    const topic = query.topic
      ? store.getters.getBoardById(this.boardId).topics.find(topic => topic.slug === query.topic)
      : null

    const topicId = topic ? topic.id : null
    const [ board ] = await fetchWithProgress(
      [ fetchArticles({ boardId, topicId, ...query, filter }) ], 'board-failed-fetch'
    )
    this.board = board
    this.boardId = boardId
    document.title = `Ara - ${this.boardName}`
    next()
  },

  methods: {
    changePortalFilter () {
      if (this.$route.query.portal === 'exclude') {
        this.$router.push({ query: { ...this.$route.query, portal: undefined } })
      } else {
        this.$router.push({ query: { ...this.$route.query, portal: 'exclude' } })
      }
    },
    changeOrdering (orderingOption) {
      switch (orderingOption) {
        case (1):
          this.selectedOrdering = 1
          this.$router.push({ query: { ...this.$route.query, ordering: '-created_at' } })
          break
        case (0):
          this.selectedOrdering = 0
          this.$router.push({ query: { ...this.$route.query, ordering: '-positive_vote_count, -created_at' } })
          break
        default:
          break
      }
    },
    changeFilter (filterOption) {
      switch (filterOption) {
        case (0):
          this.selectedFilter = 0
          this.$router.push({ query: { ...this.$route.query, communication_article__school_response_status: 2, communication_article__school_response_status__lt: undefined } })
          break
        case (1):
          this.selectedFilter = 1
          this.$router.push({ query: { ...this.$route.query, communication_article__school_response_status: undefined, communication_article__school_response_status__lt: 2 } })
          break
        default:
          this.selectedFilter = 2
          this.$router.push({ query: { ...this.$route.query, communication_article__school_response_status: undefined, communication_article__school_response_status__lt: undefined } })
          break
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
  positive-order: '추천순'
  recent-order: '최신순'
  all-post: '전체 보기'
  not-answered: '답변 미완'
  answered: '답변 완료'

en:
  no-filter: 'No Filter'
  filter: 'Filter'
  exclude_portal: 'Exclude portal notices'
  positive-order: 'Most Likes'
  recent-order: 'Recent'
  all-post: 'All'
  not-answered: 'Not answered'
  answered: 'Answered'
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

  &__filter-menu-tags {
    display: flex;
    margin-bottom: 0.8rem;
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

  &__filter-item-tag {
    display: flex;
    align-items: center;
    text-align: center;
    max-width: 5.45rem;
    // white-space: nowrap;
    padding-left: 0.40rem;
    padding-right: 0.40rem;
    border-right: 1px solid;
    font-size: 0.9rem;
    border-color: var(--grey-400);
    a {
      color: var(--grey-600);
    }
    &.start-tag {
      font-weight: 700;
    }
    &__selected {
      & > a{
        color: var(--theme-400);
        font-weight: 700;
      }
    }
  }

  &__topic {
    color: var(--grey-400);
    font-size: 1rem;
  }
}
.dropdown{
  margin: 5px;
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
