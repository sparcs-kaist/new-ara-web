<template>
  <div class="board">
    <div class="board__banner">
      <!-- For html banner support.(ads or other special banners)-->
      <div v-html="direct_html" />
      <div v-if="!direct_html" class="board__banner__simple">
        <h1 class="board__banner__name">
          {{ bannerName }}
        </h1>
        <p class="board__banner__detail">
          {{ bannerDetail }}
        </p>
      </div>
    </div>
    <div class="board__header">
      <h1 v-if="!simplify" class="board__name">
        {{ queryTitle }}
        <slot name="title" />
      </h1>

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

    <TheBoardTable
      :posts="board.results"
      :from-query="fromQueryWithPage"
    />

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

export default {
  name: 'TheBoard',

  components: {
    SearchBar,
    ThePaginator,
    TheBoardTable
  },

  props: {
    board: {
      type: Object,
      required: true
    },
    title: String,
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
      if (this.$route.query.query) { return this.$t('search', { title: this.title, query: this.$route.query.query }) }

      return this.title
    },
    bannerName () {
      return '카이스트 신문고'
    },
    bannerDetail () {
      return '이 게시판은 교내 구성원들이 실명으로 학교에 의견을 제시하는 게시판입니다.\n투명하고 책임있는 의견 공유를 위해 의견 작성 시 본명이 공개되는 점 유의 바랍니다.'
    }
  }
}
</script>

<i18n>
ko:
  search: '{title}에서 {query} 검색'

en:
  search: 'Search {query} from {title}'
</i18n>

<style lang="scss" scoped>
@import '@/theme.scss';
.board {
  min-width: 100%;

  &__tablet-search {
    display: none;
    margin-bottom: 1rem;
  }

  &__mobile-search{
    display: flex;
    margin-top: 20px;
    width: 100%;
  }

  &__banner{
    position:relative;
    text-align: center;
    height: 160px;
    width: 100%;
    border-radius:10px;
    background-color:#333333;
    color: #EEEEEE;
    margin-bottom: 1rem;
    &__simple{
      width:100%;
      position:absolute;
      left:50%; top:50%;
      transform: translate(-50%, -50%);
    }
    &__name{
      font-size: 2.5rem;
      @include breakPoint(mobile) {
        font-size: 2rem;
      }
      font-weight: 700;
    }
    &__detail{
      white-space: pre-wrap;
      margin-top: 0.5rem;
      font-size: 0.85rem;
      @include breakPoint(mobile) {
        font-size: 0.7rem;
      }
    }
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

    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
  }
}
</style>
