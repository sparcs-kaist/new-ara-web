<template>
  <div class="layout">
    <TheNavbar/>
    <TheApiErrorNotification/>
    <div class="container">
      <div class="columns">
        <slot name="aside"></slot>

        <div class="column">
          <slot/>
        </div>
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

.container {
  margin-top: 50px;
}

.columns {
  width: 100%;
  margin: 0px;

  & > * {
    margin: 0 25px;

    &:first-child {
      margin-left: 0;
    }

    &:not(:last-child) {
      flex: 1;
      max-width: 300px;
    }

    &:last-child {
      flex: 3 1 0;
      margin-right: 0;
    }
  }
}
</style>
