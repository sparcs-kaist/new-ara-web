<template>
  <nav>
    <TheNavbarFetchProgressBar/>
    <router-link :to="{ name: 'home' }"> 홈 </router-link>
    <router-link :to="{ name: 'board'}"> 모아보기 </router-link>
    <router-link
      v-for="board in boardList"
      :key="board.id"
      :to="{
        name: 'board',
        params: {
          boardId: board.id
        }
      }">
      {{ board.ko_name }}
    </router-link>
    <router-link :to="{ name: 'settings' }"> {{ userNickname }}님 </router-link>
    <router-link :to="{ name: 'logout-handler' }"> 로그아웃 </router-link>
  </nav>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import TheNavbarFetchProgressBar from '@/components/TheNavbarFetchProgressBar.vue'

export default {
  name: 'the-navbar',
  computed: {
    ...mapState(['boardList']),
    ...mapGetters(['userNickname'])
  },
  methods: { ...mapActions(['fetchBoardList']) },
  mounted () {
    this.fetchBoardList()
  },
  components: { TheNavbarFetchProgressBar }
}
</script>

<style>
.notification.is-api-error {
  position: fixed;
  top: 1rem;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 40em;
}
</style>
