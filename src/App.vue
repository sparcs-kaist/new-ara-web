<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import '@/style.scss';
@import '~bulma/sass/utilities/initial-variables';
@import '~bulma/sass/utilities/functions';

$primary: $theme-red;

// Customize here
@import '~bulma';
</style>
