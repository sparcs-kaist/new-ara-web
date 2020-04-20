<template>
  <footer class="the-footer">
    <div class="container footer-items">
      <div class="footer-logo footer-item">
        <a href="https://sparcs.org">
          <img
            src="@/assets/SPARCS-Black.png"
            id="sparcs-logo"
            style="height: 1em"
          />
        </a>
      </div>
      <div
        v-for="(item, index) in footerItems"
        :key="item.name"
        class="footer-item"
        :class="{ 'footer-item-last': index === footerItems.length - 1 }"
      >
        <a :href="item.href">
          {{ item.name }}
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data () {
    return {
      footerItems: [
        {
          id: 'credit',
          name: this.$t('credit'),
          href: 'https://sparcs.org'
        },
        {
          id: 'license',
          name: this.$t('license'),
          href: 'https://sparcs.org'
        }
      ]
    }
  }
}
</script>

<i18n>
ko:
  credit: '만든 사람들'
  license: '라이센스'
en:
  credit: 'Credit'
  license: 'License'
</i18n>

<style lang="scss" scoped>
.the-footer {
  display: flex;
  flex-direction: row;
  height: 95px;
  align-items: center;
  border-top: 13px solid #d19696;

  .footer-items {
    display: flex;
    height: 82px;
    margin-top: -26px;
    padding-top: 13px;
    align-items: center;
    border-top: 13px solid #ebb7b7;

    @media screen and (max-width: 700px) {
      flex-direction: column;
    }

    .footer-item {
      @media screen and (min-width: 700px) {
        margin-right: 2rem;
      }
    }

    .footer-logo {
      font-size: 1.5em;

      @media screen and (min-width: 700px) {
        margin-right: 5rem;
        margin-bottom: -0.2em;
      }

      @media not screen and (min-width: 700px) {
        margin-top: 5rem;
        margin-bottom: 2rem;
      }
    }

    .footer-item-last {
      margin-right: 0rem !important;
    }
  }
}
</style>
