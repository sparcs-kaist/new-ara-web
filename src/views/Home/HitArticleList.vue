<template>
  <div>
    <div class="tabs is-fullwidth">
      <ul>
        <li :class="{ 'is-active': tab === POSITIVE_VOTE_COUNT }" @click="changeTab(POSITIVE_VOTE_COUNT)"><a>추천순</a></li>
        <li :class="{ 'is-active': tab === HIT_COUNT }" @click="changeTab(HIT_COUNT)"><a>조회순</a></li>
      </ul>
    </div>
    <hit-article class="article-item" v-for="article in articles[tab]" :key="article.id" :article="article"></hit-article>
  </div>
</template>

<script>
import HitArticle from './HitArticle';

const POSITIVE_VOTE_COUNT = 'positive_vote_count';
const HIT_COUNT = 'hit_count';

export default {
  data() {
    return {
      POSITIVE_VOTE_COUNT,
      HIT_COUNT,
      tab: POSITIVE_VOTE_COUNT,
    };
  },
  props: [
    'articles',
  ],
  methods: {
    changeTab(tab) {
      this.tab = tab;
    },
  },
  components: {
    HitArticle,
  },
};

</script>

<style scoped>

.article-item {
  padding-top: 3px;
  padding-bottom: 3px;
}

@media (min-width: 769px) {
  .article-item {
    padding-left: 16px;
  }
}

@media (max-width: 768px) {
  .article-item {
    padding-left: 6px;
  }
}
</style>
