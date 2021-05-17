<template>
  <div class="organization-card-wrap">
    <router-link
      :to="generateHref"
      class="organization-card"
      :style="{ 'background-color': backgroundColor }">
      <i class="logo logo--icon material-icons" v-if="icon">{{icon}}</i>
      <img class="logo" v-else-if="id" :src="require(`@/assets/Logo${id}.png`)" />
    </router-link>
    <span class="name">{{ $t(name) }}</span>
  </div>
</template>

<style lang="scss" scoped>
@import "@/theme.scss";
.organization-card-wrap{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .organization-card {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 93px;
    height: 93px;
    padding: 20px 0;
    border-radius: 50%;
    //border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.16);

    @include breakPoint(mobile) {
      width: 80px;
      height: 80px;
    }

    @media screen and (max-width: 480px){
      width: 70px;
      height: 70px;
    }

    .logo {
      width: 90%;
      height: 60%;
      object-fit: contain;

      &--icon {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 40px;
        color: white;

        @media screen and (max-width: 480px){
          font-size: 30px;
        }

      }
    }
  }
  .name {
    color: #464646;
    font-size: 15px;
    font-weight: 700;
    text-align: center;
    margin: 15px 0;

    @include breakPoint(mobile) {
      font-size: 11px;
      font-weight: 600;
    }
  }
}
</style>

<script>
export default {
  name: 'organization-card',
  props: {
    name: { type: String, required: true },
    id: { type: String, required: true },
    icon: { type: String },
    slug: { type: String },
    backgroundColor: { type: String, default: '#fdf0f0' }
  },
  computed: {
    generateHref () {
      switch (this.id) {
        case 'KAIST':
          return {
            name: 'board',
            params: {
              boardSlug: 'portal-notice'
            }
          }
        case 'all':
          return {
            name: 'board'
          }
        default:
          return this.generateOrganizationHref()
      }
    }
  },
  methods: {
    generateOrganizationHref () {
      if (this.slug) {
        return {
          name: 'board',
          params: {
            boardSlug: 'organization-notice'
          },
          query: {
            topic: this.slug
          }
        }
      }

      return ''
    }
  }
}
</script>

<i18n>
ko:
  portal-notice: '포탈공지'
  all-posts: '전체 게시물'
  clubs-union: '동아리연합회'
  dormitory-council: '생활관 자치회'
  welfare-committee: '학생복지위원회'
  undergraduate-association: '총학생회'
  graduate-association: '대학원 총학생회'
  freshman-council: '새내기학생회'
  kcoop: '협동조합'

en:
  portal-notice: 'Portal Notice'
  all-posts: 'All Posts'
  clubs-union: 'Clubs Union'
  dormitory-council: 'Dormitory Council'
  welfare-committee: 'Welfare Committee'
  undergraduate-association: 'Undergraduate Association'
  graduate-association: 'Graduate Association'
  freshman-council: 'Freshman Council'
  kcoop: 'KCOOP'
</i18n>
