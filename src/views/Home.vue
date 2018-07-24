<template>
  <div class="home">
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
  </div>
</template>

<script>
import store from '@/store'
import { progressHandler } from './helper'
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
  beforeRouteEnter (to, from, next) {
    store.commit('fetch/startProgress')
    fetchHome(progressHandler).then(({ dailyBests, weeklyBests, boards }) => {
      store.dispatch('fetch/endProgress')
      next(vm => {
        vm.dailyBests = dailyBests
        vm.weeklyBests = weeklyBests
        vm.boards = boards
      })
    }).catch(() => { next(false) })
  }
}
</script>
