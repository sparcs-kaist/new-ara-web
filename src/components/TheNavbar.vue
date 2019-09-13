<template>
  <!-- @TODO: Accessability
    aria-label="main navigation"
    role="navigation" -->
  <div class="navbar is-transparent">
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
        <!-- <a
          v-if="!isIE"
          @click="toggleDarkMode"
          id="toggle-dark-mode"
          class="navbar-item">
          <span class="icon">
            <i class="material-icons">invert_colors</i>
          </span>
        </a> -->
        <a class="navbar-item"
          @click="$i18n.locale = $i18n.locale === 'en' ? 'ko' : 'en'"
          id="toggle-language">
          <span class="icon">
            <i class="material-icons">language</i>
          </span>
        </a>
        <router-link
          :to="{ name: 'settings' }"
          class="navbar-item user">
          <!-- <span class="icon">
            <i class="material-icons">person</i>
          </span> -->
          <img :src="userPicture" class="picture-url"/>
          <span class="username">
            {{ userNickname }}
          </span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import TheNavbarFetchProgressBar from '@/components/TheNavbarFetchProgressBar.vue'
import TheNavbarAraLogo from '@/components/TheNavbarAraLogo.vue'
import TheNavbarNotifications from '@/components/TheNavbarNotifications.vue'
import TheNavbarArchives from '@/components/TheNavbarArchives.vue'
import isIE from '@/utils/isIE.js'

export default {
  name: 'the-navbar',
  data () {
    return {
      isMobileMenuActive: false
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
  border-top: 5px solid var(--theme-red);

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

  #toggle-dark-mode, #toggle-language, .user {
    text-decoration: none;
  }

  // 왼쪽 음수 여백으로 줄맞춤
  .navbar-menu {
    padding: 0;

    .navbar-start, .navbar-end {
      .navbar-item {
        padding: 10px 0px 5px 15px;
        
        @media screen and (max-width: 1087px){
          padding: 5px 0px 10px 15px;
        }
      }

      .user {
        margin: 0 15px;
        font-weight: 700;
      }
    }

    &.is-active {
      box-shadow: 0px 3px 5px rgba(0,0,0,0.05);
      padding-bottom: 15px;

      @media screen and (min-width: 1088px)   {
        box-shadow: none;
        padding: 0;
      }

      .navbar-end {
        .navbar-item.user {
          font-weight: 700;

          @media screen and (max-width: 1088px) {
            width: 95%;
            height: 90%;
            margin: 0 auto;
            padding: 10px 0;
            background-color: rgba(0,0,0,0.65);
  
            border-radius: 5px;
  
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
  
            color: white;

            &:hover {
              background-color: rgba(0,0,0,0.75);
            }
          }
        }
      }
    }
      
  }

  .user .icon {
    padding-right: 0.5rem;
  }
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

.user-svg {
  margin-right: 0.5rem;
}
</style>
