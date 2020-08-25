<template>
  <div class="board-table">
    <BoardItem v-for="post in posts" :post="post" :key="post.id" :fromQuery="fromQuery" />
  </div>
</template>

<script>
import BoardItem from '@/components/BoardItem.vue'

export default {
  name: 'TheBoardTable',
  props: [ 'posts', 'fromQuery' ],
  components: {
    BoardItem
  }
}
</script>

<style lang="scss">
.board-table {
  font-family: 'NanumSquareRound', sans-serif;
  width: 100%;
}
</style>
