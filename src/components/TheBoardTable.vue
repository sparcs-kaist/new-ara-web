<template>
  <div class="board-table">
    <div v-for="post in posts" :key="post.id">
      <BoardItem
        :key="post.id"
        :post="post"
        :from-query="fromQuery"
      />
      <hr style="margin: 0">
    </div>
  </div>
</template>

<script>
import BoardItem from '@/components/BoardItem.vue'

export default {
  name: 'TheBoardTable',

  components: {
    BoardItem
  },

  props: {
    posts: Array,
    fromQuery: Object
  }
}
</script>

<style lang="scss">
.board-table {
  font-family: var(--font);
  width: 100%;
}
</style>
