<template>
  <div class="board">
    <Banner
      v-if="isBanner"
      :banner-name="title"
      :banner-details="bannerDetails"
      :banner-image="bannerImage"
    />
    <div class="board__header">
      <h1 v-if="!simplify" class="board__name">
        {{ queryTitle }}
        <slot name="title" />
      </h1>

      <div class="board__options">
        <slot name="option" />
        <slot name="filter" />
        <slot name="order" />
        <button
          class="board__subscribe button"
          @click="toggleSubscribe"
        >
          {{ $t("subscribe") }}
        </button>
        <SearchBar
          v-if="!simplify"
          class="board__tablet-search is-flex-touch is-hidden-mobile"
          searchable
        />
      </div>
    </div>
    <hr v-if="title && !simplify" class="board__divider">

    <TheBoardTable :posts="board.results" :from-query="fromQueryWithPage" />

    <div class="board__navbar">
      <ThePaginator
        :num-pages="board.num_pages"
        :current-page="board.current"
      />
    </div>
    <SearchBar
      :class="simplify ? 'is-hidden-desktop' : 'is-hidden-tablet'"
      class="board__mobile-search"
      searchable
      fullwidth
    />
  </div>
</template>

<script>
import SearchBar from '@/components/SearchBar.vue'
import ThePaginator from '@/components/ThePaginator.vue'
import TheBoardTable from '@/components/TheBoardTable.vue'
import Banner from '@/components/Banner.vue'
import { patchFCMTopic, getFCMTopic } from '@/api/user'

export default {
  name: 'TheBoard',

  components: {
    SearchBar,
    ThePaginator,
    TheBoardTable,
    Banner
  },

  props: {
    board: {
      type: Object,
      required: true
    },
    title: String,
    boardId: Number,
    bannerDetails: String,
    bannerImage: String,
    fromQuery: Object,
    simplify: Boolean
  },

  computed: {
    fromQueryWithPage () {
      const query = {
        ...this.fromQuery
      }

      if (this.$route.query.query) {
        query.search_query = this.$route.query.query
      }

      if (this.$route.query.page) {
        query.from_page = this.$route.query.page
      }

      return query
    },
    queryTitle () {
      if (this.$route.query.query) {
        return this.$t('search', {
          title: this.title,
          query: this.$route.query.query
        })
      }

      return this.title
    },
    isBanner () {
      if (this.$route.name === 'my-info') {
        return false
      }
      return true
    }
  },

  methods: {
    async toggleSubscribe () {
      // 1. get current state of token
      // 2. if user did not subs board, do subs
      // 3. if user did subs board, then ask dialog, and release subs
      // TODO: fix button align
      // TODO: i18n english
      // TODO: extend board/boardId/boardTopic (board topic, not FCM topic)
      const topics = await getFCMTopic()
      const curTopic = `board/${this.boardId}`
      if (topics.includes(curTopic)) {
        const result = await this.$store.dispatch('dialog/confirm', this.$t('confirm-delete-topic'))
        if (result) {
          await patchFCMTopic(null, [curTopic])
          await this.$store.dispatch('dialog/toast', this.$t('delete-topic'))
        }
      } else {
        const result = await this.$store.dispatch('dialog/confirm', this.$t('confirm-add-topic'))
        if (result) {
          await patchFCMTopic([curTopic], null)
          await this.$store.dispatch('dialog/toast', this.$t('add-topic'))
        }
      }
    }
  }
}
</script>

<i18n>
ko:
  search: '{title}에서 {query} 검색'
  subscribe: '알림 구독'
  confirm-add-topic: '정말로 이 게시판을 구독하시겠습니까? 이 게시판에 새로운 글이 올라올 때마다 알림이 오게 됩니다.'
  confirm-delete-topic: '이미 구독된 게시판입니다. 정말로 이 게시판 구독을 제거하시겠습니까? 더이상 알림을 받지 못하게 됩니다.'
  delete-topic: '구독 제거가 완료되었습니다.'
  add-topic: '구독 추가가 완료되었습니다.'

en:
  search: 'Search {query} from {title}'
  subscribe: 'Subscribe'
  confirm-add-topic: '정말로 이 게시판을 구독하시겠습니까? 이 게시판에 새로운 글이 올라올 때마다 알림이 오게 됩니다.'
  confirm-delete-topic: '이미 구독된 게시판입니다. 정말로 이 게시판 구독을 제거하시겠습니까? 더이상 알림을 받지 못하게 됩니다.'
  delete-topic: '구독 제거가 완료되었습니다.'
  add-topic: '구독 추가가 완료되었습니다.'
</i18n>

<style lang="scss" scoped>
@import "@/theme.scss";
.board {
  min-width: 100%;

  &__tablet-search {
    display: none;
    margin-bottom: 1rem;
  }

  &__mobile-search {
    display: flex;
    margin-top: 20px;
    width: 100%;
  }

  &__name {
    flex-shrink: 0;
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0 0 1rem 0;

    @include breakPoint(mobile) {
      font-size: 1.2rem;
    }
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }

  &__divider {
    margin: 0;
    background: #333333;
  }

  &__options {
    margin-left: auto;
    padding-left: 15px;

    align-items: center;
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
  }

}
</style>
