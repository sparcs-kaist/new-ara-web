<template>
  <div class="dialogs">
    <transition-group tag="div" name="dialog-fade">
      <AlertDialog v-for="dialog in dialogs" :dialog="dialog" :key="dialog.id" />
    </transition-group>

    <transition name="dialog-fade">
      <div class="dialogs__backdrop" v-if="needBackdrop"></div>
    </transition>
  </div>
</template>

<script>
import AlertDialog from '@/components/AlertDialog.vue'

export default {
  computed: {
    dialogs () {
      return this.$store.state.dialog.dialogs
    },

    needBackdrop () {
      return this.dialogs.some(dialog => !dialog.toast)
    }
  },

  components: { AlertDialog }
}
</script>

<style lang="scss" scoped>
.dialogs {
  &__backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .8);
    z-index: 31;
  }
}

.dialog-fade {
  &-enter-active, &-leave-active {
    transition: opacity var(--duration) var(--background-timing);
  }

  &-enter {
    opacity: 0;
  }

  &-leave-to {
    opacity: 0;
  }
}
</style>
