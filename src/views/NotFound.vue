<template>
  <div>
    페이지를 찾을 수 없습니다.
    <router-link
      :to="{ name: 'home' }">
      홈으로
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'not-found'
}
</script>

<style>

</style>
