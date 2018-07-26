<template>
  <div>
    blocks
    {{ blocks }}
  </div>
</template>

<script>
import { fetchBlocks } from '@/api'

export default {
  name: 'the-setting-blocks',
  data () {
    return {
      blocks: [],
      current: 1
    }
  },
  async created () {
    const { results: blocks, current } = await fetchBlocks()
    this.blocks = blocks
    this.current = current
  }
}
</script>

<style>

</style>
