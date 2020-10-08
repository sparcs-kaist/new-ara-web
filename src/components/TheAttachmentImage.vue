<template>
  <div>
    <img v-if="!loadedFailed" :src="src" :alt="alt" :title="title" @error="imageLoadError"/>
    <blockquote v-if="loadedFailed"><p><strong>이미지를 불러오는데 실패했습니다.</strong></p><p>포탈 공지를 불러오려면 확인해주세요</p></blockquote>
  </div>
</template>

<script>
    export default {
      name: "TheAttachmentImage",
      props: ['node', 'updateAttrs', 'view', 'editor'],
      computed: {
        src(){
          return this.node.attrs.href
        },
        alt(){
          return this.node.attrs.alt
        },
        title(){
          return this.node.attrs.title
        },
        "data-attachment": {
          get(){
            return this.node.attrs["data-attachment"]
          }
        },
        loadedFailed(){
          return false
        }
      },
      methods: {
        imageLoadError(){
          console.log("Asdfasdfasdfa")
        }
      }
    }
</script>

<style scoped>

</style>
