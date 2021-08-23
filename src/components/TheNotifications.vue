<template>
  <div class="the-notifications">
    <h1 id="title">{{ title }}</h1>
    <DailyNotifications
      v-for="timePassed in Object.keys(dailyNotifications)"
      :timePassed="timePassed"
      :notifications="dailyNotifications[timePassed]"
      :key="timePassed">
    </DailyNotifications>
    <ThePaginator
      :numPages="notifications.num_pages"
      :currentPage="notifications.current"
      :baseRouteTo="{ name: 'notifications' }">
    </ThePaginator>
  </div>
</template>

<script>
import { timeago } from '@/helper.js'
import DailyNotifications from '@/components/DailyNotifications'
import ThePaginator from '@/components/ThePaginator'

export default {
  name: 'the-notifications',
  props: {
    notifications: { required: true },
    title: String
  },
  computed: {
    dailyNotifications () {
      if (!this.notifications.results) return {}
      return this.notifications.results
        .reduce((acc, notification) => {
          const timePassed = timeago(notification.created_at, this.$i18n.locale)
          if (Object.keys(acc).includes(timePassed)) {
            return {
              ...acc,
              [timePassed]: [
                ...acc[timePassed],
                notification
              ]
            }
          }
          return {
            ...acc,
            [timePassed]: [notification]
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
