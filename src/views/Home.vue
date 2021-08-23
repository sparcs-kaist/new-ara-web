<template>
  <TheLayout class="home">
    <div class="home__searchbar">
      <TheHomeSearchbar />
    </div>

    <div class="home__organizations">
      <TheOrganizations />
    </div>

    <div class="columns is-multiline">
      <SmallBoard :listitems="dailyBests" class="home__board column is-4" detail>
        {{ $t('today-best') }}
      </SmallBoard>

      <SmallBoard :listitems="weeklyBests" class="home__board column is-4" detail>
        {{ $t('weekly-best') }}
      </SmallBoard>

      <SmallBoard v-if="notice"
        :listitems="notice"
        :href="{
          name: 'board',
          params: {
            boardSlug: 'ara-notice'
          }
        }"
        class="home__board column is-4"
        detail
      >
        {{ $t('ara-notice') }}
      </SmallBoard>
    </div>

    <RenewPopup />
  </TheLayout>
</template>

<script>
import { fetchArticles, fetchHome } from '@/api'
import { fetchWithProgress } from './helper.js'
import store from '@/store'

import SmallBoard from '@/components/SmallBoard.vue'
import TheHomeSearchbar from '@/components/TheHomeSearchbar.vue'
import TheOrganizations from '@/components/TheOrganizations.vue'
import TheLayout from '@/components/TheLayout.vue'
import RenewPopup from '@/components/RenewPopup.vue'

export default {
  name: 'home',
  data () {
    return {
      home: {},
      notice: []
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
    const promises = [ fetchHome() ]

    const boardId = store.getters.getIdBySlug('ara-notice')
    if (boardId) {
      promises.push(fetchArticles({
        boardId,
        pageSize: 5
      }))
    }

    const [ home, notice ] = await fetchWithProgress(promises, 'home-failed-fetch')
    next(vm => {
      vm.home = home
      vm.notice = notice?.results
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
  ara-notice: '뉴아라 공지'
  document-title: 'Ara - 홈'
en:
  today-best: 'Daily Best'
  weekly-best: 'Weekly Best'
  ara-notice: 'Ara Notice'
  document-title: 'Ara - Home'
</i18n>

<style lang="scss" scoped>
@import '@/theme.scss';
.home {
  background-size: 100% 380px;
  background-repeat: no-repeat;

  // Warning! In safari, "transparent" is translated into rgba(0, 0, 0, 0)
  //          and, consequently, gradient will contain a strange black color.
  background-image: linear-gradient(to bottom, var(--theme-100), rgba(253, 240, 240, 0));

  &__searchbar {
    display: flex;
    align-items: center;
    height: 300px;

    @include breakPoint(mobile) {
      height: 150px;
    }
  }

  &__board {
    margin-top: 10px;
    border-right: 1px solid var(--grey-300);

    &:last-child {
      border-right: none;
    }

    @include breakPoint(mobile) {
      border: none;
    }
  }

  &__organizations {
    margin-bottom: 50px;

    @include breakPoint(mobile) {
      margin-bottom: 30px;
    }
  }
}

.columns {
  margin: 0 -10px;

  .column {
    padding: 10px;
  }
}
</style>
