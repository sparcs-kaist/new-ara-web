<template>
  <div>
    <TheBoard :board="board"/>
  </div>
</template>

<script>
import { fetchArticles } from '@/api'
import TheBoard from '@/components/TheBoard'

export default {
  name: 'board',
  data () {
    return {
      board: {}
    }
  },
  mounted () {
    const page = this.$route.query.page || 1
    fetchArticles(page).then(board => {
      this.board = board
    })
  },
  beforeRouteUpdate ({ params: { boardId }, query: { page = 1 } }, from, next) {
    fetchArticles(boardId, page).then(board => {
      this.board = board
    })
    next()
  },
  components: { TheBoard }
}
</script>

<style>

</style>
