<template>
  <TheLayout class="home">
    <div class="home__searchbar">
      <TheHomeSearchbar />
    </div>

    <div class="columns is-multiline">
      <SmallBoard :listitems="dailyBests" class="column is-6" detail>
        {{ $t('today-best') }}
      </SmallBoard>

      <SmallBoard :listitems="weeklyBests" class="column is-6" detail is-home>
        {{ $t('weekly-best') }}
      </SmallBoard>
    </div>
  </TheLayout>
</template>

<script>
import { fetchHome } from '@/api'
import { fetchWithProgress } from './helper.js'
import SmallBoard from '@/components/SmallBoard.vue'
import TheHomeSearchbar from '@/components/TheHomeSearchbar.vue'
import TheLayout from '@/components/TheLayout.vue'

export default {
  name: 'home',
  data () {
    return {
      home: {}
    }
  },
  computed: {
    dailyBests () {
      if (!this.home.daily_bests) return []

      return this.home.daily_bests.recent_articles
    },
    weeklyBests () {
      if (!this.home.weekly_bests) return []

      return this.home.weekly_bests.recent_articles
    },
    boards () { return this.home.boards }
  },
  async beforeRouteEnter (to, from, next) {
    const [ home ] = await fetchWithProgress([ fetchHome() ])
    next(vm => { vm.home = home })
  },
  components: {
    SmallBoard,
    TheHomeSearchbar,
    TheLayout
  }
}
</script>

<i18n>
ko:
  today-best: '주간 검색 순위'
  weekly-best: '일간 검색 순위'
en:
  today-best: 'Today Best'
  weekly-best: 'Weekly Best'
</i18n>

<style lang="scss" scoped>
@import '@/theme.scss';
.home {
  background-size: 100% 380px;
  background-repeat: no-repeat;
  background-image: linear-gradient(to bottom, #fdf0f0, #ffffff);

  &__searchbar {
    display: flex;
    align-items: center;
    height: 300px;
  }
}

.columns {
  .column {
    padding: 0 20px 0 0;

    @media screen and (max-width: 768px){
      padding: 0;
    }
  }
}
</style>
