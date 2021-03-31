<template>
  <div class="alert-dialog" :class="{ 'alert-dialog--toast': dialog.toast }">
    <div class="alert-dialog__icon">
      <i class="material-icons">{{ iconName }}</i>
    </div>

    <div class="alert-dialog__content">
      <div class="content-text">{{ dialog.text }}</div>
    </div>

    <div class="alert-dialog__chips" v-if="dialog.type === 'report'">
      <div class="alert-dialog__chip">
        <Chip v-on:chip-click="chipClick('hate_speech')">{{ $t('hate-speech') }}</Chip>
        <Chip v-on:chip-click="chipClick('unauthorized_sales_articles')">{{ $t('unauthorized-sales-articles') }}</Chip>
        <Chip v-on:chip-click="chipClick('spam')">{{ $t('spam') }}</Chip>
      </div>
      <div class="alert-dialog__chip">
        <Chip v-on:chip-click="chipClick('fake_information')">{{ $t('fake-information') }}</Chip>
        <Chip v-on:chip-click="chipClick('defamation')">{{ $t('defamation') }}</Chip>
        <Chip v-on:chip-click="chipClick('other')">{{ $t('other') }}</Chip>
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

      <template v-else-if="dialog.type === 'report'">
        <button class="alert-dialog__button" @click="dismiss(false)">
          {{ dialog.secondary_button || $t('cancel') }}
        </button>

        <button class="alert-dialog__button alert-dialog__button--accent" @click="dismiss(true)">
          {{ dialog.primary_button || $t('report') }}
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
import Chip from './Chip.vue'

const icons = {
  confirm: 'check_circle_outline',
  report: 'check_circle_outline',
  error: 'error_outline',
  warning: 'highlight_off',
  info: 'info_outline'
}

export default {
  name: 'AlertDialog',

  components: {
    Chip
  },

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
    },
    chipSelection () {
      return {
        hate_speech: false,
        unauthorized_sales_articles: false,
        spam: false,
        fake_information: false,
        defamation: false,
        other: false
      }
    }
  },

  methods: {
    dismiss (value) {
      this.$store.commit('dialog/removeDialog', { id: this.dialog.id, value, chip_selection: this.chipSelection })
    },
    chipClick (key) {
      this.chipSelection[key] = !this.chipSelection[key]
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
    report: '신고하기'
    hate-speech: '혐오 발언'
    unauthorized-sales-articles: '허가되지 않은 판매글'
    spam: '스팸'
    fake-information: '거짓 정보'
    defamation: '명예훼손'
    other: '기타'

  en:
    error: 'Error'
    confirm: 'Confirm'
    info: 'Information'
    warning: 'Warning'
    okay: 'OK'
    cancel: 'Cancel'
    report: 'Report'
    hate-speech: 'Hate Speech'
    unauthorized-sales-articles: 'Unauthorized Sales Articles'
    spam: 'Spam'
    fake-information: 'Fake Information'
    defamation: 'Defamation'
    other: 'Other'
</i18n>

<style lang="scss" scoped>
.alert-dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 20px 55px 17px;
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
    margin-top: 1rem;

    .content-text {
      text-align: center;
      white-space: pre-line;
      word-wrap: break-word;
    }
  }

  &__chips {
    margin-bottom: 20px;
  }

  &__chip {
    display: flex;
    justify-content: center;
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
    padding: 8px 14px;
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
