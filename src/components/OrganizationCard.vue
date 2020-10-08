<template>
  <router-link
    :to="generateHref"
    class="organization-card"
    :style="{ 'background-color': backgroundColor }">
    <img class="logo" v-if="id" :src="require(`@/assets/Logo${id}.png`)" />
    <span class="name">{{ name }}</span>
  </router-link>
</template>

<style lang="scss" scoped>
.organization-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 140px;
  height: 140px;
  padding:20px;
  margin: 0 0.5% 15px;
  border-radius: 10px;
  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.16);

  .logo {
    width: 90%;
    height: 60%;
    margin-bottom: 10px;
    object-fit: contain;
  }

  .name {
    color: #464646;
    font-size: 15px;
    font-weight: 700;
    text-align: center;
  }
}
</style>

<script>
export default {
  name: 'organization-card',
  props: {
    name: { required: true },
    id: { required: true },
    slug: { required: false },
    backgroundColor: { required: false, default: '#fdf0f0' }
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
        case null:
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
