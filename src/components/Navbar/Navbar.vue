<template>
  <div class="container">
    <div class="columns">
      <div class="column is-2 placeholder"></div>
      <div class="column is-8">
        <nav class="navbar" role="navigation" aria-label="main navigation">
          <div class="navbar-brand">
            <router-link class="navbar-item" to="/">홈</router-link>
          </div>
          <div class="navbar-start">
            <div class="navbar-tabs" :class="{'is-active': menuVisibility}">
              <router-link class="navbar-item" to="/posts/all" @click.native="resetPost">모아보기</router-link>
              <router-link v-for="board in boardList" class="navbar-item" :to="`/posts/${board.en_name}`" @click.native="resetPost">{{ board.ko_name }}</router-link>
            </div>
          </div>

          <div class="navbar-end">
            <div class="navbar-item" style="padding-left: 0px; padding-right: 0px;">
              <span class="icon is-medium">
                <i class="mdi mdi-24px mdi-bell"></i>
              </span>
            </div>
            <div class="navbar-item has-dropdown is-hoverable" @mouseout="onhover = false">
              <a class="navbar-link" @mouseover="onhover = true">
                김유진님
              </a>
              <div class="navbar-dropdown is-right" :class="{ 'show': onhover }">
                <router-link class="navbar-item" to="/setting">세팅</router-link>
                <router-link class="navbar-item" to="/login">로그인</router-link>
                <hr class="navbar-divider">
                <router-link class="navbar-item" to="/login">로그아웃</router-link>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <div class="column is-2 placeholder"></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      onhover: false,
    };
  },
  computed: {
    ...mapState([
      'boardList',
    ]),
  },
  methods: {
    ...mapActions(['fetchPost']),
    resetPost() {
      this.fetchPost(undefined);
    },
  },
};
</script>

<style scoped>
  @media (max-width: 768px) {
    .placeholder {
      padding: 0;
    }
  }

  @media (max-width: 1023px) {
    /*.navbar-tabs {*/
      /*diaplay  */
    /*}*/

    .navbar {
      -webkit-box-align: stretch;
      -ms-flex-align: stretch;
      align-items: stretch;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
    }

    .navbar-end {
      -webkit-box-pack: end;
      -ms-flex-pack: end;
      justify-content: flex-end;
      margin-left: auto;
      -webkit-box-align: stretch;
      -ms-flex-align: stretch;
      align-items: stretch;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
    }

    .navbar-item, .navbar-link {
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
    }

    .navbar-item .has-dropdown {
      -webkit-box-align: stretch;
      -ms-flex-align: stretch;
      align-items: stretch;
    }

    .navbar-dropdown .is-right {
      left: auto;
      right: 0;
    }

    .navbar-dropdown {
      background-color: white;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      border-top: 1px solid #dbdbdb;
      -webkit-box-shadow: 0 8px 8px rgba(10, 10, 10, 0.1);
      box-shadow: 0 8px 8px rgba(10, 10, 10, 0.1);
      display: none;
      font-size: 0.875rem;
      left: 0;
      min-width: 100%;
      position: absolute;
      top: 100%;
      z-index: 20;
    }

    .navbar-dropdown a.navbar-item {
      padding-right: 3rem;
    }

    .navbar-dropdown .navbar-item {
      padding: 0.375rem 1rem;
      white-space: nowrap;
    }

    .navbar-link::after {
      border: 1px solid #F74173;
      border-right: 0;
      border-top: 0;
      content: " ";
      display: block;
      height: 0.5em;
      pointer-events: none;
      position: absolute;
      -webkit-transform: rotate(-45deg);
      transform: rotate(-45deg);
      width: 0.5em;
      margin-top: -0.375em;
      right: 1.125em;
      top: 50%;
    }

    .show {
      display: block !important;
    }
  }
</style>
