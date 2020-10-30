<template>
  <div class="alert-dialog" :class="{ 'alert-dialog--toast': dialog.toast }">
    <div class="alert-dialog__icon">
      <i class="material-icons">{{ iconName }}</i>
    </div>

    <div class="alert-dialog__content">
      <div class="content-text">{{ dialog.text }}</div>
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
const icons = {
  confirm: 'check_circle_outline',
  error: 'error_outline',
  warning: 'highlight_off',
  info: 'info_outline'
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
    iconName () {
      return icons[this.dialog.type]
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
  width: 90%;
  max-width: 450px;
  background: var(--grey-100);
  border-radius: 10px;
  transform: translate(-50%, -50%);
  z-index: 32;
  display: flex;
  flex-flow: column;
  align-items: center;

  &__icon {
    color: var(--theme-400);
    .material-icons {
      font-size: 40px;
    }
  }

  &--toast {
    position: relative;
    top: 0;
    left: 0;
    width: auto;
    transform: none;
    padding: 0 20px;
    box-shadow: 0 2px 6px 0 var(--grey-400);
    margin: 10px 0;
    display: flex;
    flex-flow: row;
    align-items: center;

    .material-icons {
      font-size: 30px;
    }

    .content-text {
      text-align: left;
      margin-left: 10px;
    }
  }

  &__content {
    margin-bottom: 1.5rem;
    margin-top: 1.2rem;

    .content-text {
      text-align: center;
      white-space: pre-line;
      word-wrap: break-word;
    }
  }

  &__buttons {
    display: flex;
    justify-content: center;
  }

  &__button {
    cursor: pointer;
    background: var(--background);
    border: none;
    border-radius: 10px;
    margin: 0 5px;
    padding: 8px 20px;
    transition: background .4s ease;
    box-shadow: 0 2px 6px 0 rgba(169, 169, 169, 0.16);

    &:hover {
      background: var(--grey-300);
    }

    &--accent {
      color: var(--theme-400);
      font-weight: 500;

      &:hover {
        color: #fff;
        background: var(--theme-400);
      }
    }
  }
}
</style>
