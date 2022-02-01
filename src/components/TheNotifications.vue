<template>
  <div class="the-notifications">
    <h1 id="title">
      {{ title }}
    </h1>
    <div>
      <Notification
        v-for="notification in notifications.results"
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
  }
}
</script>

<style lang="scss" scoped>
@import "@/theme.scss";

.the-notifications {
  #title {
    display: block;
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: var(--theme-400);
  }
}
</style>
