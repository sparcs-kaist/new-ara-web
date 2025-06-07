<!-- AraBetaButton.vue -->
<template>
  <button class="ara-beta-button">
    <div class="ara-beta-button__logo-container">
      <img
        src="/NewAraExtendIcons/SparcsLogo.svg"
        alt="Sparcs Logo"
        class="ara-beta-button__logo"
      >
      <span class="ara-beta-button__beta-label">
        β
      </span>
    </div>
  </button>
</template>

<script lang="ts">
export default {
  name: 'AraBetaButton'
}
</script>

<style lang="scss" scoped>
.ara-beta-button {
  display: flex;
  width: 70px;
  height: 70px;
  align-items: center;
  justify-content: center;
  padding: 0;
  background-color: #ed3a3a;
  border-radius: 35px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: rgba(237, 58, 58, 0.9); // #ed3a3a at 90% opacity
  }

  &__logo-container {
    position: relative;
    width: 32px; // w-8 = 8 * 4px = 32px
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__logo {
    position: absolute;
    right: 12px;
    top: 5px;
    width: 18px;
    height: 44px;
  }

  &__beta-label {
    position: absolute;
    width: 9px;
    top: 0;
    right: -3px;
    font-weight: 600; // font-semibold
    color: white;
    font-size: 16px; // text-base
    text-align: center;
    line-height: normal;
    white-space: nowrap;
  }
}
</style>
