<template>
  <TheLayout class="home">
    <div class="columns is-multiline">
      <div class="today-best column is-6">
        <h2 class="board-name"> 투데이 베스트 </h2>
        <div
          v-for="article in dailyBests"
          :key="article.id">
          <h3 class="post-title">
            <router-link
              :to="{
                name: 'post',
                params: { postId: article.id }
              }">
              {{ article.title }}
            </router-link>
          </h3>
          <div class="post-time">
            <Timeago :time="article.created_at"/>
          </div>
        </div>
      </div>
      <div class="weekly-best column is-6">
        <h2 class="board-name"> 위클리 베스트 </h2>
        <div
          v-for="article in weeklyBests"
          :key="article.id">
          <h3 class="post-title">
            <router-link
              :to="{
                name: 'post',
                params: { postId: article.id }
              }">
              {{ article.title }}
            </router-link>
          </h3>
          <div class="post-time">
            <Timeago :time="article.created_at"/>
          </div>
        </div>
      </div>
      <div
        v-for="board in boards"
        :key="board.id"
        class="column is-6">
        <router-link
          :to="{
            name: 'board',
            params: { boardSlug: board.slug }
          }">
          <h2 class="board-name"> {{ board.ko_name }} </h2>
        </router-link>
        <div
          v-for="article in board.recent_articles"
          :key="article.id"
          class="post">
          <h3 class="post-title">
            <router-link
              :to="{
                name: 'post',
                params: { postId: article.id }
              }">
              {{ article.title }}
            </router-link>
          </h3>
          <div class="post-time">
            <Timeago :time="article.created_at"/>
          </div>
        </div>
      </div>
    </div>
  </TheLayout>
</template>

<script>
import { fetchHome } from '@/api'
import { fetchWithProgress } from './helper.js'
import TheLayout from '@/components/TheLayout.vue'
import Timeago from '@/components/Timeago.vue'

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
  components: { TheLayout, Timeago }
}
</script>

<style lang="scss" scoped>
.board-name {
  font-size: 1.5rem;
  font-weight: 700;
}
.post {
  display: flex;
  justify-content: space-between;
  // .post-title {
  // }
  // .post-time {
  // }
}
</style>
