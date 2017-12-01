<template>
  <div class="container">
    <div class="columns">
      <div class="column is-2"></div>
      <div class="column is-6">
        <div class="columns is-multiline">
          <div class="column is-6">
            <h4 class="hit-title">오늘 화제</h4>
            <hit-article class="article-item" v-for="article in bestArticles" :key="article.id" :article="article"></hit-article>
          </div>
          <div class="column is-6">
            <h4 class="hit-title">오늘 화제</h4>
            <hit-article class="article-item" v-for="article in bestArticles" :key="article.id" :article="article"></hit-article>
          </div>
          <div class="column is-6" v-for="board in articles" :key="board.id">
            <hr>
            <h4 class="board-title">
              <router-link class="board-title-router" :to="{ name: 'PostList', params: { board: boardNameList[board.id - 1] }}">
                {{ boardNameList[board.id - 1] }}
              </router-link>
            </h4>
            <recent-article class="article-item" v-for="article in board.recent_articles" :key="article.id" :article="article"></recent-article>
          </div>
        </div>
      </div>
      <div class="column is-2">
        <aside>
          <img class="banner" alt="광고">
          <div style="border: 1px black solid; height: 120px;">광고광고</div>
          <div style="background-color: green; height: 80px">광고광고</div>
        </aside>
      </div>
      <div class="column is-2"></div>
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
  },
  components: {
    HitArticle, RecentArticle,
  },
  async mounted() {
    await this.updateBoardList();
    this.$axios.get(`${this.apiUrl}/api/home`, { auth: this.auth })
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

  .hit-title {
    background-color: black;
    color: white;
    font-size: 18px;
    padding-left: 16px;
    padding-top: 4px;
    padding-bottom: 4px;
    margin-bottom: 20px;
  }

  .article-item {
    padding-left: 16px;
    padding-top: 3px;
    padding-bottom: 3px;
  }

  .board-title {
    font-size: 18px;
    padding-left: 16px;
    margin-bottom: 20px;
  }

  .board-title-router {
    color: #4a4a4a;
  }

  .board-title-router:hover {
    text-decoration: underline;
    cursor: pointer;
  }

  .container {
    font-size: 13px;
  }
</style>
