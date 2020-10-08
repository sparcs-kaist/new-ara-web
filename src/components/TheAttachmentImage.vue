<template>
  <div>
    <img :src="src" :alt="alt" :title="title" @error="imageLoadError"/>
  </div>
</template>

<script>

export default {
  name: 'TheAttachmentImage',
  props: ['node', 'updateAttrs', 'view', 'options'],
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
    }
  },
  methods: {
    imageLoadError () {
      if (this.options.errorCallback) {
        this.options.errorCallback()
      }
    }
  }
}
</script>

<style scoped>

</style>
