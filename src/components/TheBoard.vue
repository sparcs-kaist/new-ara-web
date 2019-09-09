<template>
  <div class="board">
    <slot name="title"/>
    <TheBoardTable
      :articles="board.results"/>
    <div class="board-navbar">
      <div class="board-navbar-start">
        <ThePaginator
          :numPages="board.num_pages"
          :currentPage="board.current"
          :baseRouteTo="{
            name: 'board',
            params: { boardSlug }
          }">
        </ThePaginator>
      </div>
      <div class="board-navbar-end">
        <slot name="tools"/>
      </div>
    </div>
  </div>
</template>

<script>
import ThePaginator from '@/components/ThePaginator.vue'
import TheBoardTable from '@/components/TheBoardTable.vue'

export default {
  name: 'the-board',
  props: {
    board: { required: true }
  },
  computed: {
    // @TODO: $route에 대한 의존성 제거
    boardSlug () {
      return this.$route.params.boardSlug
    }
  },
  components: { ThePaginator, TheBoardTable }
}
</script>

<style lang="scss" scoped>
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
