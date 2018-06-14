<template>
  <div class="container">
    <div class="columns">
      <div class="column is-2 placeholder"></div>
      <div class="column is-6">
        <div class="columns is-multiline">
          <div class="column is-6">
            <h4 class="hit-title">오늘 화제</h4>
            <hit-article-list :articles="bestArticles['daily']"></hit-article-list>
          </div>
          <div class="column is-6">
            <h4 class="hit-title">이번 주 화제</h4>
            <hit-article-list :articles="bestArticles['weekly']"></hit-article-list>
          </div>
          <div class="column is-6" v-for="board in articles" :key="board.id">
            <hr>
            <h4 class="board-title">
              <router-link class="board-title-router" :to="{ name: 'PostList', params: { board: getBoardNameById(board.id) }}">
                {{ getBoardNameById(board.id) }}
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
      <div class="column is-2 placeholder"></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import HitArticleList from './HitArticleList';
import RecentArticle from './RecentArticle';

export default {
  data() {
    return {
      bestArticles: {
        daily: [],
        weekly: [],
      },
      articles: {},
    };
  },
  computed: {
    ...mapState([
      'apiUrl',
    ]),
    ...mapGetters([
      'getBoardNameById',
    ]),
  },
  components: {
    HitArticleList, RecentArticle,
  },
  async mounted() {
    this.$axios.get(`${this.apiUrl}/api/home`)
      .then((res) => {
        this.bestArticles = {
          daily: res.data.daily_bests,
          weekly: res.data.weekly_bests,
        };
        this.articles = res.data.boards;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

</script>

<style scoped>
  .container {
    font-size: 13px;
  }

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
  }

  .article-item {
    padding-top: 3px;
    padding-bottom: 3px;
  }

  .board-title {
    font-size: 18px;
    margin-bottom: 20px;
  }

  .board-title-router {
    color: #4a4a4a;
  }

  .board-title-router:hover {
    text-decoration: underline;
    cursor: pointer;
  }

  @media (min-width: 769px) {
    .hit-title {
      padding-left: 16px;
    }

    .article-item {
      padding-left: 16px;
    }

    .board-title {
      padding-left: 16px;
    }
  }

  @media (max-width: 768px) {
    .placeholder {
      padding: 0;
    }

    .container {
      padding: 10px;
    }

    .hit-title {
      padding-left: 6px;
    }

    .article-item {
      padding-left: 6px;
    }

    .board-title {
      padding-left: 6px;
    }

    hr {
      display: none;
    }
  }
</style>
