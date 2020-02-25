<template>
  <TheLayout>
    <div class="columns is-multiline home">
      <div class="column is-6">
        <div class="board today-best">
          <h2 class="board-name"> {{ $t('today-best') }} </h2>
          <BoardTable :articles="dailyBests" minimized />
        </div>
      </div>
      <div class="column is-6">
        <div class="board weekly-best">
          <h2 class="board-name"> {{ $t('weekly-best') }} </h2>
          <BoardTable :articles="weeklyBests" minimized />
        </div>
      </div>
      <div
        v-for="board in boards"
        :key="board.id"
        class="column is-6">
        <div class="board">
          <router-link
            :to="{
              name: 'board',
              params: { boardSlug: board.slug }
            }">
            <h2 class="board-name"> {{ board[`${$i18n.locale}_name`] }} </h2>
          </router-link>
          <BoardTable :articles="board.recent_articles" minimized />
        </div>
      </div>
    </div>
  </TheLayout>
</template>

<script>
import { fetchHome } from '@/api'
import { fetchWithProgress } from './helper.js'
import BoardTable from '@/components/BoardTable.vue'
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
  components: { BoardTable, TheLayout, Timeago }
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
    padding: 0 10px;

    @media screen and (max-width: 768px) {
      padding: 0;
    }
  }
}

.board {
  padding: 20px;
  background: #fff;
  margin-bottom: 20px;

  .board-name {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0.5em;
  }
}
</style>
