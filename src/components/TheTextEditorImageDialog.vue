<template>
  <TextEditorDialog class="image-dialog" ref="root">
    <span slot="title">
      {{$t('image-attach')}}
    </span>

    <div class="image-dialog__section">
      <h3>{{$t('image-from-url')}}</h3>
      <input
        class="input" type="text" v-model="url"
        :class="{ 'is-empty': urlEmpty }"
        :placeholder="$t('image-url')"
        />

      <button class="button image-dialog__button" @click="hideDialog(url)">
        {{$t('image-add')}}
      </button>
    </div>

    <div class="image-dialog__section">
      <h3>{{$t('image-or')}}</h3>
      <span>{{$t('image-alternatives')}}</span>
    </div>
  </TextEditorDialog>
</template>

<script>
import TextEditorDialog from '@/components/TextEditorDialog'

export default {
  data () {
    return {
      url: '',
      pasteListener: null,
      pasteAttached: false
    }
  },

  computed: {
    urlEmpty () {
      return this.url.length === 0
    }
  },

  methods: {
    showDialog (callback) {
      this.url = ''

      if (this.$refs.root) {
        this.$refs.root.showDialog(callback)
      }

      if (!this.pasteAttached) {
        document.addEventListener('paste', this.pasteListener)
        this.pasteAttached = true
      }
    },

    hideDialog (...args) {
      if (this.$refs.root) {
        this.$refs.root.hideDialog(...args)
      }

      if (this.pasteAttached) {
        document.removeEventListener('paste', this.pasteListener)
        this.pasteAttached = false
      }
    }
  },

  mounted () {
    this.pasteListener = event => {
      const dataTransfer = event.clipboardData || window.clipboardData
      if (!dataTransfer) return

      event.preventDefault()
      event.stopPropagation()

      const items = [...dataTransfer.items]
      const files = items
        .filter(item => item.type.split('/')[0] === 'image')
        .map(item => item.getAsFile())

      if (files.length === 0) return

      this.$emit('attach-files', files)
      this.hideDialog()
    }
  },

  beforeDestroy () {
    if (this.pasteListener) {
      document.removeEventListener('paste', this.pasteListener)
    }
  },

  components: {
    TextEditorDialog
  }
}
</script>

<i18n>
ko:
  image-attach: '이미지 첨부'
  image-from-url: 'URL에서 가져오기'
  image-url: 'URL'
  image-or: '또는'
  image-alternatives: '본문 하단의 첨부파일 칸에 추가하거나 여기에 붙여넣어서 이미지를 추가할 수도 있습니다.'
  image-add: '추가'

en:
  image-attach: 'Add an image'
  image-from-url: 'Import from URL'
  image-url: 'URL'
  image-or: 'Other Options'
  image-add-attachment: 'Alternatively, you can add images by paste here or add it to attachments section'
  image-add: 'Add'
</i18n>

<style lang="scss" scoped>
.image-dialog {
  &__section {
    margin-bottom: 20px;

    h3 {
      background: transparent;
      font-size: 1.2rem;
      font-weight: 600;
      margin-bottom: .3rem;
    }
  }

  &__button {
    margin-top: 15px;
    margin-left: auto;
    display: block;
    color: var(--theme-400);
  }
}
</style>
