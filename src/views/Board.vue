<template>
  <div>
    <TheBoard :board="board"/>
  </div>
</template>

<script>
import store from '@/store'
import { progressHandler } from './helper'
import { fetchArticles } from '@/api'
import TheBoard from '@/components/TheBoard'

const fetch = ({ params: { boardId }, query }) => {
  store.commit('fetch/startProgress')
  return fetchArticles({ boardId, ...query }, progressHandler)
    .then(board => {
      store.dispatch('fetch/endProgress')
      return board
    })
}

export default {
  name: 'board',
  data () {
    return { board: {} }
  },
  beforeRouteEnter (to, from, next) {
    fetch(to).then(board => {
      next(vm => { vm.board = board })
    }).catch(() => { next(false) })
  },
  beforeRouteUpdate (to, from, next) {
    fetch(to).then(board => {
      this.board = board
      next()
    }).catch(() => { next(false) })
  },
  components: { TheBoard }
}
</script>

<style>

</style>
