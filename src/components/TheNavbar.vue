<template>
  <div class="navbar is-transparent" aria-label="main navigation" role="navigation">
    <!-- <TheNavbarFetchProgressBar/> -->
    <div class="container">
      <div class="navbar-brand">
        <router-link
          :to="{ name: 'home' }"
          class="navbar-item navbar-ara">
          <img src="@/assets/ServiceAra.svg" class="ara-logo"/>
        </router-link>

        <a
          class="navbar-burger"
          role="button"
          aria-label="menu"
          aria-expanded="false"
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
          <router-link class="navbar-item navbar-item--write"
          :to="{ name: 'write' }">

            <span class="icon">
              <i class="material-icons">create</i>
            </span>

            <span>{{ $t('write') }}</span>
          </router-link>

          <a class="navbar-item"
            @click="changeLocale"
            id="toggle-language">

            <span class="icon">
              <i class="material-icons">language</i>
            </span>

            <span class="is-hidden-desktop">
              {{ $t('language') }}
            </span>
          </a>

          <router-link
            :to="{ name: 'notifications' }"
            class="navbar-item">

            <span class="icon">
              <i class="material-icons">notifications</i>
            </span>

            <span class="is-hidden-desktop">
              {{ $t('notification') }}
            </span>
          </router-link>

          <router-link
            :to="{ name: 'logout-handler' }"
            class="navbar-item is-hidden-desktop">
            {{ $t('logout') }}
          </router-link>

          <div class="navbar-item">
            <div class="dropdown is-right is-hoverable">
              <router-link
                :to="{ name: isMobileMenuActive ? 'my-info' : null }"
                class="user">

                <img :src="userPicture" class="picture-url"/>
                <span class="username">
                  {{ userNickname }}
                </span>
              </router-link>

              <div class="dropdown-menu is-hidden-touch" id="dropdownMenu" role="menu">
                <div class="dropdown-content">
                  <div class="dropdown-item">
                    <router-link
                      :to="{ name: 'my-info' }"
                      class="navbar-item user">
                      {{ $t('my-page') }}
                    </router-link>
                    <router-link
                      :to="{ name: 'logout-handler' }"
                      class="navbar-item user logout">
                      {{ $t('logout') }}
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <TheNavbarNotifications v-if="isNotificationsOpen" />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import TheNavbarFetchProgressBar from '@/components/TheNavbarFetchProgressBar.vue'
import TheNavbarNotifications from '@/components/TheNavbarNotifications.vue'
import TheNavbarArchives from '@/components/TheNavbarArchives.vue'
import isIE from '@/utils/isIE.js'

export default {
  name: 'the-navbar',

  data () {
    return {
      isMobileMenuActive: false,
      isNotificationsOpen: false
    }
  },

  computed: {
    ...mapState(['boardList']),
    ...mapGetters(['userNickname', 'userPicture']),
    isIE () {
      return isIE()
    }
  },

  methods: {
    toggleMobileMenu () {
      this.isMobileMenuActive = !this.isMobileMenuActive
    },

    changeLocale () {
      this.$root.$i18n.locale = this.$root.$i18n.locale === 'en' ? 'ko' : 'en'
    },

    ...mapActions(['toggleDarkMode'])
  },

  watch: {
    $route () {
      this.isMobileMenuActive = false
    }
  },

  components: {
    TheNavbarFetchProgressBar,
    TheNavbarNotifications,
    TheNavbarArchives
  }
}
</script>

<i18n>
ko:
  language: 'English'
  notification: '알림'
  write: '게시글 작성하기'
  all: '모아보기'
  my-page: '마이페이지'
  logout: '로그아웃'

en:
  language: '한국어'
  notification: 'Notifications'
  write: 'Write a New Post'
  all: 'All'
  my-page: 'my page'
  logout: 'logout'
</i18n>

<style lang="scss" scoped>
@import '@/theme.scss';

.logout {
    color: var(--theme-400);
    transition: color var(--duration) var(--text-timing);
}

.dropdown-content {
  min-width: 30%;
  max-width: 50%;
  border-radius: 10px;
  width: 13rem;
  float: right;
  text-align: right;
  box-shadow: 0 2px 6px 0 rgba(169, 169, 169, 0.64);
  background-color: #ffffff;
}

.dropdown-item {
  padding: 0.2rem 0.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.navigation {
  padding-top: 10px;
}

.navbar-item {
  display: flex;

  &--write {
    color: var(--theme-400);
    transition: color var(--duration) var(--text-timing);

    &:hover {
      color: var(--theme-500);
    }

    .icon {
      margin-right: 10px;
    }
  }

  @include breakPoint(min) {
    .icon {
      margin-right: 10px;
    }
  }
}

.navbar-start {
  flex-wrap: wrap;
  flex: 1;
}

.navbar-ara {
  margin-right: 20px;
}

.navbar-menu {
  background: transparent !important;
  font-weight: 500;
  width: 0;

  @include breakPoint(min) {
    padding: 15px 10px;
    width: inherit;
  }
}

.ara-logo {
  height: 25px;
}

.user {
  display: flex;
}

.picture-url {
  width: 23px;
  height: 23px;
  object-fit: cover;

  border-radius: 100%;
  margin-right: 10px;
}
</style>
