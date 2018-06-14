<template>
  <div id="app" v-if="isLoginView || isAppReady">
    <navbar v-if="!isLoginView"/>
    <router-view></router-view>
    <foot v-if="!isLoginView"/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Vue from 'vue';
import Navbar from './components/Navbar/Navbar';
import Foot from './components/Foot/Foot';

export default {
  name: 'app',
  components: {
    Navbar, Foot,
  },
  data() {
    return {
      jwtTokenVerified: false,
    };
  },
  computed: {
    ...mapState([
      'apiUrl',
      'boardList',
    ]),
    isLoginView() {
      return this.$route.name === 'Login';
    },
    isAppReady() {
      return this.jwtTokenVerified && this.boardList.length > 0;
    },
  },
  methods: {
    ...mapActions([
      'updateBoardList',
    ]),
  },
  mounted() {
    /* If url contains jwt info, save it into localStorage and refresh the page. */
    if (this.$route.query.jwt) {
      localStorage.setItem('jwtToken', this.$route.query.jwt);
      Vue.prototype.$axios.defaults.headers.common.Authorization = `JWT ${localStorage.getItem('jwtToken')}`;
      this.$router.replace(this.$route.path);
    }

    /* Check if verified token exists in localStorage. */
    if (this.$route.path !== '/login') {
      this.$axios({
        method: 'POST',
        url: `${this.apiUrl}/verify-jwt-token/`,
        data: {
          token: localStorage.getItem('jwtToken'),
        },
      }).then((res) => {
        if (res.data.token === localStorage.getItem('jwtToken')) {
          this.jwtTokenVerified = true;
        } else {
          this.$router.replace('/login');
        }
      }).catch(() => {
        this.$router.replace('/login');
      });
    }
  },
  async updated() {
    /* Get board list only once if user is logged in. */
    if (this.jwtTokenVerified && this.boardList.length === 0) {
      await this.updateBoardList();
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

.modal.is-warning {
  bottom: auto;
  top: 40px;
}
</style>
