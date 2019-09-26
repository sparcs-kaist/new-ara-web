<template>
  <div class="layout">
    <TheNavbar/>
    <TheApiErrorNotification/>
    <div class="container">
      <div class="columns">
        <div class="column">
          <slot/>
        </div>
        <!-- <aside
          class="column is-narrow">
          <TheAd/>
        </aside> -->
      </div>
    </div>
    <!-- <TheFooter/> -->
  </div>
</template>

<script>
import TheNavbar from '@/components/TheNavbar.vue'
import TheAd from '@/components/TheAd.vue'
import TheFooter from '@/components/TheFooter.vue'
import TheApiErrorNotification from '@/components/TheApiErrorNotification.vue'

export default {
  components: { TheNavbar, TheAd, TheFooter, TheApiErrorNotification }
}
</script>

<style lang="scss" scoped>
.layout {
  min-width: 100%;
}

.columns {
  width: 100%;
  margin: 0px;
}
</style>
