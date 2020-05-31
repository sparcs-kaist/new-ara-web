<template>
  <table class="sparcs-url-table">
      <th class="sparcs-url-table-header">SPARCS</th>
      <tr>
          <a href="https://sparcs.org/"><img src = "../assets/Logo-Sparcs/ara.png" class="sparcs-url-table-elem"></a>
      </tr>
      <tr>
          <a href="https://zabo.sparcs.org/"><img src = "../assets/Logo-Sparcs/zabo.png" class="sparcs-url-table-elem"></a>
      </tr>
      <tr>
          <a href="https://otl.kaist.ac.kr/main"><img src = "../assets/Logo-Sparcs/otl.png" class="sparcs-url-table-elem"></a>
      </tr>
      <tr>
          <a href="https://sparcssso.kaist.ac.kr/"><img src = "../assets/Logo-Sparcs/sso.png" class="sparcs-url-table-elem"></a>
      </tr>
      <tr>
          <a href="http://ftp.kaist.ac.kr/"><img src = "../assets/Logo-Sparcs/geoul.png" class="sparcs-url-table-elem"></a>
      </tr>
  </table>
</template>

<script>

export default {
  name: 'sparcs-urls'
}
</script>

<style>
.sparcs-url-table{
    width: 100px;
    padding: 5px;
}
.sparcs-url-table-header{
    height: 20px;
    padding-top: 3px;
    padding-bottom: 3px;
}
.sparcs-url-table-elem{
    padding-top: 2px;
    padding-bottom: 2px;
    height: 25px;
}

</style>
