<template>
  <div id="app">
    <navbar/>
    <router-view></router-view>
    <foot/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar/Navbar';
import Foot from '@/components/Foot/Foot';

export default {
  name: 'app',
  components: { Navbar, Foot },
};
</script>

<style lang="scss">
@import './styles/variables.scss';

@import "~bulma/sass/utilities/initial-variables";

$primary: $theme-red;

@import '~bulma';
@import '~mdi/css/materialdesignicons.css';

.modal.is-warning {
  bottom: auto;
  top: 40px;
}
</style>
