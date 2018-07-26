<template>
  <TheLayout>
    <TheBoard :board="board"/>
  </TheLayout>
</template>

<script>
import store from '@/store'
import { fetchArchives } from '@/api'
import { progressHandler } from './helper.js'
import TheLayout from '@/components/TheLayout.vue'
import TheBoard from '@/components/TheBoard.vue'

export default {
  name: 'archive',
  data () {
    return { board: {}, archive: {} }
  },
  async beforeRouteEnter (to, from, next) {
    store.commit('fetch/startProgress')
    try {
      const board = await fetchArchives(progressHandler)
      next(vm => { vm.board = board })
    } catch (err) {
      // @TODO: Fetch 실패 안내..?
      next(false)
    }
    store.dispatch('fetch/endProgress')
  },
  async beforeRouteUpdate (to, from, next) {
    store.commit('fetch/startProgress')
    try {
      this.board = await fetchArchives(progressHandler)
      next()
    } catch (err) {
      // @TODO: Fetch 실패 안내..?
      next(false)
    }
    store.dispatch('fetch/endProgress')
  },
  components: { TheLayout, TheBoard }
}
</script>

<style>

</style>
