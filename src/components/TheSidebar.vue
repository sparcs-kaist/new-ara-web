<template>
  <aside class="sidebar column">
    <div class="sidebar__search field">
      <p class="control has-icons-right">
        <input class="input is-medium" type="text">
        <span class="icon is-small is-right">
          <i class="material-icons">search</i>
        </span>
      </p>
    </div>

    <SmallBoard :listitems="recentPosts" sidebar>
      {{ $t('recent') }}
    </SmallBoard>

    <SmallBoard :listitems="archiveList" sidebar>
      {{ $t('archive') }}
    </SmallBoard>
  </aside>
</template>

<script>
import { mapState } from 'vuex'
import SmallBoard from '@/components/SmallBoard.vue'

export default {
  name: 'the-sidebar',

  data () {
    return {
      recent: [],
      archives: null
    }
  },

  computed: {
    archiveList () {
      return this.archivedPosts
        .slice(0, 5)
        .map(({ parent_article: article }) => article)
    },

    recentList () {
      return this.recentPosts
        .slice(0, 5)
        .map(({ parent_article: article }) => article)
    },

    ...mapState([ 'recentPosts', 'archivedPosts' ])
  },

  async mounted () {
    await this.$store.dispatch('fetchRecentPosts')
    await this.$store.dispatch('fetchArchivedPosts')
  },

  components: {
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
  archive: 'Stored Articles'
</i18n>

<style lang="scss" scoped>
@import '@/theme.scss';

.sidebar {
  max-width: 135px;
  margin-bottom: 2rem;
  font-family: 'NanumSquareRound',sans-serif;

  & > * {
    margin-bottom: 50px;
  }
}
</style>
