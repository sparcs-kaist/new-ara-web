<template>
  <div class="the-notifications">
    <h1 id="title">알림</h1>
    <DailyNotifications
      v-for="dayPassed in Object.keys(dailyNotifications)"
      :dayPassed="dayPassed"
      :notifications="dailyNotifications[dayPassed]"
      :key="dayPassed">
    </DailyNotifications>
    <ThePaginator
      :numPages="notifications.num_pages"
      :currentPage="notifications.current"
      :baseRouteTo="{ name: 'notifications' }">
    </ThePaginator>
  </div>
</template>

<script>
import DailyNotifications from '@/components/DailyNotifications'
import ThePaginator from '@/components/ThePaginator'

export default {
  name: 'the-notifications',
  props: {
    notifications: { required: true }
  },
  computed: {
    dailyNotifications () {
      const dayInMillisec = 24 * 60 * 60 * 1000
      const now = Date.now()
      if (!this.notifications.results) return []
      return this.notifications.results
        .reduce((acc, notification) => {
          const { created_at: createdAt } = notification
          const dayPassed = String(Math.floor((now - createdAt) / dayInMillisec))
          if (Object.keys(acc).includes(dayPassed)) {
            return {
              ...acc,
              [dayPassed]: [
                ...acc[dayPassed],
                notification
              ]
            }
          }
          return {
            ...acc,
            [dayPassed]: [notification]
          }
        }, {})
    }
  },
  components: { DailyNotifications, ThePaginator }
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
