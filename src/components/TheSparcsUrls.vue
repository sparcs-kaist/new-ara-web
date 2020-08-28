<template>
  <table class="sparcs-url">
      <th class="sparcs-url-header">SPARCS</th>
      <tr>
          <a href="https://sparcs.org/">
            <img src="@/assets/ServiceAra.svg" class="sparcs-url-elem">
          </a>
      </tr>
      <tr>
          <a href="https://zabo.sparcs.org/">
            <img src="@/assets/ServiceZabo.svg" class="sparcs-url-elem">
          </a>
      </tr>
      <tr>
          <a href="https://otl.kaist.ac.kr/main">
            <img src="@/assets/ServiceOTL.svg" class="sparcs-url-elem">
          </a>
      </tr>
      <tr>
          <a href="https://sparcssso.kaist.ac.kr/">
            <img src="@/assets/ServiceSSO.svg" class="sparcs-url-elem">
          </a>
      </tr>
      <tr>
          <a href="http://ftp.kaist.ac.kr/">
            <img src="@/assets/ServiceGeoul.svg" class="sparcs-url-elem">
          </a>
      </tr>
  </table>
</template>

<script>

export default {
  name: 'TheSparcsUrls'
}
</script>

<style>
.sparcs-url{
  width: 100px;
  padding: 5px;
}

.sparcs-url-header{
  height: 20px;
  padding: 0 3px;
}

.sparcs-url-elem{
  height: 25px;
  padding: 0 2px;
}
</style>
