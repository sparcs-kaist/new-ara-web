<template>
  <div class="fetchbar" v-show="isFetching">
    <div class="fetch-progress"
      :style="{ width: progress * 100 + '%' }"></div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState('fetch', ['progress']),
    ...mapGetters('fetch', ['isFetching'])
  }
}
</script>

<style scoped>
.fetchbar {
  position: absolute;
  width: 100%;
  height: 2px;
}
.fetch-progress {
  height: 100%;
  background-color: var(--theme-400);
  box-shadow: 0 0 2px var(--theme-400);
  transition: width 0.1s ease;
}
</style>
