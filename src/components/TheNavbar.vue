<template>
  <!-- @TODO: Accessability
    aria-label="main navigation"
    role="navigation" -->
  <nav class="navbar is-transparent">
    <!-- <TheNavbarFetchProgressBar/> -->
    <div class="navbar-brand">
      <TheNavbarAraLogo/>
      <!-- @TODO: Accessability
        role="button"
        aria-label="menu"
        aria-expanded="false" -->
      <a
        class="navbar-burger"
        :class="{ 'is-active': isMobileMenuActive }"
        @click="toggleMobileMenu">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div
      class="navbar-menu"
      :class="{ 'is-active': isMobileMenuActive }">
      <div class="navbar-start">
        <router-link
          :to="{ name: 'board'}"
          class="navbar-item">
          모아보기
        </router-link>
        <TheNavbarArchives
          class="navbar-item"
        />
        <router-link
          v-for="board in boardList"
          :key="board.id"
          :to="{
            name: 'board',
            params: {
              boardSlug: board.slug
            }
          }"
          class="navbar-item">
          {{ board.ko_name }}
        </router-link>
      </div>
      <div class="navbar-end">
        <!-- <TheNavbarNotifications/> -->
        <router-link
          :to="{ name: 'settings' }"
          class="navbar-item">
          {{ userNickname }}님
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import TheNavbarFetchProgressBar from '@/components/TheNavbarFetchProgressBar.vue'
import TheNavbarAraLogo from '@/components/TheNavbarAraLogo.vue'
import TheNavbarNotifications from '@/components/TheNavbarNotifications.vue'
import TheNavbarArchives from '@/components/TheNavbarArchives.vue'

export default {
  name: 'the-navbar',
  data () {
    return {
      isMobileMenuActive: false
    }
  },
  computed: {
    ...mapState(['boardList']),
    ...mapGetters(['userNickname'])
  },
  methods: {
    toggleMobileMenu () {
      this.isMobileMenuActive = !this.isMobileMenuActive
    }
  },
  components: {
    TheNavbarFetchProgressBar,
    TheNavbarAraLogo,
    TheNavbarNotifications,
    TheNavbarArchives
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme.scss';
.navbar {
  border-top: 5px solid $theme-red;
  margin-bottom: 1.5rem;
}

// @TODO: Is ther a better way of achieving this..?
.navbar-brand {
  @media (min-width: 1088px) {
    width: calc(calc(100% - 960px) / 2);
  }
  @media (min-width: 1280px) {
    width: calc(calc(100% - 1152px) / 2);
  }
  @media (min-width: 1472px) {
    width: calc(calc(100% - 1344px) / 2);
  }
  a:hover {
    text-decoration: none;
  }
}

// 왼쪽 음수 여백으로 줄맞춤
.navbar-menu {
  margin: 0 0.75rem 0 -0.75rem;
}

.notification.is-api-error {
  position: fixed;
  top: 1rem;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 40em;
}
</style>
