<template>
  <TheLayout>
    <template #aside-right>
      <TheSidebar searchable />
    </template>

    <TheBoard :board="board" :title="user.nickname" :from-query="{ from_view: 'user', created_by: user.user }">
      <template #title>
        <div class="title-description">
          사용자
        </div>
      </template>
    </TheBoard>
  </TheLayout>
</template>

<script>
import { fetchArticles, fetchUser } from '@/api'
import { fetchWithProgress } from './helper.js'
import TheBoard from '@/components/TheBoard.vue'
import TheLayout from '@/components/TheLayout.vue'
import TheSidebar from '@/components/TheSidebar.vue'

export default {
  name: 'user',
  data () {
    return { board: {}, user: {} }
  },

  async beforeRouteEnter ({ params: { username }, query }, from, next) {
    const [ board, user ] = await fetchWithProgress([
      fetchArticles({ username, ...query }),
      fetchUser(username)
    ], 'user-failed-fetch')
    document.title = `Ara - ${user.nickname}`
    next(vm => {
      vm.board = board
      vm.user = user
    })
  },
  async beforeRouteUpdate ({ params: { username }, query }, from, next) {
    const [ board, user ] = await fetchWithProgress([
      fetchArticles({ username, ...query }),
      fetchUser(username)
    ], 'user-failed-fetch')
    document.title = `Ara - ${user.nickname}`
    this.board = board
    this.user = user
    next()
  },
  components: {
    TheBoard,
    TheLayout,
    TheSidebar
  }
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
