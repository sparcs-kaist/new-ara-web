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
      <button
        class="board__subscribe button"
        @click="toggleSubscribe"
      >
        <i v-if="toggle" class="material-icons toggle-on">
          notifications_active
        </i>
        <i v-else class="material-icons toggle-off">
          notifications_none
        </i>
      </button>

      <div class="board__options">
        <slot name="option" />
        <slot name="filter" />
        <slot name="order" />
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
import store from '@/store'
import SearchBar from '@/components/SearchBar.vue'
import ThePaginator from '@/components/ThePaginator.vue'
import TheBoardTable from '@/components/TheBoardTable.vue'
import Banner from '@/components/Banner.vue'
import { patchFCMTopic, getFCMTopic } from '@/api/user'
import { fetchWithProgress } from '@/views/helper'

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

  data () {
    return {
      user: {
        nickname: null,
        email: null,
        picture: null,
        pictureSrc: '',
        sexual: null,
        social: null,
        num_articles: null,
        num_comments: null,
        num_positive_votes: null
      },
      posts: null,
      blocks: null,
      updating: false,
      tabIndex: 0,
      isNicknameEditable: false,
      newNickname: null,
      mobileSettings: false
    }
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
        query.current = this.$route.query.page
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

  async beforeRouteEnter ({ query }, from, next) {
    const [ , posts, blocks ] = await fetchWithProgress([
      store.dispatch('fetchMe')
    ], 'myinfo-failed-fetch')

    const { userNickname, userEmail, userPicture, userConfig, userActivity } = store.getters

    next(vm => {
      vm.user = {
        nickname: userNickname,
        email: userEmail,
        pictureSrc: userPicture,
        sexual: userConfig.sexual,
        social: userConfig.social,
        num_articles: userActivity.articles,
        num_comments: userActivity.comments,
        num_positive_votes: userActivity.positiveVotes
      }

      vm.posts = posts
      vm.blocks = blocks

      document.title = vm.$t('document-title')
    })
  },

  methods: {
    async toggleSubscribe () {
      // 1. get current state of token
      // 2. if user did not subs board, do subs
      // 3. if user did subs board, then ask dialog, and release subs
      // FIXME: fix button align
      // FIXME: i18n english for delete-topic and add-topic
      // TODO: 전반적인 리디자인
      // TODO: 버튼 텍스트에 현재 구독이 되어있는지, 그렇지 않은지 띄우기
      // FIXME: 전체보기 게시판은 board_null 이 됨
      // TODO: extend board_boardId_boardTopic (board topic, not FCM topic) w/ backend
      const topics = await getFCMTopic()
      const curTopic = `board_${this.boardId}`
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

  &__subscribe {
    border: transparent;
    box-shadow: none;
    margin-bottom: 10px;
    background: transparent;
    color: #333333;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;

    &:hover {
      color: #ED3A3A;
      box-shadow: none;
      border: transparent;
      background: transparent;
    }
    &.toggle-on {
      color: #ED3A3A;
      box-shadow: none;
      border: transparent;
      background: transparent;
    }

    &.toggle-off {
      color: #333333;
      box-shadow: none;
      border: transparent;
      background: transparent;
    }
    .material-icons {
      font-size: 1.5rem;
      position: relative;
    }
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
