<template>
  <aside class="sidebar column is-hidden-touch">
    <SearchBar class="sidebar__search" :searchable="searchable" />

    <SmallBoard :listitems="recentPosts" :fromQuery="{ from_view: 'recent' }" sidebar>
      {{ $t('recent') }}
    </SmallBoard>

    <SmallBoard :listitems="archiveList" :fromQuery="{ from_view: 'scrap' }" sidebar>
      {{ $t('archive') }}
    </SmallBoard>
  </aside>
</template>

<script>
import { mapState } from 'vuex'
import SearchBar from '@/components/SearchBar.vue'
import SmallBoard from '@/components/SmallBoard.vue'

export default {
  name: 'the-sidebar',

  data () {
    return {
      recent: [],
      archives: null
    }
  },

  props: {
    searchable: Boolean
  },

  computed: {
    archiveList () {
      return this.archivedPosts.slice(0, 5)
    },

    recentList () {
      return this.recentPosts.slice(0, 5)
    },

    ...mapState([ 'recentPosts', 'archivedPosts' ])
  },

  async mounted () {
    await this.$store.dispatch('fetchRecentPosts')
    await this.$store.dispatch('fetchArchivedPosts')
  },

  components: {
    SearchBar,
    SmallBoard
  }
}
</script>

<i18n>
ko:
  recent: '최근 본 글'
  archive: '담아둔 글'

en:
  recent: 'Recent Articles'
  archive: 'Bookmarks'
</i18n>

<style lang="scss" scoped>
@import '@/theme.scss';

.sidebar {
  max-width: 135px;
  margin-bottom: 2rem;
  font-family: var(--font);

  & > * {
    margin-bottom: 50px;
  }
}
</style>
