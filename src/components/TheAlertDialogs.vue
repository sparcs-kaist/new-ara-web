<template>
  <div class="dialogs">
    <transition-group tag="div" name="dialog-fade">
      <AlertDialog v-for="dialog in dialogs" :dialog="dialog" :key="dialog.id" />
    </transition-group>

    <transition-group class="dialogs__toasts" tag="div" name="toast-fade">
      <AlertDialog v-for="dialog in toasts" :dialog="dialog" :key="dialog.id" />
    </transition-group>

    <transition name="dialog-fade">
      <div class="dialogs__backdrop" v-if="needBackdrop"></div>
    </transition>
  </div>
</template>

<script>
import AlertDialog from '@/components/AlertDialog.vue'

export default {
  name: 'TheAlertDialogs',

  computed: {
    dialogs () {
      return this.$store.state.dialog.dialogs.filter(dialog => !dialog.toast)
    },

    toasts () {
      return this.$store.state.dialog.dialogs.filter(dialog => dialog.toast)
    },

    needBackdrop () {
      return this.dialogs.length > 0
    }
  },

  components: { AlertDialog }
}
</script>

<style lang="scss" scoped>
.dialogs {
  &__toasts {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    position: fixed;
    top: 5vw;
    right: 5vw;
    max-width: 420px;
    width: 70%;
    z-index: 32;
  }

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

.toast-fade {
  &-enter-active, &-leave-active, &-move {
    transition: all var(--duration) var(--background-timing);
  }

  &-leave-active {
    position: absolute;
  }

  &-enter {
    opacity: 0;
  }

  &-leave-to {
    transform: translate(-20px, 0);
    opacity: 0;
  }
}
</style>
