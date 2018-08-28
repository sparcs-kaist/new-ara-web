<template>
  <div class="the-notifications">
    <h1 id="title">알람</h1>
    <Notification
      v-for="notification in notifications.results"
      :notification="notification">
    </Notification>
    <TheNotificationPaginator
      :numPages="notifications.num_pages"
      :currentPage="notifications.current">
    </TheNotificationPaginator>
  </div>
</template>

<script>
import Notification from '@/components/Notification'
import TheNotificationPaginator from '@/components/TheNotificationPaginator'

export default {
  name: 'the-notifications',
  props: {
    notifications: { required: true }
  },
  components: { Notification, TheNotificationPaginator }
}
</script>

<style lang="scss" scoped>
.the-notifications {
  #title {
    display: block;
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }
}
</style>
