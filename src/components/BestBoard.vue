<template>
    <!-- <div class="columns is-multiline home"> -->
        <div class="board today-best column is-6">
            <h2 class="board-name"> {{ listitems[`${$i18n.locale}_name`] }} </h2>
            <div
            v-for="(article, index) in listitems.recent_articles"
            :key="article.id"
            class="post">
                <h3 class="post-title">
                    <router-link
                    :to="{
                        name: 'post',
                        params: { postId: article.id }
                    }">
                    {{index + 1}}. {{ article.title }}
                    </router-link>
                </h3>
                <div class="username">
                    {{article.created_by.profile.nickname}}
                </div>
            </div>
        </div>
    <!-- </div> -->
</template>

<script>
import { fetchHome } from '@/api'
import { fetchWithProgress } from '../views/helper.js'
import TheLayout from '@/components/TheLayout.vue'
import Timeago from '@/components/Timeago.vue'
import SparcsUrls from '@/components/SparcsUrls.vue'

export default {
  name: 'best-board',
  props: {
    listitems : {required : true}
  },
//   computed: {
//     dailyBests () { return home.dailyBests }
//     // weeklyBests () { return this.home.weeklyBests },
//     // boards () { return this.home.boards }
//   },
  async beforeRouteEnter (to, from, next) {
    const [ home ] = await fetchWithProgress([ fetchHome() ])
    // next(vm => { vm.home = home })
  }
//   components: { TheLayout, Timeago, SparcsUrls }
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
@import url('https://cdn.rawgit.com/innks/NanumSquareRound/master/nanumsquareround.min.css');

.board {
    width: 450px;
    margin-bottom: 2rem;
    font-family: 'NanumSquareRound',sans-serif;

    .board-name {
        font-size: 1.2rem;
        font-weight: 700;
        margin-bottom: 0.7em;
        padding-left: 1em;
        border-left: thick solid #ffafaf;
        
    }
    .post {
        border-left: thick solid transparent;
        display: flex;
        font-size: 1.0rem;
        justify-content: space-between;
        margin: 0.5rem 0;
        .username{
        color: gray;
        font-size: 0.7rem;
        }
        padding-left: 1em;
    }
    .article-wrapper-big {
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
        // added for multiline
        }
        .article-wrapper {
        display: flex;
        }
    }
}



</style>
