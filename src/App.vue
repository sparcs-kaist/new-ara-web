<template>
  <div id="app">
    <navbar v-if="shouldHideShell"/>
    <router-view></router-view>
    <foot v-if="shouldHideShell"/>
  </div>
</template>

<script>
import Navbar from './components/Navbar/Navbar';
import Foot from './components/Foot/Foot';

export default {
  name: 'app',
  components: {
    Navbar, Foot,
  },
  computed: {
    shouldHideShell() {
      return this.$route.name !== 'Login';
    },
  },
  beforeCreate() {
    if (this.$route.query.jwt) {
      localStorage.setItem('jwtToken', this.$route.query.jwt);
      this.$router.replace(this.$route.path);
      location.reload();
    }
  },
};
</script>

<style lang="scss">
@import './styles/variables.scss';

@import "~bulma/sass/utilities/initial-variables";

$primary: $theme-red;

@import '~bulma';
@import '~mdi/css/materialdesignicons.css';
</style>
