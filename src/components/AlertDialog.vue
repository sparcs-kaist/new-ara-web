<template>
  <div class="alert-dialog">
    <div class="alert-dialog__body">
      <component :is="iconName" />

      <div class="alert-dialog__content">
        <h2 class="alert-dialog__title">{{ title }}</h2>
        <div class="alert-dialog__text">{{ dialog.text }}</div>
      </div>
    </div>

    <div class="alert-dialog__buttons">
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
import DialogConfirm from '@/icons/DialogConfirm.svg?inline'
import DialogError from '@/icons/DialogError.svg?inline'
import DialogInfo from '@/icons/DialogInfo.svg?inline'

export default {
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
      return `dialog-${this.dialog.type}`
    }
  },

  methods: {
    dismiss (value) {
      this.$store.commit('dialog/removeDialog', { id: this.dialog.id, value })
    }
  },

  components: {
    DialogConfirm,
    DialogError,
    DialogInfo
  }
}
</script>

<i18n>
  ko:
    error: '오류'
    confirm: '확인'
    info: '정보'
    okay: '확인'
    cancel: '취소'

  en:
    error: 'Error'
    confirm: 'Confirm'
    info: 'Information'
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
  background: var(--background-lighten-2);
  border-radius: 5px;
  transform: translate(-50%, -50%);
  z-index: 32;

  &__body {
    display: flex;
  }

  &__content {
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
    background: var(--background);
    border: none;
    border-radius: 5px;
    margin: 0 5px;
    padding: 8px 20px;

    &:hover {
      background: var(--background-lighten-1);
    }

    &--accent {
      color: #ffffff;
      background: #fbc02d;

      &:hover {
        color: #ffffff;
        background: darken(#fbc02d, 10%);
      }
    }
  }
}
</style>
