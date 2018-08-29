<template>
  <div class="pages">
    <router-link
      v-for="page in pageRange"
      :key="page"
      :to="routeTo(page)"
      class="page"
      :class="{ 'is-active': page === currentPage }">
      {{ page }}
    </router-link>
  </div>
</template>

<script>
import { range } from '@/helper.js'

export default {
  name: 'the-paginator',
  props: {
    numPages: Number,
    currentPage: Number,
    baseRouteTo: { required: true }
  },
  computed: {
    pageRange () {
      return range(this.numPages)
    }
  },
  methods: {
    paginatedQuery (page) {
      return {
        ...this.$route.query,
        page
      }
    },
    routeTo (page) {
      return {
        ...this.baseRouteTo,
        query: this.paginatedQuery(page)
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
