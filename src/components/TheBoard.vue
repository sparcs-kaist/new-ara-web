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
import Banner from '@/components/Banner.vue'

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
      if (this.$route.query.query) { return this.$t('search', { title: this.title, query: this.$route.query.query }) }

      return this.title
    },
    isBanner () {
      if (this.$route.name === 'my-info') { return false }
      return true
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
