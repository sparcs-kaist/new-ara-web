<template>
  <div class="board">
    <!-- <slot name="title"/> -->

    <TheBoardTable :posts="board.results"/>

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
    board: { required: true }
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
