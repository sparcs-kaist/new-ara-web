<template>
  <TheLayout>
    <TheBoard :board="board">
      <div slot="title">
        <h1 id="title">
          {{ $route.params.username }}
        </h1>
        <div class="title-description">
          사용자
        </div>
      </div>
    </TheBoard>
  </TheLayout>
</template>

<script>
import { fetchArticles } from '@/api'
import { fetchWithProgress } from './helper.js'
import TheLayout from '@/components/TheLayout.vue'
import TheBoard from '@/components/TheBoard.vue'

export default {
  name: 'user',
  data () {
    return { board: {} }
  },
  async beforeRouteEnter ({ params: { username }, query }, from, next) {
    const [ board ] = await fetchWithProgress([ fetchArticles({ username, ...query }) ])
    next(vm => { vm.board = board })
  },
  async beforeRouteUpdate ({ params: { username }, query }, from, next) {
    const [ board ] = await fetchWithProgress([ fetchArticles({ username, ...query }) ])
    this.board = board
    next()
  },
  components: { TheLayout, TheBoard }
}
</script>

<style>
#title {
  display: inline-block;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.title-description {
  display: inline-block;
  margin: 0 0.5rem;
  color: #888;
}
</style>
