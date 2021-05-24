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
        <Chip v-for="(chipvalue, name) in gPropsForChips" :key="name" v-bind="chipvalue"
              @chip-click="chipClick">{{ $t(name) }}</Chip>
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
        <div class="dropdown is-hoverable is-up">
          <div class="dropdown-trigger"
              @click="if(isChipClicked){dismiss(true)}"
              disabled="!isChipClicked">
            <button
              class="alert-dialog__button alert-dialog__button--accent"
              aria-haspopup="true"
              aria-controls="dropdown-menu_tooltip"
              v-bind:class="{ 'alert-dialog__button--none' : !isChipClicked }"
              >
              {{ dialog.primary_button || $t('report') }}
            </button>
          </div>
          <div v-show="!isChipClicked" class="dropdown-menu" id="dropdown-menu_tooltip" role="menu">
            <div class="dropdown-content">
              <div class="dropdown-item">
                <i class="material-icons">error_outline</i>
                <p>{{$t('need-reason-for-report')}}</p>
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

  data () {
    return {
      gPropsForChips: {
        hate_speech: { skey: 'hate_speech', isClicked: false },
        unauthorized_sales_articles: { skey: 'unauthorized_sales_articles', isClicked: false },
        spam: { skey: 'spam', isClicked: false },
        fake_information: { skey: 'fake_information', isClicked: false },
        defamation: { skey: 'defamation', isClicked: false },
        other: { skey: 'other', isClicked: false }
      },
      isChipClicked: false
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
    chipClick (value, key) {
      this.gPropsForChips[key].isClicked = value
      this.chipSelection[key] = value
      this.isChipClicked = false
      for (var i = 0; i < Object.values(this.gPropsForChips).length; i++) {
        this.isChipClicked = this.isChipClicked || Object.values(this.gPropsForChips)[i].isClicked
      }
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
    unauthorized_sales_articles: 'Unauthorized Sales Articles'
    spam: 'Spam'
    fake_information: 'Fake Information'
    defamation: 'Defamation'
    other: 'Other'
    need-reason-for-report: 'Please select reason for report at least one'
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
    color: var(--grey-700);
    font-weight: bold;
    margin-bottom: 1.5rem;
    margin-top: 1rem;

    .content-text {
      text-align: center;
      white-space: pre-line;
      word-wrap: break-word;
    }
  }

  &__chips {
    margin-bottom: 30px;
    //display: flex;
    //flex-wrap: wrap;
    //justify-content: center;
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
      z-index: 50 !important;
      &:hover {
        color: #fff;
        background: var(--theme-400);
      }
    }

    &--none {
      cursor: default;
      color: var(--grey-600);
      background: var(--grey-300);
      font-weight: normal;

      &:hover {
        color: var(--grey-600);
        background: var(--grey-300);
      }
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
</style>
