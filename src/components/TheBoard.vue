<template>
  <div class="board">
    <div class="board__header">
      <h1 class="board__name">
        {{ queryTitle }}
        <slot name="title" />
      </h1>

      <div class="board__options">
        <slot name="option" />
        <SearchBar class="board__tablet-search is-flex-touch is-hidden-mobile" searchable />
      </div>
    </div>
    <hr class="board__divider" v-if="title" />

    <TheBoardTable :posts="board.results" :fromQuery="fromQueryWithPage" />

    <div class="board__navbar">
      <ThePaginator
        :numPages="board.num_pages"
        :currentPage="board.current">
      </ThePaginator>
    </div>
    <SearchBar class="board__mobile-search is-hidden-tablet" searchable fullwidth />
  </div>
</template>

<script>
import SearchBar from '@/components/SearchBar.vue'
import ThePaginator from '@/components/ThePaginator.vue'
import TheBoardTable from '@/components/TheBoardTable.vue'

export default {
  name: 'the-board',
  props: {
    board: { required: true },
    title: { type: String },
    fromQuery: {}
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
    }
  },
  components: {
    SearchBar,
    ThePaginator,
    TheBoardTable
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
