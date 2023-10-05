<template>
  <TheLayout class="home">
    <div>
      <react-wrapper
        :component="HelloComponent"
        title="Hello"
      />
    </div>
    <div class="calendar">
      <react-wrapper
        :component="ReactCalendarComponent"
      />
    </div>
  </TheLayout>
</template>

<script>
import { fetchArticles, fetchHome } from '@/api'
import { fetchWithProgress } from '@/views/helper'
import store from '@/store'
import TheLayout from '@/components/TheLayout.vue'
import ReactCalendar from '@/react-migration/components/ReactCalendar'
import HelloWorld from '@/react-migration/components/hello.tsx'
import ReactWrapper from '@/components/ReactWrapper.vue'

export default {
  name: 'Calender',

  components: {
    TheLayout,
    ReactWrapper
  },

  data () {
    return {
      home: {},
      notice: []
    }
  },

  computed: {
    HelloComponent () {
      return HelloWorld
    },
    ReactCalendarComponent () {
      return ReactCalendar
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
}

.columns {
  margin: 0 -10px;

  .column {
    padding: 10px;
  }
}
</style>
