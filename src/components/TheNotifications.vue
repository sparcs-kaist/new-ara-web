<template>
  <div class="the-notifications">
    <h1 id="title">{{ title }}</h1>
    <DailyNotifications
      v-for="timePassed in Object.keys(dailyNotifications)"
      :time-passed="timePassed"
      :notifications="dailyNotifications[timePassed]"
      :key="timePassed"
    />
    <ThePaginator
      :num-pages="notifications.num_pages"
      :current-page="notifications.current"
      :base-route-to="{ name: 'notifications' }"
    />
  </div>
</template>

<script>
import { timeago } from '@/helper'
import DailyNotifications from '@/components/DailyNotifications.vue'
import ThePaginator from '@/components/ThePaginator.vue'

export default {
  name: 'TheNotifications',

  components: {
    DailyNotifications,
    ThePaginator
  },

  props: {
    notifications: {
      type: Object,
      required: true
    },
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
  }
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
