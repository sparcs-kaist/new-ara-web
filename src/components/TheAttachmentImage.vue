<template>
  <div>
    <img :src="src" :alt="alt" :title="title" @error="imageLoadError"/>
  </div>
</template>

<script>

export default {
  name: 'TheAttachmentImage',
  props: ['node', 'updateAttrs', 'view', 'editor'],
  computed: {
    src () {
      return this.node.attrs.src
    },
    alt () {
      return this.node.attrs.alt
    },
    title () {
      return this.node.attrs.title
    },
    'data-attachment': {
      get () {
        return this.node.attrs['data-attachment']
      }
    },
    loadedFailed () {
      return false
    }
  },
  methods: {
    imageLoadError () {
      this.$set(this.editor, 'imgError', true)
    }
  }
}
</script>

<style scoped>

</style>
