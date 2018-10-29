<template>
  <div class="pages">
    <router-link
      v-if="pageRangeMin !== 1"
      :to="routeTo(pageRangeMin - 1)">
      &lt;
    </router-link>
    <router-link
      v-for="page in pageRange"
      :key="page"
      :to="routeTo(page)"
      class="page"
      :class="{ 'is-active': page === currentPage }">{{ page }}</router-link>
    <router-link
      v-if="pageRangeMax > pageRangeMin + 9"
      :to="routeTo(pageRangeMin + 10)">
      &gt;
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
    pageRangeMin () {
      return Math.floor((this.currentPage - 1) / 10) * 10 + 1
    },
    pageRangeMax () {
      return Math.min(this.pageRangeMin + 9, this.numPages)
    },
    pageRange () {
      return range(this.pageRangeMin, this.pageRangeMax)
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
@import '@/theme.scss';
a.is-active {
  color: $theme-red;
}

.pages {
  margin: 0 -0.25rem;
  .page {
    margin: 0 0.25rem;
  }
}
</style>
