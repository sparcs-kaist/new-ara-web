<template>
  <div class="board">
    <BoardPaginator
      :numPages="board.num_pages"
      :currentPage="board.current"/>
    <div v-for="article in board.results"
      :key="article.id">
      <router-link
        :to="{ name: 'post', params: { postId: article.id } }">
        {{ article.title }}
      </router-link>
    </div>
  </div>
</template>

<script>
import BoardPaginator from '@/components/BoardPaginator'

export default {
  name: 'the-board',
  props: {
    board: { required: true }
  },
  components: { BoardPaginator }
}
</script>

<style>

</style>
