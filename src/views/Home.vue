<template>
  <div class="home">
    <div v-for="board in boards" :key="board.id">
      <h2> 게시판: {{ board.ko_name }} </h2>
      <div v-for="article in board.recent_articles" :key="article.id">
        <h3> 제목: {{ article.title }} </h3>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchHome } from '@/api'

export default {
  name: 'home',
  data () {
    return {
      dailyBests: [],
      weeklyBests: [],
      boards: []
    }
  },
  methods: {
    fetchHome () {
      fetchHome().then(({ dailyBests, weeklyBests, boards }) => {
        this.dailyBests = dailyBests
        this.weeklyBests = weeklyBests
        this.boards = boards
      })
    }
  },
  mounted () {
    this.fetchHome()
  }
}
</script>
