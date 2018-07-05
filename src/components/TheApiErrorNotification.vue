<template>
  <div v-if="isApiError" class="notification is-api-error">
    <button class="delete"></button>
    서버와 통신에 실패했습니다
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'the-api-error-notification',
  computed: {
    ...mapGetters(['isApiError'])
  }
}
</script>

<style>

</style>
