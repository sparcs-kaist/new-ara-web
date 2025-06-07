<template>
  <button
    class="meal-extension-button button is-rounded is-flex is-align-items-center is-justify-content-center"
    style="width:70px; height:70px; background-color:#FDF0F0; box-shadow:0 2px 8px rgba(0,0,0,0.08); padding:15px;"
  >
    <img
      src="/NewAraExtendIcons/cup-straw.svg"
      alt="Cup with Straw Icon"
      class="meal-extension-button__icon"
      style="width:26px; height:40px; margin:auto;"
    >
  </button>
</template>

<script lang="ts">
export default {
  name: 'MealExtensionButton'
}
</script>

<style scoped>
.meal-extension-button {
  border-radius: 35px;
  /* 추가 커스텀 스타일 필요시 여기에 작성 */
}
</style>
