<template>
  <div class="board-table">
    <div v-for="post in posts" :key="post.id" >
      <BoardItem :post="post" :key="post.id" :fromQuery="fromQuery" />
      <hr style="margin: 0"/>
    </div>
  </div>
</template>

<script>
import BoardItem from '@/components/BoardItem.vue'

export default {
  name: 'TheBoardTable',
  props: {
    posts: Array,
    fromQuery: Object
  },
  components: {
    BoardItem
  }
}
</script>

<style lang="scss">
.board-table {
  font-family: var(--font);
  width: 100%;
}
</style>
