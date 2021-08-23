<template>
  <div class="pages">
    <router-link
      v-if="pageRangeMin !== 1"
      :to="routeTo(pageRangeMin - 1)">

      <span class="icon">
        <i class="material-icons">navigate_before</i>
      </span>

    </router-link>
    <router-link
      v-for="page in pageRange"
      :key="page"
      :to="routeTo(page)"
      class="page"
      :class="{ 'is-active': page === currentPage }">{{ page }}</router-link>
    <router-link
      v-if="numPages > pageRangeMin + 9"
      :to="routeTo(pageRangeMin + 10)">

      <span class="icon">
        <i class="material-icons">navigate_next</i>
      </span>

    </router-link>
  </div>
</template>

<script>
import { range } from '@/helper.js'

export default {
  name: 'the-paginator',

  props: {
    numPages: Number,
    currentPage: Number
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
        query: this.paginatedQuery(page)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme.scss';
a.is-active {
  color: var(--theme-400);
}

.pages {
  display: flex;
  justify-content: center;
  margin: 0 -0.25rem;
  padding-top: 1rem;
  font-weight: bold;
  font-size: 13px;

  .page {
    margin: 0 0.5rem;
  }

  @include breakPoint(mobile){
    .page {
      margin: 0 0.4rem;
    }
  }
}

.icon{
  padding-top: 4px;
  width: 16px;
  height: 16px;
}
</style>
