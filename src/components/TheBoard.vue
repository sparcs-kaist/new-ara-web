<template>
  <div class="board">
    <slot name="title"/>
    <TheBoardTable
      :articles="board.results"/>
    <div class="board-navbar">
      <div class="board-navbar-start">
        <TheBoardPaginator
          :numPages="board.num_pages"
          :currentPage="board.current"/>
      </div>
      <div class="board-navbar-end">
        <slot name="tools"/>
      </div>
    </div>
  </div>
</template>

<script>
import TheBoardPaginator from '@/components/TheBoardPaginator.vue'
import TheBoardTable from '@/components/TheBoardTable.vue'

export default {
  name: 'the-board',
  props: {
    board: { required: true }
  },
  components: { TheBoardPaginator, TheBoardTable }
}
</script>

<style lang="scss" scoped>
.board {
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
