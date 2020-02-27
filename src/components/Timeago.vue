<template>
  <time :datetime="normalizedDate">
    {{ timeago }}
  </time>
</template>

<script>
import { format } from 'timeago.js'

export default {
  name: 'timeago',
  props: [ 'time' ],
  computed: {
    timeago () {
      return format(this.time, this.$i18n.locale)
    },

    normalizedDate () {
      return new Date(this.time).toUTCString()
    }
  }
}
</script>

<style>

</style>
