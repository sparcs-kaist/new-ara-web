<template>
  <div id="root-container">
    <div id="app">
      <router-view/>
    </div>
    <TheFooter />
  </div>
</template>

<script>
import TheFooter from '@/components/TheFooter.vue'

export default {
  name: 'app',
  components: { TheFooter }
}
</script>

<style lang="scss">
@import '@/bulma/index.scss';
#root-container {
  #app {
    @media screen and (min-width: 700px) {
      min-height: 100vh;
      padding-bottom: 54px;
      margin-bottom: -54px;
    }
  }
}
</style>
