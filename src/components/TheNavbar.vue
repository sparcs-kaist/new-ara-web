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
          {{ $t('all') }}
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
          {{ board[`${$i18n.locale}_name`] }}
        </router-link>
      </div>
      <div class="navbar-end">
        <router-link
          :to="{ name: 'notifications' }"
          class="navbar-item">
          {{ $t('notification') }}
        </router-link>
        <div
          @click="toggleDarkMode"
          id="toggle-dark-mode"
          class="navbar-item">
          <img
            :src="require('@/assets/colors.svg')"
            alt="다크 모드"
          >
        </div>
        <div class="navbar-item has-dropdown is-hoverable">
          <div class="navbar-link is-arrowless">
            <img :src="require('@/assets/language.svg')"/>
          </div>
          <div class="navbar-dropdown is-boxed is-right">
            <a class="navbar-item"
              @click="$i18n.locale = $i18n.locale === 'en' ? 'ko' : 'en'">
              {{ $i18n.locale === 'en' ? '한국어' : 'English' }}
            </a>
          </div>
        </div>
        <router-link
          :to="{ name: 'settings' }"
          class="navbar-item">
          <img
            :src="require('@/assets/user.svg')"
            class="user-svg"/>
          {{ userNickname }}
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
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
    },
    ...mapActions(['toggleDarkMode'])
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
  // border-top: 5px solid $theme-red;
  border-top: 5px solid var(--theme-red);
  margin-bottom: 1.5rem;

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

  .navbar-link.is-arrowless {
    padding-right: 0.75rem;
    &::after {
      content: none;
    }
  }

  #toggle-dark-mode {
    cursor: pointer;
  }
}

.notification.is-api-error {
  position: fixed;
  top: 1rem;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 40em;
}

.user-svg {
  margin-right: 0.5rem;
}
</style>
