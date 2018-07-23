<template>
  <div>
    <router-link
      v-for="page in pageRange"
      :key="page"
      :to="{ name: 'board', params: { boardId }, query: { page } }"
      :class="{ 'is-active': page === currentPage }">
      {{ page }}
    </router-link>
  </div>
</template>

<script>
import { range } from '@/helper'

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
    boardId () {
      return this.$route.params.boardId
    }
  }
}
</script>

<style scoped>
.is-active {
  color: black;
  text-decoration: underline;
}
</style>
