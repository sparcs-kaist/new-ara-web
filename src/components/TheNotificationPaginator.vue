<template>
  <div class="pages">
    <router-link
      v-for="page in pageRange"
      :key="page"
      :to="{
        name: 'notifications',
        query: { page }
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
  name: 'the-notification-paginator',
  props: {
    numPages: Number,
    currentPage: Number
  },
  computed: {
    pageRange () {
      return range(this.numPages)
    },
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
