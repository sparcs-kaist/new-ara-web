<template>
  <div class="attachments">
    <h2 class="attachments-title">{{$t('upload')}}</h2>
    <label class="dropzone"
      :class="{
        'dropzone-failed': dropzoneFailedReason,
        'dropzone-enabled': dropzoneEnabled
      }"
      @dragover.stop.prevent="dropzoneEnabled = true"
      @dragleave.stop.prevent="dropzoneEnabled = false"
      @drop="handleDropUpload">
      
      <input class="dropzone-upload" type="file" ref="upload" @change="handleDialogUpload">
      {{dropzoneMessage}}
    </label>
    
    <div class="attachments-filelist">
      <div class="attachments-file" v-for="file in files">
      </div>
    </div>
  </div>
</template>

<script>
  const ALLOWED_EXTENSIONS = [
    'txt', 'docx', 'doc', 'pptx', 'ppt', 'pdf', 'hwp', 'zip', '7z'
  ]
  
  export default {
    data() {
      return {
        dropzoneFailedReason: null,
        dropzoneEnabled: false,
        files: []
      }
    },
    
    computed: {
      dropzoneMessage() {
        if(this.dropzoneFailedReason)
          return this.$t(this.dropzoneFailedReason)
        
        if(this.dropzoneEnabled)
          return this.$t('dropzone-drop')
        
        return this.$t('dropzone-normal')
      }
    },
    
    methods: {
      handleDropUpload() {
        
      },
      
      handleDialogUpload() {
        
      }
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
    &-title {
      color: var(--text);
      font-size: 1.2rem;
      font-weight: 700;
      margin-bottom: 1rem;
    }
  }
  
  .dropzone {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    
    background: #f1f2f3;
    padding: 20px 0;
    
    color: var(--text);
    font-size: 1rem;
    
    &-failed {
      
    }
    
    &-enabled {
      
    }
    
    &-upload {
      position: absolute;
      width: 0;
      height: 0;
      visibility: hidden;
    }
  }
</style>
