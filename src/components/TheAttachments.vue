<template>
  <div class="attachments" :class="{
    'attachments--failed': dropzoneFailedReason,
    'attachments--enabled': dropzoneEnabled
  }">
    <div class="attachments__header">
      <h2 class="attachments__title"> {{ $t('upload') }} </h2>
      <button class="attachments__upload button" @click="openUpload">
        {{ $t('upload-button') }}
      </button>
    </div>

    <div class="attachments__content">
      <label class="attachments__dropzone dropzone"
        @dragover.stop.prevent="dropzoneEnabled = true"
        @dragleave.stop.prevent="dropzoneEnabled = false"
        @drop.stop.prevent="handleDropUpload">

        <input
          class="dropzone__upload"
          :accept="accepted"
          type="file"
          ref="upload"
          @change="handleDialogUpload"
        >
      </label>

      <span class="attachments__message"> {{dropzoneMessage}} </span>

      <transition-group class="attachments__filelist" name="filelist-fade" tag="div">
        <div class="attachments__file file" v-for="file in files" :key="file.key">
          <img class="file__thumbnail" v-if="file.type === 'image'" :src="file.blobUrl">

          <div class="file__details">
            {{file.name}}

            <button class="file__delete" @click.prevent="deleteFile(file)">
              <i class="material-icons">delete_outline</i>
            </button>
          </div>
        </div>
      </transition-group>
    </div>

    <input class="dropzone__upload" type="file" accept="image/*" ref="imageUpload" @change="handleImageUpload">
  </div>
</template>

<script>
import { getAttachmentUrls } from '@/api'

const ALLOWED_EXTENSIONS = [
  'txt', 'docx', 'doc', 'pptx', 'ppt', 'pdf', 'hwp', 'zip', '7z',
  'png', 'jpg', 'jpeg', 'gif'
]

/*
* UploadObject {
*   key: String, Random string if it is local, S3 id if is remote
*   name: String, file name
*   type: String, mime type before the slash
*   uploaded: Boolean, true if it is remote, false if it is local
*   file?: File, exists only if it is local
*   url?: String, url of file if it is remote
*   blobUrl?: String, url of thumbnail if it is image file
* }
*/

export default {
  data () {
    return {
      dropzoneFailedReason: null,
      dropzoneEnabled: false,
      files: [],
      pasteListener: null
    }
  },

  computed: {
    accepted () {
      return ALLOWED_EXTENSIONS.map(ext => `.${ext}`).join(',')
    },

    dropzoneMessage () {
      if (this.dropzoneFailedReason) {
        return this.$t(this.dropzoneFailedReason)
      }

      if (this.dropzoneEnabled) {
        return this.$t('dropzone-drop')
      }

      return this.$t('dropzone-normal')
    }
  },

  methods: {
    async init (attachmentIds) {
      const attachmentInfo = await getAttachmentUrls(attachmentIds)
      attachmentInfo.forEach(({ data: info }) => {
        const name = decodeURIComponent(new URL(info.file).pathname.split('/').pop())
        const type = info.mimetype.split('/')[0]

        this.files.push({
          key: `${info.id}`,
          type,
          name,
          url: info.file,
          blobUrl: type === 'image' ? info.file : null,
          uploaded: true
        })
      })
    },

    openUpload () {
      this.$refs.upload.click()
    },

    openImageUpload () {
      this.$refs.imageUpload.click()
    },

    handleUpload (fileList) {
      const files = [...fileList]
      const [success, error] = files.reduce(([success, error], file) => {
        const extension = file.name.split('.').pop()
        const uploadObject = {
          key: Math.random().toString(36).slice(2),
          type: file.type.split('/')[0],
          name: file.name,
          file,
          uploaded: false
        }

        if (!ALLOWED_EXTENSIONS.includes(extension)) {
          error.push(uploadObject)
          return [success, error]
        }

        if (uploadObject.type === 'image') {
          uploadObject.blobUrl = URL.createObjectURL(file)
        }

        success.push(uploadObject)
        return [success, error]
      }, [[], []])

      if (error.length > 0) {
        this.dropzoneFailedReason = 'dropzone-unallowed-extensions'
        setTimeout(() => { this.dropzoneFailedReason = null }, 1500)
      }

      this.files.push(...success)
      this.$emit('add', success)
    },

    handleDropUpload (event) {
      this.dropzoneEnabled = false

      if (!event.dataTransfer) return

      const { dataTransfer } = event
      this.handleUpload(dataTransfer.files)
    },

    handleDialogUpload (event) {
      const files = this.$refs.upload.files
      if (!files) return

      this.handleUpload(files)
    },

    handleImageUpload (event) {
      const files = this.$refs.imageUpload.files
      if (!files) return

      this.handleUpload(files)
    },

    deleteFile (file) {
      const index = this.files.indexOf(file)
      this.files.splice(index, 1)

      if (file.blobUrl && file.blobUrl.startsWith('blob:')) {
        URL.revokeObjectURL(file.blobUrl)
      }

      this.$emit('delete', file)
    }
  },

  mounted () {
    this.pasteListener = event => {
      const dataTransfer = event.clipboardData || window.clipboardData
      if (!dataTransfer) return

      const items = [...dataTransfer.items]
      const fileItems = items
        .filter(item => item.kind === 'file')

      if (fileItems.length === 0) return

      event.preventDefault()
      event.stopPropagation()

      const files = fileItems
        .map(item => item.getAsFile())

      this.handleUpload(files)
    }

    document.addEventListener('paste', this.pasteListener)
  },

  beforeDestroy () {
    if (this.pasteListener) {
      document.removeEventListener('paste', this.pasteListener)
    }
  },

  destroyed () {
    this.files.forEach(file => {
      if (file.blobUrl) {
        URL.revokeObjectURL(file.blobUrl)
      }
    })
  }
}
</script>

<i18n>
  ko:
    upload: '첨부파일'
    upload-button: '가져오기'
    dropzone-normal: '가져오기 버튼을 클릭하거나 복사한 이미지를 본문에서 붙여넣기, 또는 파일을 드래그 앤 드롭해주세요.'
    dropzone-drop: '여기에 드롭해주세요.'
    dropzone-unallowed-extensions: '허용되지 않은 확장자입니다.'

  en:
    upload: 'Upload Attachments'
    upload-button: 'Import'
    dropzone-normal: 'Please click import button, paste copied images, or drag & drop the files.'
    dropzone-drop: 'Please drop here.'
    dropzone-unallowed-extensions: 'This file type is not allowed.'
</i18n>

<style lang="scss" scoped>
.attachments {
  margin-bottom: 40px;

  &__header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }

  &__title {
    color: var(--text);
    font-size: 1.1rem;
    font-weight: 500;
    margin-right: 15px;
  }

  &__filelist {
    position: relative;
    margin-top: 5px;
  }

  &__content {
    position: relative;
    background: var(--grey-100);
    border: 1px solid var(--grey-300);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    padding: 18px 0;
    transition: all var(--duration) var(--background-timing);
  }

  &--enabled &__content {
    border-color: rgba(0, 0, 0, 0.7);
  }

  &--failed & {
    // Didn't use --theme-red as it is "theme" color, not error color
    &__content {
      border-color: #ed3a3a;
    }

    &__message {
      color: #ed3a3a;
    }
  }

  &__message {
    padding-left: 20px;
    padding-bottom: 30px;
    color: var(--grey-400);
    font-weight: 500;
    transition: color var(--duration) var(--background-timing);
  }

  &__dropzone {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
  }
}

.dropzone {
  display: block;
  text-align: center;
  padding: 20px 40px;
  width: 100%;

  color: var(--text);
  font-size: 1rem;
  font-weight: 500;

  &__upload {
    position: absolute;
    width: 0;
    height: 0;
    visibility: hidden;
  }
}

.file {
  display: flex;
  flex-direction: column;
  pointer-events: none;
  padding: 10px 20px;
  transition: background var(--duration) var(--background-timing);
  width: 100%;

  &__thumbnail {
    max-width: 300px;
    max-height: 100px;
    object-fit: cover;
    margin-bottom: 10px;
  }

  &__details {
    display: flex;
    justify-content: space-between;
  }

  &__delete {
    cursor: pointer;
    background: transparent;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 5px;
    height: 2rem;
    width: 2rem;
    transition: background var(--duration) var(--background-timing);
    pointer-events: auto;
    z-index: 2;

    &:hover {
      background: var(--grey-300);
    }
  }
}

.filelist-fade {
  &-enter {
    transform: translate(-20px);
    opacity: 0;
  }

  &-leave {
    &-active {
      position: absolute;
    }

    &-to {
      transform: translate(20px);
      opacity: 0;
    }
  }

  &-enter-active, &-leave-active, &-move {
    transition: all var(--duration) var(--background-timing);
  }
}

@media (max-width: 768px) {
  .attachments {
    width: 100%;
  }

  .file__thumbnail {
    max-width: none;
  }
}
</style>
