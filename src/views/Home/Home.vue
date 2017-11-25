<template>
  <div class="container">
    <aside>
      <img class="banner" alt="광고">
    </aside>
    <div class="columns is-multiline">
      <div class="column is-6">
        <h2>오늘 화제</h2>
        <hit-article v-for="article in bestArticles" :key="article.id" :title="article.title" :hit="article.hit_count"></hit-article>
      </div>
      <div class="column is-6">
        <h2>오늘 화제</h2>
        <hit-article v-for="article in bestArticles" :key="article.id" :title="article.title" :hit="article.hit_count"></hit-article>
      </div>
      <div class="column is-6" v-for="board in articles" :key="board.id">
        <h2>{{ boardNameList[board.id - 1] }}</h2>
        <recent-article v-for="article in board.recent_articles" :key="article.id" :title="article.title" :time="elapsedTime(article.created_at)" :id="article.id"></recent-article>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import HitArticle from './HitArticle';
import RecentArticle from './RecentArticle';

export default {
  data() {
    return {
      bestArticles: [],
      articles: {},
    };
  },
  computed: {
    ...mapState([
      'auth',
      'apiUrl',
    ]),
    ...mapGetters([
      'boardNameList',
    ]),
  },
  methods: {
    ...mapActions([
      'updateBoardList',
    ]),
    elapsedTime(createdAt) {
      const created = new Date(createdAt);
      const elapsed = new Date() - created;
      if (elapsed < 1000 * 60) {
        return '방금 전';
      } else if (elapsed < 1000 * 60 * 60) {
        return `${elapsed / 1000 / 60}분 전`;
      } else if (elapsed < 1000 * 60 * 60 * 24) {
        return `${elapsed / 1000 / 60 / 60}시간 전`;
      } else if (elapsed < 1000 * 60 * 60 * 24 * 3) {
        return `${elapsed / 1000 / 60 / 60 / 24}일 전`;
      }
      return `${created.getMonth() + 1}월 ${created.getDate()}일`;
    },
  },
  components: {
    HitArticle, RecentArticle,
  },
  async mounted() {
    await this.updateBoardList();
    this.$axios.get(`${this.apiUrl}/home`, { auth: this.auth })
      .then((res) => {
        this.bestArticles = res.data.best_articles;
        this.articles = res.data.boards;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

</script>

<style scoped>
.banner {
  width: 100%;
  height: 68px;
  color: white;
  border-color: transparent;
  background-color: grey;
}
</style>
