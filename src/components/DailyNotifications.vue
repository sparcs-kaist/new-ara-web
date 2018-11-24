<template>
  <div class="daily-notifications">
    <h1 id="title">{{ timePassed }}</h1>
    <Notification
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification">
    </Notification>
  </div>
</template>

<script>
import Notification from '@/components/Notification'

export default {
  name: 'daily-notifications',
  props: {
    timePassed: { required: true },
    notifications: { required: true }
  },
  components: { Notification }
}
</script>

<style lang="scss" scoped>
.daily-notifications {
  margin-bottom: 1.375rem;

  #title {
    display: block;
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 1.25rem;
  }
}
</style>
