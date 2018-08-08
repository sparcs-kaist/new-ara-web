<template>
  <TheLayout>
    <TheBoard :board="adaptedArchive">
      <h1
        slot="title"
        class="title">
        담아두기
      </h1>
    </TheBoard>
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
  computed: {
    adaptedArchive () {
      const { archive } = this
      return {
        ...archive,
        results: archive.results &&
          archive.results.map(({ parent_article: article }) => article)
      }
    }
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
