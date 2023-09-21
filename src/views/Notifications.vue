<template>
  <TheLayout>
    <TheNotifications :notifications="notifications" :title="$t('title')" />
  </TheLayout>
</template>

<script>
import { fetchNotifications } from '@/api'
import { fetchWithProgress } from '@/views/helper'
import TheLayout from '@/components/TheLayout.vue'
import TheNotifications from '@/components/TheNotifications.vue'

export default {
  name: 'Notifications',

  components: {
    TheLayout,
    TheNotifications
  },
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
  }
}
</script>

<i18n>
ko:
  document-title: 'Ara - 알림'
  title: '알림'
en:
  document-title: 'Ara - Notifications'
  title: 'Notifications'
</i18n>
