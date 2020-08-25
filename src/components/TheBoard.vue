<template>
  <div class="board">
    <div class="board-header">
      <h1 class="board-name">
        {{ queryTitle }}
        <slot name="title" />
      </h1>
    </div>
    <hr />

    <TheBoardTable :posts="board.results" :fromQuery="fromQueryWithPage" />

    <div class="board__navbar">
      <ThePaginator
        :numPages="board.num_pages"
        :currentPage="board.current">
      </ThePaginator>
    </div>
  </div>
</template>

<script>
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
  components: { ThePaginator, TheBoardTable }
}
</script>

<i18n>
ko:
  search: '{title}에서 {query} 검색'

en:
  search: 'Search {query} from {title}'
</i18n>

<style lang="scss" scoped>
.board-name {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
}

.board {
  min-width: 100%;

  .board-navbar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    @media screen and (max-width: 700px) {
      flex-direction: column;
    }

    .board-navbar-start {

      @media screen and (max-width: 700px) {
        margin-bottom: 1rem;
      }
    }

    .board-navbar-end {
      @media screen and (max-width: 700px) {
        width: 100%;
      }
    }
  }
}
</style>
