<template>
  <span>
    {{ timeago }}
  </span>
</template>

<script>
import { timeago } from '@/helper.js'

export default {
  name: 'timeago',
  props: [ 'time' ],
  computed: {
    timeago () {
      return timeago(this.time, this.$i18n.locale)
    }
  }
}
</script>
