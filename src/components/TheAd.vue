<template>
  <div class="ad-container">
    <div id="side-ad">
      광고
    </div>
    <div class="about-ad">
      아라에 광고를 달고 싶다면 관리자에게 문의해주세요.
    </div>
  </div>
</template>

<script>
export default {
  name: 'the-ad'
}
</script>

<style lang="scss" scoped>
.ad-container {
  width: 160px;

  #side-ad {
    // 사이즈는 Google AdSense를 참고함
    // @ref: https://support.google.com/adsense/answer/6002621?hl=en
    height: 600px;
    width: 160px;
    position: relative;

    // for demonstration only
    background-color: whitesmoke;
    text-align: center;
    line-height: 600px;
    color: silver;
    font-weight: 800;
  }

  .about-ad {
    font-size: 0.75rem;
    padding: 0.5rem 0;
  }
}
</style>
