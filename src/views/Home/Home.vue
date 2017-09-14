<template>
  <div class="container">
    <aside>
      <img class="img banner" alt="광고">
    </aside>
    <div class="columns is-multiline">
      <div class="column is-6">
        <h2>오늘 화제</h2>
        <hit-article v-for="n in 5" :key="n" :title="'글 제목'" :hit="3"/>
      </div>
      <div class="column is-6">
        <h2>이번주 화제</h2>
        <hit-article v-for="n in 5" :key="n" :title="'글 제목'" :hit="3"/>
      </div>
      <div class="column is-6" v-for="board in ['PLAY', 'TALK', 'LOVE', 'SECRET', 'WANTED', 'BUY SELL']" :key="board">
        <h2>{{ board }}</h2>
        <recent-article v-for="n in 5" :key="n" :title="'글 제목'" :time="'3시간 전'" :no-comments="2"/>
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
  height: 86px;
  color: white;
  padding: 12px;
  border-color: transparent;
  background-color: grey;
}
</style>
