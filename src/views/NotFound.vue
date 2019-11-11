<template>
  <div>
    <div class="not-found-container">
      <div>
        페이지를 찾을 수 없습니다.
      </div>
      <router-link
        :to="{ name: 'home' }">
        홈으로
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'not-found',
}
</script>

<style lang="scss">
.not-found-container {
  width: 100%;
  height: inherit !important;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
