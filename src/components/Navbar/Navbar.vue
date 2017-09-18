<template>
  <div class="container">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link class="navbar-item" to="/">홈</router-link>

        <button class="button navbar-burger" :class="{'is-active': menuVisibility}" @click="toggleMenuVisibility">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <div class="navbar-menu" :class="{'is-active': menuVisibility}">
        <div class="navbar-start">
          <router-link class="navbar-item" to="/post/create">글쓰기</router-link>
          <router-link class="navbar-item" to="/post/0">글 내용</router-link>
          <router-link class="navbar-item" to="/post">게시판</router-link>
        </div>

        <div class="navbar-end">
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              김유진님
            </a>

            <div class="navbar-dropdown is-right">
              <router-link class="navbar-item" to="/setting">세팅</router-link>
              <router-link class="navbar-item" to="/login">로그인</router-link>
              <hr class="navbar-divider">
              <router-link class="navbar-item" to="/login">로그아웃</router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>

</template>

<script>
export default {
  data() {
    return {
      menuVisibility: false,
    };
  },
  methods: {
    toggleMenuVisibility() {
      this.menuVisibility = !this.menuVisibility;
    },
  },
};
</script>

<style scoped>
.navbar {
  margin-bottom: 2rem;
}

.navbar-burger {
  border-color: transparent;
}
</style>
