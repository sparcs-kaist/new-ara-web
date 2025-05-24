<!-- AraBetaSidebar.vue -->
<template>
  <div class="ara-sidebar">
    <div class="ara-sidebar__button-container">
      <div class="ara-sidebar__toggle-button" @click="toggleSidebar">
        <ara-beta-button />
      </div>
      <div
        class="ara-sidebar__meal-data"
        :class="isMealDataVisible ? 'ara-sidebar__meal-data--visible' : 'ara-sidebar__meal-data--hidden'"
      >
        <meal-data />
      </div>
    </div>
    <div
      class="ara-sidebar__extension-container"
      :class="isSidebarOpen ? 'ara-sidebar__extension-container--visible' : 'ara-sidebar__extension-container--hidden'"
    >
      <div class="ara-sidebar__extension-button" @click="toggleMealData">
        <meal-extension-button />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import AraBetaButton from './Floating/AraBetaButton.vue'
import MealExtensionButton from './Floating/MealExtensionButton.vue'
import MealData from './Floating/MealData.vue'

export default {
  name: 'AraBetaSidebar',
  components: {
    AraBetaButton,
    MealExtensionButton,
    MealData
  },
  data () {
    return {
      isSidebarOpen: false,
      isMealDataVisible: false
    }
  },
  methods: {
    toggleSidebar (this: any) {
      this.isSidebarOpen = !this.isSidebarOpen
      // Sidebar가 닫힐 때 MealData도 함께 닫기
      if (!this.isSidebarOpen) {
        this.isMealDataVisible = false
      }
    },
    toggleMealData (this: any) {
      // Sidebar가 열려있을 때만 토글 가능
      if (this.isSidebarOpen) {
        this.isMealDataVisible = !this.isMealDataVisible
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.ara-sidebar {
  position: fixed;
  bottom: 70px;
  right: 30px;
  z-index: 10;

  &__button-container {
    cursor: pointer;
    position: relative;
  }

  &__toggle-button {
    cursor: pointer;
  }

  &__meal-data {
    position: absolute;
    bottom: 0;
    right: 100%;
    margin-right: 16px;
    transition: all 0.3s;
    z-index: 15;

    &--visible {
      opacity: 1;
      transform: translateX(0);
    }

    &--hidden {
      opacity: 0;
      transform: translateX(16px);
      pointer-events: none;
    }
  }

  &__extension-container {
    position: absolute;
    bottom: 80px;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: all 0.3s;
    z-index: 10;

    &--visible {
      opacity: 1;
      transform: translateY(0);
    }

    &--hidden {
      opacity: 0;
      transform: translateY(16px);
      pointer-events: none;
    }
  }

  &__extension-button {
    cursor: pointer;
  }
}
</style>
