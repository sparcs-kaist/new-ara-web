<template>
  <span>
    {{ timeago }}
  </span>
</template>

<script>
import { timeago } from '@/helper.js'

export default {
  name: 'Timeago',
  props: {
    time: String
  },
  computed: {
    timeago () {
      return timeago(this.time, this.$i18n.locale)
    }
  }
}
</script>
