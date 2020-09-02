<template>
  <div class="alert-dialog" :class="{ 'alert-dialog--toast': dialog.toast }"  :style="colors">
    <div class="alert-dialog__body">
      <div class="alert-dialog__icon">
        <span>{{ iconName }}</span>
      </div>

      <div class="alert-dialog__content">
        <h2 class="alert-dialog__title">{{ title }}</h2>
        <div class="alert-dialog__text">{{ dialog.text }}</div>
      </div>
    </div>

    <div class="alert-dialog__buttons" v-if="hasButtons">
      <template v-if="dialog.type === 'confirm'">
        <button class="alert-dialog__button" @click="dismiss(false)">
          {{ dialog.secondary_button || $t('cancel') }}
        </button>

        <button class="alert-dialog__button alert-dialog__button--accent" @click="dismiss(true)">
          {{ dialog.primary_button || $t('okay') }}
        </button>
      </template>

      <template v-else>
        <button class="alert-dialog__button" @click="dismiss()">
          {{ dialog.primary_button || $t('okay') }}
        </button>
      </template>
    </div>
  </div>
</template>

<script>
const types = {
  confirm: {
    icon: '?',
    accent: '#fbc02d',
    darken: '#fab70f'
  },

  error: {
    icon: '!',
    accent: '#ed3a3a',
    darken: '#ea1e1e'
  },

  warning: {
    icon: '!',
    accent: '#fbc02d',
    darken: '#fab70f'
  },

  info: {
    icon: 'i',
    accent: '#46c6ce',
    darken: '#34bbc4'
  }
}

export default {
  name: 'AlertDialog',

  props: {
    dialog: {
      type: Object,
      required: true
    }
  },

  computed: {
    title () {
      return this.dialog.title || this.$t(this.dialog.type)
    },

    iconName () {
      return types[this.dialog.type].icon
    },

    colors () {
      const type = types[this.dialog.type]
      return {
        '--alert-color': type.accent,
        '--alert-color-darken': type.darken
      }
    },

    hasButtons () {
      return !this.dialog.toast
    }
  },

  methods: {
    dismiss (value) {
      this.$store.commit('dialog/removeDialog', { id: this.dialog.id, value })
    }
  }
}
</script>

<i18n>
  ko:
    error: '오류'
    confirm: '확인'
    info: '정보'
    warning: '경고'
    okay: '확인'
    cancel: '취소'

  en:
    error: 'Error'
    confirm: 'Confirm'
    info: 'Information'
    warning: 'Warning'
    okay: 'OK'
    cancel: 'Cancel'
</i18n>

<style lang="scss" scoped>
.alert-dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 20px;
  width: 100%;
  max-width: 400px;
  background: var(--background);
  border-radius: 5px;
  transform: translate(-50%, -50%);
  z-index: 32;

  &--toast {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    transform: none;

    box-shadow: 0 2px 6px 0 var(--grey-400);
    margin: 10px 0;
  }

  &__icon {
    color: #fff;
    background: var(--alert-color);
    width: 3rem;
    height: 3rem;
    font-size: 1.3rem;
    line-height: 3rem;
    border-radius: 3px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  &__body {
    display: flex;
  }

  &__content {
    flex: 1;
    margin-left: 20px;
  }

  &__title {
    font-size: 1.4rem;
    font-weight: 700;
  }

  &__buttons {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }

  &__button {
    cursor: pointer;
    background: var(--grey-100);
    border: none;
    border-radius: 5px;
    margin: 0 5px;
    padding: 8px 20px;
    transition: background .4s ease;

    &:hover {
      background: var(--grey-300);
    }

    &--accent {
      color: #fff;
      background: var(--alert-color);

      &:hover {
        color: #fff;
        background: var(--alert-color-darken);
      }
    }
  }
}
</style>
