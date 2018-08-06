<template>
  <div id="side-ad">
    광고
  </div>
</template>

<script>
export default {
  name: 'the-ad'
}
</script>

<style lang="scss" scoped>
#side-ad {
  // 사이즈는 Google AdSense를 참고함
  // @ref: https://support.google.com/adsense/answer/6002621?hl=en
  height: 600px;
  width: 160px;

  // for demonstration only
  background-color: whitesmoke;
  text-align: center;
  line-height: 600px;
  color: silver;
  font-weight: 800;
}
</style>
