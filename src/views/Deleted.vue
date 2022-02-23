<template>
  <div>
    <div class="not-found-container">
      <div class="not-found-404">
        410
      </div>
      <div class="deleted-text">
        {{ $t('deleted-post') }}
      </div>
      <router-link
        :to="{ name: 'home' }"
      >
        <div class="not-found-go-to-home">
          {{ $t('go-home') }}
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Deleted',

  beforeRouteEnter (to, from, next) {
    next(vm => {
      document.title = vm.$t('document-title')
    })
  }
}
</script>

<i18n>
ko:
  document-title: 'Ara - 삭제된 글'
  go-home: '홈으로'
  deleted-post: '삭제된 글입니다'
en:
  document-title: 'Ara - Deleted Post'
  go-home: 'Go Home'
  deleted-post: 'Deleted Post'
</i18n>

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
    color: var(--theme-400);
    font-size: 4rem;
    font-weight: bold;
  }

  .deleted-text {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 60px;
  }

  .not-found-go-to-home {
    width: 100px;
    height: 30px;
    background-color: var(--grey-400);
    color: white;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    border-radius: 5px;
  }
}
</style>
