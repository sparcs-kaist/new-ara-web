<template>
  <TheLayout class="home">
    <div v-for="board in boards" :key="board.id">
      <router-link
        :to="{
          name: 'board',
          params: { boardId: board.id }
        }">
        <h2> 게시판: {{ board.ko_name }} </h2>
      </router-link>
      <router-link
        v-for="article in board.recent_articles"
        :key="article.id"
        :to="{
          name: 'post',
          params: { postId: article.id }
        }">
        <h3> 제목: {{ article.title }} </h3>
      </router-link>
    </div>
  </TheLayout>
</template>

<script>
import { fetchHome } from '@/api'
import { fetchWithProgress } from './helper.js'
import TheLayout from '@/components/TheLayout.vue'

export default {
  name: 'home',
  data () {
    return {
      home: {}
    }
  },
  computed: {
    dailyBests () { return this.home.dailyBests },
    weeklyBests () { return this.home.weeklyBests },
    boards () { return this.home.boards }
  },
  async beforeRouteEnter (to, from, next) {
    const [ home ] = await fetchWithProgress([ fetchHome() ])
    next(vm => { vm.home = home })
  },
  components: { TheLayout }
}
</script>
