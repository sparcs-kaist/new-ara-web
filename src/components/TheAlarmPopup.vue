<template>
  <div class="alarm-popup">
    <div
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
    >
      {{ notification.content }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheAlarmPopup',

  props: {
    notifications: {
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .alarm-popup{
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 600px;
    height: 120px;

    background: #FFFFFF;
    border-radius: 0px 0px 20px 20px;
  }
</style>
