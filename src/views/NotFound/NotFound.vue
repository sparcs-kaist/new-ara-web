<template>
  <div class="container not-found-container">
    <div class="columns">
      <div class="column is-offset-2"></div>
      <div class="column is-8 not-found">
        <h1 class="title">페이지를 찾을 수 없습니다.</h1>
        <p>
          문제가 계속 발생할 경우, 아라 관리자에게 연락해 주십시오.
        </p>
      </div>
      <div class="column is-offset-2"></div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.not-found-container {
  height: calc(100vh - 288px);
  @media screen and (max-width: 768px) {
    height: calc(100vh - 272px);
  }
  .not-found {
    padding: 0.75rem 2rem;
  }
}
</style>
