<template>
  <div>
    <splide
      :key="$i18n.locale"
      :options="primaryOptions"
      class="the-organizations organizations-padding"
    >
      <splide-slide
        v-for="organization in organizations"
        :key="organization.id"
        v-bind="organization"
      >
        <OrganizationCard
          :key="organization.id"
          v-bind="organization"
        />
      </splide-slide>
    </splide>
    <OrganizationCard
      id=""
      class="is-invisible organizations-padding"
      name="portal-notice"
    />
  </div>
</template>

<style lang="scss">
@import "@/theme.scss";

.the-organizations {
  margin: 0 auto;
  position: absolute;
  left: 0;
  right: 0;
}

.organizations-padding{
  padding: 0 50px;

  @media screen and (max-width: 480px){
    padding: 24px;
  }
}

.custom-arrow > svg{
  fill: #666666 !important;
  font-size: 0.6em;
  visibility: visible;

  @media screen and (max-width: 480px){
    visibility: collapse;
  }
}
</style>

<script>
import OrganizationCard from '@/components/OrganizationCard.vue'
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import '@splidejs/splide/dist/css/themes/splide-sea-green.min.css'

export default {
  name: 'TheOrganizations',

  components: {
    OrganizationCard,
    Splide,
    SplideSlide
  },

  data () {
    return {
      organizations: [
        { name: 'portal-notice', id: 'KAIST', backgroundColor: '#dbdbdb' },
        { name: 'all-posts', id: 'all', icon: 'dashboard', backgroundColor: '#e15858' },
        { name: 'clubs-union', id: 'UA', slug: 'clubs-union' },
        { name: 'dormitory-council', id: 'GSDC', slug: 'dorm-council' },
        { name: 'welfare-committee', id: 'SWF', slug: 'welfare-cmte' },
        { name: 'undergraduate-association', id: 'SA', slug: 'undergrad-assoc' },
        { name: 'graduate-association', id: 'GSA', slug: 'grad-assoc' },
        { name: 'freshman-council', id: 'NSA', slug: 'freshman-council' },
        { name: 'kcoop', id: 'KCOOP', slug: 'kcoop' }
      ],
      primaryOptions: {
        type: 'loop',
        perPage: 9,
        interval: 3000,
        perMove: 1,
        gap: '1rem',
        arrows: true,
        autoplay: true,
        pagination: false,
        breakpoints: {},
        classes: {
          arrow: 'splide__arrow custom-arrow'
        }
      }
    }
  },

  created () {
    for (const i of [[1470, 8], [1280, 7], [1000, 6], [767, 5], [590, 4], [480, 4], [435, 3]]) {
      this.primaryOptions.breakpoints[i[0].toString()] = {
        perPage: i[1],
        padding: {
          left: 0,
          right: i[0] <= 480 ? 40 : 0
        }
      }
    }
  }
}
</script>
