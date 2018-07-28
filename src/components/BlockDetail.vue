<template>
  <div>
    <span class="block-col">{{ block.id }}</span>
    <span class="block-col">{{ block.user }}</span>
    <span class="block-col">{{ block.updated_at || block.created_at }}</span>
    <span class="block-col" @click="cancelBlock">x</span>
  </div>
</template>

<script>
import { fetchBlocks, deleteBlock } from '@/api'

export default {
  name: 'block-detail',
  props: {
    block: { required: true }
  },
  data() {
    return {
      isDeleting: false
    }
  },
  methods: {
    async cancelBlock() {
      this.isDeleting = true

      try {
        await deleteBlock(this.block.id)
        this.$emit('block-deleted', this.block.id)
      } catch (err) {
        alert('Failed to cancel the block!')
      } finally {
        this.isDeleting = false
      }
    }
  }
}
</script>

<style>
.block-col {
  display: inline-block;
  margin-left: 20px;
}
</style>
