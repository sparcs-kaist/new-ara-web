<template>
  <div class="layout">
    <TheNavbar />
    <TheAlertDialogs />
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
  </div>
</template>

<script>
import TheAlertDialogs from '@/components/TheAlertDialogs.vue'
import TheNavbar from '@/components/TheNavbar.vue'

export default {
  components: { TheAlertDialogs, TheNavbar },
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

  @include breakPoint(mid) {
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

    &:not(:first-child) {
      flex: 1;
      max-width: 300px;

      @include breakPoint(mid) {
        max-width: 250px;
      }
    }

    &:last-child {
      flex: 3 1 0;
      margin-right: 0;
    }

    @include breakPoint(mid) {
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
