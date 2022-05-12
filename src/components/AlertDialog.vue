<template>
  <div :class="{ 'alert-dialog--toast': dialog.toast }" class="alert-dialog">
    <div class="alert-dialog__icon">
      <i class="material-icons">{{ iconName }}</i>
    </div>

    <div class="alert-dialog__content">
      <div class="content-text" v-html="dialog.text" />
    </div>

    <div v-if="dialog.type === 'report'" class="alert-dialog__chips">
      <div class="alert-dialog__chip">
        <button
          v-for="chip in Object.keys(chips)"
          :key="chip"
          :class="{ chip__clicked : chips[chip] }"
          class="chip"
          @click="chipClick(chip)"
        >
          {{ $t(chip) }}
        </button>
      </div>
    </div>

    <div v-if="hasButtons" class="alert-dialog__buttons">
      <template v-if="dialog.type === 'confirm'">
        <button class="alert-dialog__button" @click="dismiss(false)">
          {{ dialog.secondary_button || $t('cancel') }}
        </button>

        <button class="alert-dialog__button alert-dialog__button--accent" @click="dismiss(true)">
          {{ dialog.primary_button || $t('okay') }}
        </button>
      </template>

      <template v-else-if="dialog.type === 'confirmAgree'">
        <button class="alert-dialog__button" @click="dismiss(false)">
          {{ dialog.secondary_button || $t('cancel') }}
        </button>

        <button
          :class="{ 'alert-dialog__button--none' : agreeText!==dialog.agreeText }"
          class="alert-dialog__button alert-dialog__button--accent"
          :disabled="agreeText!==dialog.agreeText"
          @click="dismiss(true)"
        >
          {{ dialog.primary_button || $t('okay') }}
        </button>
      </template>

      <template v-else-if="dialog.type === 'report'">
        <button class="alert-dialog__button" @click="dismiss(false)">
          {{ dialog.secondary_button || $t('cancel') }}
        </button>
        <div class="dropdown is-hoverable is-up">
          <div
            class="dropdown-trigger"
            disabled="!isChipClicked"
            @click="() => { if (isChipClicked) { dismiss(true) } }"
          >
            <button
              :class="{ 'alert-dialog__button--none' : !isChipClicked }"
              class="alert-dialog__button alert-dialog__button--accent"
              aria-haspopup="true"
              aria-controls="dropdown-menu_tooltip"
            >
              {{ dialog.primary_button || $t('report') }}
            </button>
          </div>
          <div
            v-show="!isChipClicked"
            id="dropdown-menu_tooltip"
            class="dropdown-menu"
            role="menu"
          >
            <div class="dropdown-content">
              <div class="dropdown-item">
                <i class="material-icons">error_outline</i>
                <p>{{ $t('need-reason-for-report') }}</p>
              </div>
            </div>
          </div>
        </div>
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
  confirmAgree: 'check_circle_outline',
  report: 'check_circle_outline',
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

  data () {
    return {
      chips: {
        hate_speech: false,
        unauthorized_sales_articles: false,
        spam: false,
        fake_information: false,
        defamation: false,
        other: false
      },
      agreeText: ''
    }
  },

  computed: {
    isChipClicked () {
      return Object.values(this.chips).some(isClicked => isClicked)
    },
    iconName () {
      return icons[this.dialog.type]
    },
    hasButtons () {
      return !this.dialog.toast
    }
  },

  methods: {
    dismiss (value) {
      if (this.dialog.agreeText && value) {
        if (this.agreeText !== this.dialog.agreeText) {
          return
        }
      }
      this.$store.commit('dialog/removeDialog', {
        id: this.dialog.id,
        value,
        chip_selection: this.chips
      })
    },
    chipClick (chip) {
      this.chips[chip] = !this.chips[chip]
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
  hate_speech: '혐오 발언'
  unauthorized_sales_articles: '허가되지 않은 판매글'
  spam: '스팸'
  fake_information: '거짓 정보'
  defamation: '명예훼손'
  other: '기타'
  need-reason-for-report: '신고 사유를 1개 이상 선택해주세요'

en:
  error: 'Error'
  confirm: 'Confirm'
  info: 'Information'
  warning: 'Warning'
  okay: 'OK'
  cancel: 'Cancel'
  report: 'Report'
  hate_speech: 'Hate Speech'
  unauthorized_sales_articles: 'Unauthorized Sales'
  spam: 'Spam'
  fake_information: 'Fake Information'
  defamation: 'Defamation'
  other: 'Other'
  need-reason-for-report: 'Please select reason for report at least one'
</i18n>

<style lang="scss" scoped>
@import "@/theme.scss";

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
    margin-bottom: -10px;
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
    color: var(--grey-700);
    font-weight: bold;
    margin-bottom: 1.5rem;
    margin-top: 1rem;

    width: 120%;

    .content-text {
      text-align: center;
      white-space: pre-line;
      word-wrap: break-word;
    }
  }

  &__chips {
    margin-bottom: 30px;
    min-width: 340px;

    @media (max-width: 370px) {
      min-width: 290px;
    }
  }

  &__chip {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  &__buttons {
    display: flex;
    justify-content: center;
  }

  &__form {
    margin-bottom: 20px;
    width: 100%;
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

    &--accent {
      color: white;
      background-color: var(--theme-400);
      font-weight: 500;
      z-index: 50 !important;
    }

    &--none {
      cursor: default;
      color: white;
      background-color: var(--theme-300);
      font-weight: normal;
    }
  }
}

.dropdown-menu {
  //position: absolute;
  width: 180px;
  left: +50%;
  transform: translateX(-50%);
}

.dropdown-content {
  display: flex;
  align-content: center;
  justify-content: center;
  background-color: var(--grey-700);
  padding: 5px;
  border-radius: 0px;
  box-shadow: none;
}

.dropdown-item {
  display: flex;
  align-items: center;
  text-align: center;
  color: var(--background);
  font-size: 10px;
  padding: 0px;
  .material-icons {
    font-size: 0.75rem;
    margin: 0 5px 0 0;
  }
}

.chip {
  //float: left;
  margin: 4px 3px;

  cursor: pointer;
  background: var(--grey-300);
  border: none;
  border-radius: 30px;
  padding: 5px 9px 7px 9px;
  transition: background .4s ease;

  display: flex;
  align-items: center;
  height: 30px;
  font-size: 15px;
  line-height: 30px;

  &:hover {
    box-shadow: 0 2px 6px 0 rgba(51, 51, 51, 0.25);
  }

  &__clicked {
    background: var(--theme-400);
    color: var(--background);
  }
}
</style>
