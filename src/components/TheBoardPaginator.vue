<template>
  <div>
    <router-link
      v-for="page in pageRange"
      :key="page"
      :to="{
        name: 'board',
        params: { boardSlug },
        query: { page }
      }"
      :class="{ 'is-active': page === currentPage }">
      {{ page }}
    </router-link>
  </div>
</template>

<script>
import { range } from '@/helper.js'

export default {
  name: 'the-board-paginator',
  props: {
    numPages: Number,
    currentPage: Number
  },
  computed: {
    pageRange () {
      return range(this.numPages)
    },
    // @TODO: $route에 대한 의존성 제거
    boardSlug () {
      return this.$route.params.boardSlug
    }
  }
}
</script>

<style scoped>
.is-active {
  color: black;
}
</style>
