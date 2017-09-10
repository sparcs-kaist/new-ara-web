<template>
  <div id="app">
    <navbar/>
    <router-view></router-view>
    <foot/>
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
};
</script>

<style>
</style>
