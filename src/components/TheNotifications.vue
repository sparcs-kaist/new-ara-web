<template>
  <div class="the-notifications">
    <h1 id="title">{{ title }}</h1>
    <div
      v-for="timePassed in Object.keys(dailyNotifications)"
      :key="timePassed"
      class="daily-notifications"
    >
      <h1 id="title">{{ timePassed }}</h1>
      <Notification
        v-for="notification in dailyNotifications[timePassed]"
        :key="notification.id"
        :notification="notification"
      />
    </div>
    <ThePaginator
      :num-pages="notifications.num_pages"
      :current-page="notifications.current"
      :base-route-to="{ name: 'notifications' }"
    />
  </div>
</template>

<script>
import { timeago } from '@/helper'
import Notification from '@/components/Notification.vue'
import ThePaginator from '@/components/ThePaginator.vue'

export default {
  name: 'TheNotifications',

  components: {
    Notification,
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
