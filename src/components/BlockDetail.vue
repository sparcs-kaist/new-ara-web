<template>
  <div>
    <span class="block-col">{{ block.user.profile.nickname }}</span>
    <span class="block-col">{{ block.updated_at || block.created_at }}</span>
    <span class="block-col" @click="cancelBlock">x</span>
  </div>
</template>

<script>
import { deleteBlock } from '@/api'

export default {
  name: 'block-detail',
  props: {
    block: { required: true }
  },
  data () {
    return {
      isDeleting: false
    }
  },
  methods: {
    async cancelBlock () {
      this.isDeleting = true

      try {
        await deleteBlock(this.block.id)
        this.$emit('block-deleted', this.block.id)
      } catch (err) {
        this.$store.dispatch('dialog/toast', {
          text: this.$t('unblock-failed') + (err.apierr ? '\n' + err.apierr : ''),
          type: 'error'
        })
      } finally {
        this.isDeleting = false
      }
    }
  }
}
</script>

<i18n>
ko:
  unblock-failed: '차단 해제에 실패했습니다.'

en:
  unblock-failed: 'Failed to unblock.'

</i18n>

<style>
.block-col {
  display: inline-block;
  margin-left: 20px;
}
</style>
