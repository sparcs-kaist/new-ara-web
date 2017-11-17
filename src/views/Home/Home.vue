<template>
  <div class="container">
    <aside>
      <img class="banner" alt="광고">
    </aside>
    <div class="columns is-multiline">
      <div class="column is-6">
        <h2>오늘 화제</h2>
        <hit-article v-for="article in todayBest" :key="article.id" :title="article.title" :hit="article.hit_count"></hit-article>
      </div>
      <div class="column is-6">
        <h2>이번주 화제</h2>
        <hit-article v-for="article in weeklyBest" :key="article.id" :title="article.title" :hit="article.hit_count"></hit-article>
      </div>
      <div class="column is-6" v-for="boardName in boardNameList" :key="boardName">
        <h2>{{ boardName }}</h2>
        <recent-article v-for="article in articles[boardName]" :key="article.id" :title="article.title" :time="'3시간 전'" :no-comments="2"></recent-article>
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
      todayBest: [],
      weeklyBest: [],
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
    getArticles() {
      this.$axios.get(`${this.apiUrl}/api/articles/home`, { auth: this.auth })
        .then((res) => {
          this.todayBest = res.data.todayBest;
          this.weeklyBest = res.data.weeklyBest;
          this.articles = res.data.articles;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  components: {
    HitArticle, RecentArticle,
  },
  mounted() {
    this.updateBoardList(this.getArticles);
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
