<template>
  <div class="pages">
    <router-link
      v-for="page in pageRange"
      :key="page"
      :to="{
        name: 'board',
        params: { boardSlug },
        query: paginatedQuery(page)
      }"
      class="page"
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
  },
  methods: {
    paginatedQuery (page) {
      return {
        ...this.$route.query,
        page
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.is-active {
  color: black;
  text-decoration: underline;
}
.pages {
  margin: 0 -0.25rem;
  .page {
    margin: 0 0.25rem;
  }
}
</style>
