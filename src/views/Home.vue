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
import store from '@/store'
import { fetchHome } from '@/api'
import { progressHandler } from './helper.js'
import TheLayout from '@/components/TheLayout.vue'

export default {
  name: 'home',
  data () {
    return {
      dailyBests: [],
      weeklyBests: [],
      boards: []
    }
  },
  async beforeRouteEnter (to, from, next) {
    store.commit('fetch/startProgress')
    try {
      const { dailyBests, weeklyBests, boards } = await fetchHome(progressHandler)
      next(vm => {
        vm.dailyBests = dailyBests
        vm.weeklyBests = weeklyBests
        vm.boards = boards
      })
    } catch (err) {
      // @TODO: Fetch 실패 안내..?
      next(false)
    }
    store.dispatch('fetch/endProgress')
  },
  components: { TheLayout }
}
</script>
