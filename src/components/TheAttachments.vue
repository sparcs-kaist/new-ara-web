<template>
  <div class="attachments">
    <h2 class="attachments__title">{{$t('upload')}}</h2>
    <label class="attachments__dropzone dropzone"
      :class="{
        'dropzone--failed': dropzoneFailedReason,
        'dropzone--enabled': dropzoneEnabled
      }"
      @dragover.stop.prevent="dropzoneEnabled = true"
      @dragleave.stop.prevent="dropzoneEnabled = false"
      @drop.stop.prevent="handleDropUpload">

      <input class="dropzone__upload" type="file" ref="upload" @change="handleDialogUpload">
      {{dropzoneMessage}}
    </label>

    <transition-group class="attachments__filelist" name="filelist-fade" tag="div">
      <div class="attachments__file file" v-for="file in files" :key="file.key" @click="deleteFile(file)">
        <img class="file__thumbnail" v-if="file.type === 'image'" :src="file.blobUrl">

        <div class="file__details">
          {{file.name}}

          <i class="material-icons">delete_outline</i>
        </div>
      </div>
    </transition-group>
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
      files: []
    }
  },

  computed: {
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

    deleteFile (file) {
      const index = this.files.indexOf(file)
      this.files.splice(index, 1)

      if (file.blobUrl) {
        URL.revokeObjectURL(file.blobUrl)
      }

      this.$emit('delete', file)
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
    dropzone-normal: '여기를 클릭하거나 파일을 드래그 앤 드롭해주세요.'
    dropzone-drop: '여기에 드롭해주세요.'
    dropzone-unallowed-extensions: '허용되지 않은 확장자입니다.'

  en:
    upload: 'Upload Attachments'
    dropzone-normal: 'Please click here or drag &amp; drop the files.'
    dropzone-drop: 'Please drop here.'
    dropzone-unallowed-extensions: 'This file type is not allowed.'
</i18n>

<style lang="scss" scoped>
.attachments {
  width: 60%;
  margin-bottom: 40px;

  &__title {
    color: var(--text);
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 30px;
  }

  &__filelist {
    position: relative;
    margin-top: 5px;
  }
}

.dropzone {
  display: block;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  text-align: center;
  padding: 20px 40px;
  width: 100%;

  color: var(--text);
  font-size: 1rem;
  font-weight: 500;
  transition: all var(--duration) var(--background-timing);

  &--failed {
    // Didn't use --theme-red as it is "theme" color, not error color
    border-color: #ed3a3a;
    background: #ed3a3a;
    color: #f1f2f3;
  }

  &--enabled {
    border-color: rgba(0, 0, 0, 0.7);
  }

  &__upload {
    position: absolute;
    width: 0;
    height: 0;
    visibility: hidden;
  }
}

.file {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  background: #fafbfc;
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

  &:hover {
    background: #f1f2f3;
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
