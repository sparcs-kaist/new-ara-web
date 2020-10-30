<template>
  <TheLayout>
    <TheNotifications :notifications="notifications" :title="$t('title')">
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
    const [ notifications ] = await fetchWithProgress([ fetchNotifications({ query }) ], 'notifications-failed-fetch')
    next(vm => {
      vm.notifications = notifications
      document.title = vm.$t('document-title')
    })
  },
  async beforeRouteUpdate ({ query }, from, next) {
    const [ notifications ] = await fetchWithProgress([ fetchNotifications({ query }) ], 'notifications-failed-fetch')
    this.notifications = notifications
    next()
  },
  components: { TheLayout, TheNotifications }
}
</script>

<style>
</style>

<i18n>
  ko:
    document-title: 'Ara - 알림'
    title: '알림'
  en:
    document-title: 'Ara - Notifications'
    title: 'Notifications'
</i18n>
