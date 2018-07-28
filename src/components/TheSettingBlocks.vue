<template>
  <div>
    blocks
    <block-detail
      v-for="block in blocks"
      :key="block.id"
      :block="block"
      @block-deleted="updateBlocks"
    />
  </div>
</template>

<script>
import { fetchBlocks } from '@/api'
import BlockDetail from '@/components/BlockDetail.vue'

export default {
  name: 'the-setting-blocks',
  data () {
    return {
      blocks: [],
      current: 1
    }
  },
  methods: {
    async updateBlocks (deletedBlockId) {
      /* Save the new comment in local first. */
      const deletedBlockIndex = this.blocks.findIndex(block => block.id === deletedBlockId)
      this.blocks.splice(deletedBlockIndex, 1) /* .splice() method is watched by proxy, therefore safe. */

      /* Then fetch data from DB. */
      await this.fetchAndSaveBlocks()
    },
    async fetchAndSaveBlocks () {
      const { results: blocks, current } = await fetchBlocks()
      this.blocks = blocks
      this.current = current
    }
  },
  async created () {
    await this.fetchAndSaveBlocks()
  },
  components: { BlockDetail }
}
</script>

<style>

</style>
