<template>
  <span>
    {{ $t('notification') }}

    <NavbarNotificationItem
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
    />
  </span>
</template>

<script>
import { fetchNotifications } from '@/api'
import NavbarNotificationItem from '@/components/NavbarNotificationItem.vue'

export default {
  name: 'the-navbar-notifications',
  data () {
    return {
      isFetching: false,
      notifications: [],
      currentPage: 1,
      noPages: 1,
      noItems: 0
    }
  },
  // navbar notification이 dropdown이 열리면서 mount 됐을 때 fetch
  async created () {
    this.isFetching = true
    const {
      results: notifications,
      current: currentPage,
      num_pages: noPages,
      num_items: noItems
    } = await fetchNotifications()
    this.isFetching = false
    this.notifications = notifications
    this.currentPage = currentPage
    this.noPages = noPages
    this.noItems = noItems
  },
  components: { NavbarNotificationItem }
}
</script>

<i18n>
ko:
  notification: '알림'

en:
  notification: 'Notification'
</i18n>

<style>

</style>
