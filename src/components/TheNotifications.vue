<template>
  <div class="the-notifications">
    <div class="read-all__wrapper">
      <h1 id="title">
        {{ title }}
      </h1>
      <button
        class="read-all"
        :class="{ 'read-all__on': isButtonOn}"
        :disabled="!isButtonOn"
        @click="readAllAlarm"
      >
        <i class="material-icons check-icon">check_circle_outline</i>
        {{ $t('readAll') }}
      </button>
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

  data () {
    return {
      isButtonClicked: false
    }
  },

  computed: {
    isUnreadExist () {
      return this.notifications.results?.filter(e => {
        return e.is_read === false
      }).length > 0
    },
    isButtonOn () {
      return this.isUnreadExist && !this.isButtonClicked
    }
  },

  methods: {
    readAllAlarm () {
      this.isButtonClicked = true
      for (const v of this.notifications.results) v.is_read = true
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
    font-size: 1.75rem;
    font-weight: 700;
    margin-bottom: 3px;
    color: var(--theme-400);
  }

  .read-all {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 5px;
    float: right;

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
      align-items: center;
      padding-bottom: 7px;
      justify-content: space-between;
    }

    &__on{
      color: var(--theme-400) !important
    }
  }
}
</style>
