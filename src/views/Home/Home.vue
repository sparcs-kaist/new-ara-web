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
import HitArticle from './HitArticle';
import RecentArticle from './RecentArticle';

export default {
  components: {
    HitArticle, RecentArticle,
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
