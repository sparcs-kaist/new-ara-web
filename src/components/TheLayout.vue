<template>
  <div class="layout">
    <TheNavbar/>
    <TheApiErrorNotification/>
    <slot/>
    <TheFooter/>
  </div>
</template>

<script>
import TheNavbar from '@/components/TheNavbar'
import TheFooter from '@/components/TheFooter'
import TheApiErrorNotification from '@/components/TheApiErrorNotification'

export default {
  components: { TheNavbar, TheFooter, TheApiErrorNotification }
}
</script>

<style>

</style>
