<template>
  <time :datetime="normalizedDate">
    {{ timeago }}
  </time>
</template>

<script>
import { timeago } from '@/helper.js'

export default {
  name: 'timeago',
  props: [ 'time' ],
  computed: {
    timeago () {
      return timeago.format(this.time)
    },

    normalizedDate () {
      return new Date(this.time).toUTCString()
    }
  }
}
</script>

<style>

</style>
