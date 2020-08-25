<template>
  <aside class="sidebar column is-hidden-touch">
    <div class="sidebar__search field">
      <form class="control has-icons-right" @submit.prevent="search">
        <input class="input is-medium" name="query" type="text" v-model="searchText">
        <button class="icon is-small is-right" type="submit">
          <i class="material-icons">search</i>
        </button>
      </form>
    </div>

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
import SmallBoard from '@/components/SmallBoard.vue'

export default {
  name: 'the-sidebar',

  data () {
    return {
      recent: [],
      archives: null,
      searchText: ''
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

  methods: {
    search () {
      if (!this.searchable) {
        this.$router.push({ name: 'board', query: { query: this.searchText } })
        return
      }

      this.$router.push({ query: { query: this.searchText } })
    }
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
  archive: 'Bookmarks'
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

  &__search button.icon {
    cursor: pointer;
    background: transparent;
    border: none;
    pointer-events: auto;
  }
}
</style>
