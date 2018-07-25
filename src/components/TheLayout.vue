<template>
  <div class="layout">
    <TheNavbar/>
    <TheApiErrorNotification/>
    <slot/>
    <TheFooter/>
  </div>
</template>

<script>
import TheNavbar from '@/components/TheNavbar.vue'
import TheFooter from '@/components/TheFooter.vue'
import TheApiErrorNotification from '@/components/TheApiErrorNotification.vue'

export default {
  components: { TheNavbar, TheFooter, TheApiErrorNotification }
}
</script>

<style>

</style>
