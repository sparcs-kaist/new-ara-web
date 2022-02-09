<template>
  <div>
    <IdentityBar />
    <div
      class="navbar"
      aria-label="main navigation"
      role="navigation"
    >
      <div class="navbar-container">
        <div :class="{ 'navbar-active': isMobileMenuActive }" class="navbar-brand">
          <router-link
            :to="{ name: 'home' }"
            class="navbar-item navbar-ara"
          >
            <img src="@/assets/ServiceAra.svg" class="ara-logo">
          </router-link>

          <router-link
            :to="{ name: 'write' }"
            class="navbar-item navbar-item--mobile-write is-hidden-desktop"
          >
            <i class="material-icons write-icon">create</i>
          </router-link>

          <a
            :class="{ 'is-active': isMobileMenuActive }"
            class="navbar-burger"
            role="button"
            aria-label="menu"
            aria-expanded="false"
            @click="toggleMobileMenu"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
        </div>

        <div
          :class="{ 'is-active': isMobileMenuActive }"
          class="navbar-menu"
        >
          <div class="navbar-start">
            <router-link
              :to="{ name: 'board'}"
              class="navbar-item"
            >
              {{ $t('all') }}
            </router-link>

            <router-link :to="{ name: 'archive' }" class="navbar-item">
              {{ $t('archive') }}
            </router-link>

            <router-link
              v-for="board in boardListVisible"
              :key="board.id"
              :to="{
                name: 'board',
                params: {
                  boardSlug: board.slug
                }
              }"
              class="navbar-item"
            >
              {{ board[`${$i18n.locale}_name`] }}
            </router-link>
          </div>

          <div class="navbar-end">
            <router-link
              :to="{ name: 'write' }"
              class="navbar-item navbar-item--write is-hidden-touch"
            >
              <span>{{ $t('write') }}</span>
            </router-link>

            <a
              id="toggle-language"
              class="navbar-item"
              @click="changeLocale"
            >
              <span class="icon">
                <i class="material-icons">language</i>
              </span>

              <span class="is-hidden-desktop">
                {{ $t('language') }}
              </span>
            </a>

            <router-link
              :to="{ name: 'notifications' }"
              class="navbar-item"
            >
              <span
                :class="{'unread-noti': isUnreadNotificationExist}"
                data-badge=" "
                class="icon"
              >
                <i class="material-icons">notifications</i>
              </span>

              <span class="is-hidden-desktop">
                {{ $t('notification') }}
              </span>
            </router-link>

            <div class="navbar-item">
              <div class="dropdown is-right is-hoverable">
                <router-link
                  :to="isMobileMenuActive ? { name: 'my-info' } : $route.fullPath"
                  class="user"
                >
                  <img :src="userPicture" class="picture-url">
                  <span class="username">
                    {{ userNickname }}
                  </span>
                </router-link>

                <div
                  id="dropdownMenu"
                  class="dropdown-menu is-hidden-touch"
                  role="menu"
                >
                  <div class="dropdown-content">
                    <div class="dropdown-item">
                      <router-link
                        :to="{ name: 'my-info' }"
                        class="navbar-item user"
                      >
                        {{ $t('my-page') }}
                      </router-link>
                      <router-link
                        :to="{ name: 'logout-handler' }"
                        class="navbar-item user logout"
                      >
                        {{ $t('logout') }}
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <router-link
              :to="{ name: 'logout-handler' }"
              class="navbar-item is-hidden-desktop"
            >
              {{ $t('logout') }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import IdentityBar from '@/components/IdentityBar.vue'
import isIE from '@/utils/isIE'
import { fetchNotifications } from '@/api'
import { fetchWithProgress } from '@/views/helper'
import { changeLocale } from '@/i18n'

export default {
  name: 'TheNavbar',

  components: {
    IdentityBar
  },

  data () {
    return {
      isMobileMenuActive: false,
      notifications: {},
      isUnreadNotificationExist: false
    }
  },
  computed: {
    ...mapState(['boardList']),
    ...mapGetters(['userNickname', 'userPicture']),
    boardListVisible () {
      return this.boardList.filter(v => !v.is_hidden)
    },
    isIE () {
      return isIE()
    }
  },

  watch: {
    $route () {
      this.isMobileMenuActive = false
    }
  },

  async beforeMount () {
    // Get only first page of notification.
    const query = { ...this.$route.query, page: '1' }
    const [ notifications ] = await fetchWithProgress([ fetchNotifications({ query }) ], 'notifications-failed-fetch')
    this.notifications = notifications.results
    if (this.notifications.some(noti => !noti.is_read)) {
      this.isUnreadNotificationExist = true
    }
  },

  methods: {
    toggleMobileMenu () {
      this.isMobileMenuActive = !this.isMobileMenuActive
    },
    changeLocale,
    ...mapActions(['toggleDarkMode'])
  }
}
</script>

<i18n>
ko:
  archive: '담아둔 글'
  language: 'English'
  notification: '알림'
  write: '게시글 작성하기'
  all: '모아보기'
  my-page: '마이페이지'
  logout: '로그아웃'

en:
  archive: 'Bookmarks'
  language: '한국어'
  notification: 'Notifications'
  write: 'Write Post'
  all: 'All'
  my-page: 'My Page'
  logout: 'Logout'
</i18n>

<style lang="scss" scoped>
@import '@/theme.scss';

.navbar-active {
  background-color: transparent;
  @include breakPoint(min) {
    background-color: var(--theme-100);
  }
}

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
  font-size: 15px;

  .unread-noti{
    &[data-badge] {
      content: attr(data-badge);
      position: relative;
      &::after {
        content: attr(data-badge);
        position: absolute;
        background: red;
        border-radius: 50%;
        display: block;
        padding: 0.3em;
        color: black;
        font-size: 15px;
        max-height: 20px;
        max-width: auto;
        right: 2px;
        top: 0px;
      }
    }
  }

  .write-icon {
    color: var(--theme-400);
  }

  &--mobile-write {
    width: 24px;
    padding: 0;
  }

  &--write {
    color: var(--theme-400);
    border: 1px solid var(--theme-400);
    border-radius: 5px;
    height: 30px;
    width: 128px;
    font-size: 14px;
    margin-right: 10px;

    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      color: white;
      background-color: var(--theme-400);
      transition: color var(--duration) var(--text-timing);
      transition: background-color var(--duration) var(--text-timing);
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

@mixin calByContainer($property, $offset: 0px) {
  @media screen and (min-width: 1088px) {
    #{$property}: calc((100vw - 960px) / 2 - #{$offset});
  }

  @media screen and (min-width: 1280px) {
    #{$property}: calc((100vw - 1152px) / 2 - #{$offset});
  }

  @media screen and (min-width: 1472px) {
    #{$property}: calc((100vw - 1344px) / 2 - #{$offset});
  }
}

.navbar-container {
  @media screen and (min-width: 1088px) {
    display: flex;
  }
  width: 100%;
}

.navbar-brand {
  display: flex;
  @include breakPoint(min) {
    flex: 1;
  }

  .navbar-burger {
    width: 40px;
    margin-left: 5px;
    margin-right: 10px;
    span {
      height: 2px;
      width: 18px;
    }
    &:hover{
      background-color: transparent;
    }
  }
  .navbar-ara {
    flex:1;
    padding-left: 24px;
  }
}

.navbar-start {
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  flex: 1;

  @include calByContainer(margin-left, 80px);
  @include breakPoint(min) {
    margin-left: 0;
    padding-left: 0;

    .navbar-item {
      padding-top: 8px;
      padding-bottom: 8px;
    }
  }
}

.navbar-end {
  align-items: center;
  padding-left: 10px;
  margin-right: 24px;
  @include calByContainer(min-width);

  .navbar-item {
    padding: 8px 4px;

    &:last-child {
      padding-right: 15px;
    }
  }
}

.navbar-menu {
  background: transparent /*!important*/;
  font-weight: 500;
  flex: 1;

  @include breakPoint(min) {
    padding: 10px 10px;
    padding-top: 0px;
    width: inherit;
    background-color: var(--theme-100);
    box-shadow: 0 7px 6px 0 rgba(169, 169, 169, 0.64);
  }
}

.ara-logo {
  height: 27px;
  width: 50px;
}

.user {
  display: flex;
}

.picture-url {
  width: 23px;
  height: 23px;
  object-fit: cover;

  border-radius: 100%;
  margin-left: 5px;
  margin-right: 10px;
}

</style>
