<template>
  <div class="daily-notifications">
    <h1 id="title">{{ formattedDayPassed }}</h1>
    <Notification
      v-for="notification in notifications"
      :notification="notification">
    </Notification>
  </div>
</template>

<script>
import { timeago } from '@/helper.js'
import Notification from '@/components/Notification'

export default {
  name: 'daily-notifications',
  props: {
    dayPassed: { required: true },
    notifications: { required: true }
  },
  computed: {
    formattedDayPassed() {
      const dayInMillisec = 24 * 60 * 60 * 1000
      if (this.dayPassed) return '오늘' /* @TODO: I18n */
      return timeago.format(Date.now() - dayInMillisec * this.dayPassed)
    }
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
