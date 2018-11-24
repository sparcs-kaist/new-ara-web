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
  padding-right: 5rem;
  .board-navbar {
    display: flex;
    justify-content: space-between;
    .board-navbar-start {
      display: inline-block;
    }
  }
}
</style>
