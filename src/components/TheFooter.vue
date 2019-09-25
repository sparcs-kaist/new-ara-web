<template>
  <footer class="the-footer">
    <div class="footer-menu">
      <div class="footer-item logo-item">
        <a
          id="sparcs-logo"
          href="https://sparcs.org">
          SPARCS
        </a>
      </div>
      <div class="footer-item">
        <!-- @TODO: footer에서 가는 페이지들 만들기 -->
        <a href="https://sparcs.org">
          {{ $t('credit') }}
        </a>
      </div>
      <div class="footer-item">
        <a href="https://sparcs.org">
          {{ $t('license') }}
        </a>
      </div>
      <div class="footer-item">
        <a href="https://sparcs.org">
          {{ $t('rules') }}
        </a>
      </div>
    </div>
    <!-- <div class="footer-contact">
      {{ $t('contact') }}:
      <a href="mailto:ara@sparcs.kaist.ac.kr">
        ara@sparcs.kaist.ac.kr
      </a>
    </div> -->
  </footer>
</template>

<script>
export default {

}
</script>

<i18n>
ko:
  credit: '만든 사람들'
  license: '라이센스'
  rules: '규칙'
  contact: '문의'
en:
  credit: 'Credit'
  license: 'License'
  rules: 'Rules'
  contact: 'Contact'
</i18n>

<style lang="scss" scoped>
.the-footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  position: relative;
  padding: 15px;

  @media screen and (max-width: 700px) {
    flex-direction: column;
  }

  #sparcs-logo {
    font-family: 'Raleway', sans-serif;
    float: left;
  }

  .footer-menu {
    display: flex;
    flex-direction: row;

    @media screen and (max-width: 700px) {
      flex-direction: column-reverse;
    }


    .footer-item {
      margin: 0 1rem 0 0;

      @media screen and (max-width: 700px) {
        margin: 1rem 0 0 0;
      }

      &.logo-item {
        margin: 0 3rem 0 0;

        @media screen and (max-width: 700px) {
          margin: 1rem 0 0 0;
          font-size: 1.3rem;
        }
      }
    }
  }

  .footer-contact {
    @media screen and (max-width: 700px) {
      margin-top: 2rem;
      margin-bottom: 2rem;
    }
  }
}
</style>
