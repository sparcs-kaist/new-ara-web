<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
@import '@/bulma/index.scss';
body {
  background-color: var(--background);
}
</style>
