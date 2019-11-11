<template>
  <div>
    <div class="not-found-container">
      <div class="not-found-404">
        404
      </div>
      <div class="not-found-text">
        페이지를 찾을 수 없습니다.
      </div>
        <router-link
          :to="{ name: 'home' }">
          <div class="not-found-go-to-home">
            홈으로
          </div>
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
@import '@/theme.scss';

.not-found-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .not-found-404 {
    color: $theme-red-dark;
    font-size: 4rem;
    font-weight: bold;
  }

  .not-found-text {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 60px;
  }

  .not-found-go-to-home {
    width: 100px;
    height: 30px;
    background-color: $gray;
    color: white;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    border-radius: 5px;
  }
}
</style>
