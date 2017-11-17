<template>
  <div id="app">
    <navbar/>
    <router-view></router-view>
    <foot/>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Navbar from './components/Navbar/Navbar';
import Foot from './components/Foot/Foot';

export default {
  name: 'app',
  components: {
    Navbar, Foot,
  },
  methods: {
    ...mapActions([
      'updateBoardList',
    ]),
  },
  mounted() {
    this.updateBoardList();
  },
};
</script>

<style lang="scss">
@import './styles/variables.scss';

@import "~bulma/sass/utilities/initial-variables";

$primary: $theme-red;

@import '~bulma';
</style>
