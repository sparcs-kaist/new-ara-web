<template>
  <TheLayout>
    <template #aside>
      <TheSidebar />
    </template>

    <TheBoard :board="archive" :title="$t('archive')" :from-query="{ from_view: 'scrap' }" />
  </TheLayout>
</template>

<script>
import { fetchArchivedPosts } from '@/api'
import { fetchWithProgress } from './helper.js'
import TheBoard from '@/components/TheBoard.vue'
import TheLayout from '@/components/TheLayout.vue'
import TheSidebar from '@/components/TheSidebar.vue'

export default {
  name: 'archive',
  data () {
    return { archive: {} }
  },
  async beforeRouteEnter (to, from, next) {
    const [ archive ] = await fetchWithProgress([ fetchArchivedPosts() ])
    next(vm => { vm.archive = archive })
  },
  async beforeRouteUpdate (to, from, next) {
    const [ archive ] = await fetchWithProgress([ fetchArchivedPosts() ])
    this.archive = archive
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
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}
</style>
