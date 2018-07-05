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
@import '@/style.scss';
@import '~bulma/sass/utilities/initial-variables';
@import '~bulma/sass/utilities/functions';

$primary: $theme-red;

// Customize here
@import '~bulma';
</style>
