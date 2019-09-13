<template>
  <TheLayout>
    <div class="columns is-multiline home">
      <div class="board today-best column is-6">
        <h2 class="board-name"> {{ $t('today-best') }} </h2>
        <div
          v-for="article in dailyBests"
          :key="article.id"
          class="post">
          <h3 class="post-title">
            <router-link
              :to="{
                name: 'post',
                params: { postId: article.id }
              }">
              {{ article.title }}
            </router-link>
          </h3>
          <div class="post-time">
            <Timeago :time="article.created_at"/>
          </div>
        </div>
      </div>
      <div class="board weekly-best column is-6">
        <h2 class="board-name"> {{ $t('weekly-best') }} </h2>
        <div
          v-for="article in weeklyBests"
          :key="article.id"
          class="post">
          <h3 class="post-title">
            <router-link
              :to="{
                name: 'post',
                params: { postId: article.id }
              }">
              {{ article.title }}
            </router-link>
          </h3>
          <div class="post-time">
            <Timeago :time="article.created_at"/>
          </div>
        </div>
      </div>
      <div
        v-for="board in boards"
        :key="board.id"
        class="board column is-6">
        <router-link
          :to="{
            name: 'board',
            params: { boardSlug: board.slug }
          }">
          <h2 class="board-name"> {{ board[`${$i18n.locale}_name`] }} </h2>
        </router-link>
        <div
          v-for="article in board.recent_articles"
          :key="article.id"
          class="post">
          <h3 class="article-wrapper-big">
            <router-link
              :to="{
                name: 'post',
                params: { postId: article.id }
              }">
              <div class="article-wrapper">
                <span class="article-title"> {{ article.title }}
                </span> &nbsp
                <span class="comment-count">
                  ({{ article.comments_count }})
                </span>
              </div>
            </router-link>
          </h3>
          <div class="post-time">
            <Timeago :time="article.created_at"/>
          </div>
        </div>
      </div>
    </div>
  </TheLayout>
</template>

<script>
import { fetchHome } from '@/api'
import { fetchWithProgress } from './helper.js'
import TheLayout from '@/components/TheLayout.vue'
import Timeago from '@/components/Timeago.vue'

export default {
  name: 'home',
  data () {
    return {
      home: {}
    }
  },
  computed: {
    dailyBests () { return this.home.dailyBests },
    weeklyBests () { return this.home.weeklyBests },
    boards () { return this.home.boards }
  },
  async beforeRouteEnter (to, from, next) {
    const [ home ] = await fetchWithProgress([ fetchHome() ])
    next(vm => { vm.home = home })
  },
  components: { TheLayout, Timeago }
}
</script>

<i18n>
ko:
  today-best: '투데이 베스트'
  weekly-best: '위클리 베스트'
en:
  today-best: 'Today Best'
  weekly-best: 'Weekly Best'
</i18n>

<style lang="scss" scoped>
@import '@/theme.scss';
.columns {

  .column {
    padding: 0 20px 0 0;

    @media screen and (max-width: 768px){
      padding: 0;
    }

    .home {
  
      .board {
        margin-bottom: 2rem;

        .board-name {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.5em;
        }
        .post {
          display: flex;
          justify-content: space-between;
          margin: 0.5rem 0;
          .comment-count {
            color: $theme-red;
          }
        }
        .article-wrapper-big {
          width: 300px;
          @include breakPoint('min') {
            max-width: 170px;
          }
          @include breakPoint('min-mid') {
            max-width: 220px;
          }
          @include breakPoint('mid-max') {
            max-width: 250px;
          }
          @include breakPoint('max') {
            max-width: 400px;
          }
      
          .article-title {
            // width:100%;
            text-overflow:ellipsis;
            -o-text-overflow:ellipsis;
            overflow:hidden;
            white-space:nowrap;
            word-wrap:break-word !important;
            display: block;
            // added for multiline
          }
          .article-wrapper {
            display: flex;
          }
        }
      }
    }
  }
}


</style>
