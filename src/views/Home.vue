<template>
  <TheLayout class="home">
    <div class="home__searchbar">
      <TheHomeSearchbar />
    </div>

    <div class="home__organizations">
      <TheOrganizations />
    </div>

    <div class="columns is-multiline">
      <SmallBoard :listitems="dailyBests" class="home__board column is-6" detail>
        {{ $t('today-best') }}
      </SmallBoard>

      <SmallBoard :listitems="weeklyBests" class="home__board column is-6" detail>
        {{ $t('weekly-best') }}
      </SmallBoard>
    </div>

    <div class="renew-popup">
      <RenewPopup />
    </div>
  </TheLayout>
</template>

<script>
import { fetchHome } from '@/api'
import { fetchWithProgress } from './helper.js'
import SmallBoard from '@/components/SmallBoard.vue'
import TheHomeSearchbar from '@/components/TheHomeSearchbar.vue'
import TheOrganizations from '@/components/TheOrganizations.vue'
import TheLayout from '@/components/TheLayout.vue'
import RenewPopup from '@/components/RenewPopup.vue'

export default {
  name: 'home',
  data () {
    return {
      home: {}
    }
  },
  computed: {
    dailyBests () {
      if (!this.home.daily_bests) {
        return []
      }

      return this.home.daily_bests
    },
    weeklyBests () {
      if (!this.home.weekly_bests) {
        return []
      }

      return this.home.weekly_bests
    }
  },
  async beforeRouteEnter (to, from, next) {
    const [ home ] = await fetchWithProgress([ fetchHome() ])
    next(vm => {
      vm.home = home
      document.title = vm.$t('document-title')
    })
  },
  components: {
    RenewPopup,
    SmallBoard,
    TheHomeSearchbar,
    TheOrganizations,
    TheLayout
  }
}
</script>

<i18n>
ko:
  today-best: '오늘의 인기글'
  weekly-best: '이주의 인기글'
  document-title: 'Ara - 홈'
en:
  today-best: 'Daily Best'
  weekly-best: 'Weekly Best'
  document-title: 'Ara - Home'
</i18n>

<style lang="scss" scoped>
@import '@/theme.scss';
.home {
  background-size: 100% 380px;
  background-repeat: no-repeat;
  background-image: linear-gradient(to bottom, var(--theme-100), transparent);

  &__searchbar {
    display: flex;
    align-items: center;
    height: 300px;
  }

  &__board {
    margin-top: 10px;
  }

  &__organizations {
    margin-bottom: 70px;
  }
}

.columns {
  margin: 0 -10px;

  .column {
    padding: 10px;
  }
}

.renew-popup{
  position:fixed;
  top:50%; left:50%;
  transform: translate(-50%,-50%);
  z-index:10000;
}
</style>
