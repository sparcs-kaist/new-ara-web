<template>
  <TheLayout>
    <TheNotifications :notifications="notifications">
    </TheNotifications>
  </TheLayout>
</template>

<script>
import { fetchNotifications } from '@/api'
import { fetchWithProgress } from './helper.js'
import TheLayout from '@/components/TheLayout.vue'
import TheNotifications from '@/components/TheNotifications.vue'

export default {
  name: 'notifications',
  data () {
    return { notifications: {} }
  },
  async beforeRouteEnter ({ query }, from, next) {
    const [ notifications ] = await fetchWithProgress([ fetchNotifications({ query }) ])
    next(vm => { vm.notifications = notifications })
  },
  async beforeRouteUpdate ({ query }, from, next) {
    const [ notifications ] = await fetchWithProgress([ fetchNotifications({ query }) ])
    this.notifications = notifications
    next()
  },
  components: { TheLayout, TheNotifications }
}
</script>

<style>
</style>
