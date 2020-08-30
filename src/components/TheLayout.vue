<template>
  <div class="layout">
    <TheNavbar/>
    <TheApiErrorNotification/>
    <div class="container">
      <div class="columns" :class="{ 'default-columns': isColumnLayout }">
        <slot name="aside"></slot>
        <template v-if="isColumnLayout">
          <div class="column">
            <slot />
          </div>
        </template>
        <template v-else>
          <slot />
        </template>
        <slot name="aside-right"></slot>
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
  components: { TheNavbar, TheAd, TheFooter, TheApiErrorNotification },
  props: {
    isColumnLayout: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/theme.scss";

.layout {
  min-width: 100%;
}

.container {
  margin-top: 50px;

  @include breakPoint(min) {
    margin-top: 10px;
  }
}

.columns {
  margin: 0px;
}

.default-columns {
  width: 100%;

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

    @include breakPoint(min) {
      margin-left: 10px;
      margin-right: 10px;

      &:first-child {
        margin-left: 10px;
      }

      &:last-child {
        margin-right: 10px;
      }
    }
  }
}
</style>
