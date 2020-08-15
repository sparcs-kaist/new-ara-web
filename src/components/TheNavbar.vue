<template>
  <div class="navbar is-transparent" aria-label="main navigation" role="navigation">
    <!-- <TheNavbarFetchProgressBar/> -->
    <div class="container">
      <div class="navbar-brand">
        <router-link
          :to="{ name: 'home' }"
          class="navbar-item navbar-ara">
          <img src="@/assets/Services-Ara.png" class="ara-logo"/>
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
            :to="{ name: 'my-info' }"
            class="navbar-item user">

            <img :src="userPicture" class="picture-url"/>
            <span class="username">
              {{ userNickname }}
            </span>
          </router-link>
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

en:
  language: '한국어'
  notification: 'Notifications'
  write: 'Write a New Post'
  all: 'All'
</i18n>

<style lang="scss" scoped>
@import '@/theme.scss';

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

.notification.is-api-error {
  position: fixed;
  top: 1rem;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 40em;
}
</style>
