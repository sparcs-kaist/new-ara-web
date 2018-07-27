<template>
  <TheLayout>
    <TheBoard :board="archive"/>
  </TheLayout>
</template>

<script>
import { fetchArchives } from '@/api'
import { fetchWithProgress } from './helper.js'
import TheLayout from '@/components/TheLayout.vue'
import TheBoard from '@/components/TheBoard.vue'

export default {
  name: 'archive',
  data () {
    return { archive: {} }
  },
  async beforeRouteEnter (to, from, next) {
    const [ archive ] = await fetchWithProgress([fetchArchives()])
    next(vm => { vm.archive = archive })
  },
  async beforeRouteUpdate (to, from, next) {
    const [ archive ] = await fetchWithProgress([fetchArchives()])
    this.archive = archive
    next()
  },
  components: { TheLayout, TheBoard }
}
</script>

<style>

</style>
