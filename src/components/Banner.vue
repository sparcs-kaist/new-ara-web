<template>
  <div class="banner" :style="{ 'background-image': `url(${bannerImage})`}">
    <!-- For html banner support.(ads or other special banners)-->
    <div v-html="customHtml" />
    <div v-if="!customHtml" class="banner__simple">
      <h1 class="banner__name">
        {{ bannerName }}
      </h1>
      <p class="banner__detail">
        {{ bannerDetails }}
      </p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Banner',

  props: {
    bannerName: {
      type: String
    },
    bannerDetails: {
      type: String
    },
    customHtml: {
      type: String
    },
    bannerImage: String
  }
}
</script>

<i18n>
</i18n>

<style lang="scss" scoped>
@import '@/theme.scss';

.banner{
  position:relative;
  text-align: center;
  aspect-ratio: 4/1;
  @include breakPoint(mobile) {
    min-height: 160px;
    aspect-ratio: initial;
  }
  width: 100%;
  border-radius:10px;
  background-color:var(--grey-600);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center bottom;
  color: var(--grey-100);
  margin-bottom: 1rem;
  &__simple{
    width:100%;
    position:absolute;
    left:50%; top:50%;
    transform: translate(-50%, -50%);
  }
  &__name{
    font-size: 2.5rem;
    @include breakPoint(mobile) {
      font-size: 2rem;
    }
    font-weight: 700;
  }
  &__detail{
    white-space: pre-wrap;
    margin-top: 0.5rem;
    margin-left: 20px;
    margin-right: 20px;
    font-size: 0.85rem;
    @include breakPoint(mobile) {
      font-size: 0.7rem;
    }
  }
}
.banner::before{
  content: "";
  border-radius:10px;
  opacity: 0.3;
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background-color: #000;
}
</style>
