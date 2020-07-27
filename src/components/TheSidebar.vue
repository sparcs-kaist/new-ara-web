<template>
  <aside class="sidebar">
    <h2 class="sidebar__name">
      <slot></slot>
    </h2>

    <SmallBoard :listitems="recentArticles">
      {{ $t('recent') }}
    </SmallBoard>

    <SmallBoard :listitems="adaptedArchive">
      {{ $t('stored') }}
    </SmallBoard>
  </aside>
</template>

<script>
import { fetchArchives } from '@/api'
import SmallBoard from '@/components/SmallBoard.vue'

export default {
  name: 'the-sidebar',

  data() {
    return {
      archives: null
    }
  },

  computed: {
    adaptedArchive() {
      if(!this.archives || !this.archives.results)
        return []

      const results = this.archives.results.slice(0, 5)
      return results.map(({ parent_article: article }) => article)
    }
  },

  async mounted() {
    this.archives = await fetchArchives()
  },

  components: {
    SmallBoard
  }
}
</script>

<i18n>
ko:
  recent: '최근 본 글'
  stored: '담아둔 글'

en:
  recent: 'recent articles'
  stored: 'stored articles'
</i18n>

<style lang="scss" scoped>
@import '@/theme.scss';

.sidebar {
  max-width: 135px;
  margin-bottom: 2rem;
  font-family: 'NanumSquareRound',sans-serif;

  &__name {
    font-size: 14px;
    font-weight: 700;
    margin-top: 48px;
    margin-right: 48px;
    margin-bottom: 1.5em;
    padding-left: 1.5em;
    border-left: thick solid #ffafaf;
  }

  .post {
    border-left: thick solid transparent;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    margin: 1em 0;
    padding-left: 1.5em;
  }
}
</style>
