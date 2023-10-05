<template>
  <div ref="container" />
</template>

<script>
import { createElement } from 'react'
import { createRoot } from 'react-dom'
export default {
  inheritAttrs: false,
  props: {
    component: {
      type: null,
      required: true
    }
  },

  data () {
    return {
      reactRoot: null
    }
  },

  watch: {
    $attrs: {
      deep: true,
      handler () {
        this.updateReactComponent()
      }
    }
  },

  mounted () {
    this.reactRoot = createRoot(this.$refs.container)
    this.updateReactComponent()
  },

  destroyed () {
    this.reactRoot.unmount()
  },

  methods: {
    updateReactComponent () {
      this.reactRoot.render(createElement(this.component, this.$attrs))
    }
  }
}
</script>
