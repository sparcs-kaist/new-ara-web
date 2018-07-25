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
@import '~bulma/sass/utilities/initial-variables.sass';
@import '~bulma/sass/utilities/functions.sass';

$primary: $theme-red;

@import '~bulma/bulma.sass';
</style>
