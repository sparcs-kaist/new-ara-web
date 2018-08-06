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
          <router-link :to="{ name: 'not-found' }">
            Credit
          </router-link>
        </li>
        <li class="footer-item">
          <router-link :to="{ name: 'not-found' }">
            License
          </router-link>
        </li>
        <li class="footer-item">
          <router-link :to="{ name: 'not-found' }">
            Rules
          </router-link>
        </li>
      </ul>
    </div>
    <div class="footer-contact">
      Contact:
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
