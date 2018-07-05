<template>
  <div>
    <router-link
      v-for="n in pageRange"
      :key="n"
      :to="`/board/${boardId}/?page=${n}`"
      :class="{ 'is-active': n === currentPage }">
      {{ n }}
    </router-link>
  </div>
</template>

<script>
import { range } from '@/helper'

export default {
  name: 'board-paginator',
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
