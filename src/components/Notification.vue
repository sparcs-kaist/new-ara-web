<template>
  <div
    class="notification-container">
    <h3 id="title">{{ notification.title }}</h3>
    <p id="content">{{ notification.content }}</p>
  </div>
</template>

<script>
export default {
  name: 'notification',
  props: {
    notification: { required: true }
  }
}
</script>

<style lang="scss" scoped>
.notification-container {
  margin-bottom: 1.375rem;

  #title {
    display: block;
    font-size: 0.9375rem;
    font-weight: 600;
    margin-bottom: 0;
  }

  #content {
    color: #888888;
    font-size: 0.875rem;
    font-weight: 500;
  }
}
</style>
