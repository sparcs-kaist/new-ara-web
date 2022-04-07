<template>
  <TheLayout>
    <template #aside-right>
      <TheSidebar />
    </template>
    <TheBoard
      :board="archive"
      :title="$t('archive')"
      :from-query="{ from_view: 'scrap' }"
    />
  </TheLayout>
</template>

<script>
import { fetchArchivedPosts } from '@/api'
import { fetchWithProgress } from '@/views/helper'
import TheBoard from '@/components/TheBoard.vue'
import TheLayout from '@/components/TheLayout.vue'
import TheSidebar from '@/components/TheSidebar.vue'

export default {
  name: 'Archive',

  components: {
    TheBoard,
    TheLayout,
    TheSidebar
  },

  async beforeRouteEnter ({ query }, from, next) {
    const [ archive ] = await fetchWithProgress([ fetchArchivedPosts(query) ], 'archive-failed-fetch')
    next(vm => {
      vm.archive = archive
      document.title = vm.$t('document-title')
    })
  },

  async beforeRouteUpdate ({ query }, from, next) {
    const [ archive ] = await fetchWithProgress([ fetchArchivedPosts(query) ], 'archive-failed-fetch')
    this.archive = archive
    next()
  },

  data () {
    return { archive: {} }
  }
}
</script>

<i18n>
ko:
  document-title: 'Ara - 담아두기'
  archive: '담아두기'
en:
  document-title: 'Archive'
  archive: 'Archive'
</i18n>

<style>
#title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}
</style>
