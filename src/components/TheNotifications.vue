<template>
  <div class="the-notifications">
    <div class="read-all__wrapper">
      <button
        class="read-all"
        :class="{ 'read-all__on': isUnreadExist}"
        @click="readAllAlarm"
      >
        <i class="material-icons check-icon">check_circle_outline</i>
        {{ $t('readAll') }}
      </button>
      <h1 id="title">
        {{ title }}
      </h1>
    </div>
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

<i18n>
ko:
  readAll: '모두 읽음'
en:
  readAll: 'Read All'
</i18n>

<script>
import Notification from '@/components/Notification.vue'
import ThePaginator from '@/components/ThePaginator.vue'
import { readAllNotification } from '@/api'

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
    isUnreadExist () {
      return this.notifications.results?.filter(e => {
        return e.is_read === false
      }).length > 0
    }
  },

  methods: {
    readAllAlarm () {
      this.notifications.results = this.notifications.results?.map(e => {
        e.is_read = true
      })
      readAllNotification()
    }
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
    margin: 0;
    margin-left: auto;
    color: var(--theme-400);
  }

  .read-all {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 5px;

    width: 90px;
    height: 33px;
    left: 150px;
    top: 99px;
    background: #FFFFFF;
    border: 0.5px solid #DBDBDB;
    box-shadow: 0px 2px 6px rgba(169, 169, 169, 0.16);
    border-radius: 8px;

    color: var(--grey-400);
    font-size: 12px;
    cursor: pointer;

    .check-icon{
      font-size: 15px;
    }

    &__wrapper{
      display: flex;
      flex-direction: row;
      padding-bottom: 7px;
    }

    &__on{
      color: var(--theme-400) !important
    }
  }
}
</style>
