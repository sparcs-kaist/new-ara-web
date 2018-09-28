<template>
  <TheLayout>
    <TheBoard :board="adaptedArchive">
      <div slot="title">
        <h1 id="title">
          {{ $t('archive') }}
        </h1>
      </div>
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
          archive.results
            .map(({ parent_article: article }) => article)
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
#title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}
</style>
