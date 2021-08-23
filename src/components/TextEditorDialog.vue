<template>
  <div class="text-editor-dialog">
    <transition name="dialog-fade">
      <div class="text-editor-dialog__inner" v-if="shown">
        <div class="text-editor-dialog__backdrop" @click="hideDialog()"></div>
        <section class="dialog">
          <header class="dialog__header">
            <h2 class="dialog__title">
              <slot name="title"></slot>
            </h2>

            <a class="dialog__close" @click="hideDialog()">
              <i class="material-icons">close</i>
            </a>
          </header>

          <div class="dialog__content">
            <slot></slot>
          </div>
        </section>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
      shown: false,
      callback: null
    }
  },

  computed: {
    dialogShown () {
      return this.shown
    }
  },

  methods: {
    showDialog (callback) {
      this.shown = true
      this.callback = callback
    },

    hideDialog (...args) {
      this.shown = false
      this.callback(...args)
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  max-width: 100%;
  max-height: 100%;
  transform: translate(-50%, -50%);
  background: var(--grey-100);
  border: none;
  border-radius: 10px;
  box-shadow: 0 0 15px 0 rgba(169, 169, 169, .16);
  overflow: hidden;

  // Prevents useless line wrapping bug caused by optimizeLegibility
  text-rendering: auto;

  &__header {
    padding: 10px 20px;
    background: var(--theme-400);
    color: var(--grey-100);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__title {
    font-size: 1rem;
    font-weight: 600;
  }

  &__content {
    padding: 0 20px;
    padding-top: 20px;
  }

  &__close {
    cursor: pointer;
    color: var(--grey-100);
    display: inline-flex;
  }
}

.text-editor-dialog {
  &__inner {
    position: fixed;
    z-index: 30;
  }

  &__backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .36);
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
