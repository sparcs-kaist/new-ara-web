<template>
  <nav>
    <router-link to="/">홈</router-link>
    <router-link
      v-for="board in boardList"
      :key="board.id"
      :to="`/board/${board.id}`">
      {{ board.ko_name }}
    </router-link>
    <router-link to="/setting"> {{ jwtPayload.username }}님 </router-link>
    <a href="/logout"> 로그아웃 </a>
  </nav>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'the-navbar',
  computed: {
    ...mapState(['boardList']),
    ...mapGetters(['jwtPayload'])
  },
  methods: { ...mapActions(['fetchBoardList']) },
  mounted () {
    this.fetchBoardList()
  }
}
</script>

<style>
.notification.is-api-error {
  position: absolute;
  top: 1rem;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 40em;
}
</style>
