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

    <SmallBoard :listitems="recent">
      {{ $t('recent') }}
    </SmallBoard>

    <SmallBoard :listitems="adaptedArchive">
      {{ $t('archive') }}
    </SmallBoard>
  </aside>
</template>

<script>
import { fetchArchives } from '@/api'
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
    adaptedArchive () {
      if (!this.archives || !this.archives.results) return []

      const results = this.archives.results.slice(0, 5)
      return results.map(({ parent_article: article }) => article)
    }
  },

  async mounted () {
    this.archives = await fetchArchives()
    // TODO recent viewed posts
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
  recent: 'recent articles'
  archive: 'stored articles'
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
