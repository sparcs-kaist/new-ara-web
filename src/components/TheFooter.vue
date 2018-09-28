<template>
  <footer class="the-footer">
    <a
      id="sparcs-logo"
      href="https://sparcs.org">
      SPARCS
    </a>
    <div class="container">
      <ul class="footer-menu">
        <li class="footer-item">
          <!-- @TODO: footer에서 가는 페이지들 만들기 -->
          <a href="https://sparcs.org">
            {{ $t('credit') }}
          </a>
        </li>
        <li class="footer-item">
          <a href="https://sparcs.org">
            {{ $t('license') }}
          </a>
        </li>
        <li class="footer-item">
          <a href="https://sparcs.org">
            {{ $t('rules') }}
          </a>
        </li>
      </ul>
    </div>
    <div class="footer-contact">
      {{ $t('contact') }}:
      <a href="mailto:ara@sparcs.kaist.ac.kr">
        ara@sparcs.kaist.ac.kr
      </a>
    </div>
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
  position: relative;
  padding: 1.5rem;

  #sparcs-logo {
    font-family: 'Raleway', sans-serif;
    float: left;
  }

  .footer-menu {
    margin-left: -1rem;
    .footer-item {
      display: inline-block;
      margin: 0 1rem;
    }
  }

  .footer-contact {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
  }
}
</style>
