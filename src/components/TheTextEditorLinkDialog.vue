<template>
  <TextEditorDialog class="link-dialog" ref="root">
    <span slot="title">
      {{ $t('link-attach') }}
    </span>

    <div class="link-dialog__section">
      <input
        class="input" type="text" v-model="url"
        :class="{ 'is-empty': url.length === 0 }"
        :placeholder="$t('link-url')"
        />

      <input
        class="input" type="text" v-model="title"
        :class="{ 'is-empty': title.length === 0 }"
        :placeholder="$t('link-title')"
        />
    </div>

    <div class="link-dialog__buttons">
      <button class="button link-dialog__button" @click="hideDialog(url, titleDefault, false)">
        {{ $t('link-add') }}
      </button>

      <button
        class="button link-dialog__button link-dialog__button--primary"
        @click="hideDialog(url, titleDefault, true)"
      >
        {{ $t('bookmark-add') }}
      </button>
    </div>
  </TextEditorDialog>
</template>

<script>
import TextEditorDialog from '@/components/TextEditorDialog'

export default {
  data () {
    return {
      url: '',
      title: ''
    }
  },

  computed: {
    urlEmpty () {
      return this.url.length === 0
    },

    titleDefault () {
      if (!this.title.trim()) return this.url

      return this.title
    }
  },

  methods: {
    showDialog (callback, title) {
      this.url = ''
      this.title = title

      if (this.$refs.root) {
        this.$refs.root.showDialog(callback)
      }
    },

    hideDialog (...args) {
      if (!/^https?:\/\//.test(this.url)) {
        this.$store.dispatch('dialog/toast', {
          title: this.$t('wrong-url'),
          type: 'error',
          text: this.$t('wrong-url-desc')
        })

        return
      }

      if (this.$refs.root) {
        this.$refs.root.hideDialog(...args)
      }
    }
  },

  components: {
    TextEditorDialog
  }
}
</script>

<i18n>
ko:
  link-attach: '링크 추가하기'
  link-url: '링크 URL'
  link-title: '링크 텍스트'
  link-add: '링크 추가'
  bookmark-add: '북마크 추가'
  wrong-url: '잘못된 URL입니다!'
  wrong-url-desc: 'URL은 http:// 또는 https:// 로 시작해야합니다.'

en:
  link-attach: 'Add Link'
  link-url: 'Link URL'
  link-title: 'Link Text'
  link-add: 'Add Link'
  bookmark-add: 'Add Bookmark'
  wrong-url: 'Wrong URL!'
  wrong-url-desc: 'URL should start with http:// or https://'
</i18n>

<style lang="scss" scoped>
.link-dialog {
  &__section {
    margin-bottom: 15px;

    .input {
      margin: 5px 0;
    }
  }

  &__buttons {
    display: flex;
    justify-content: flex-end;
    margin: 15px 0;
  }

  &__button {
    margin: 0 5px;

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }

    &--primary {
      background: var(--theme-400);
      color: var(--grey-100);
      border: none;

      &:hover {
        background: var(--theme-500);
      }
    }
  }
}
</style>
