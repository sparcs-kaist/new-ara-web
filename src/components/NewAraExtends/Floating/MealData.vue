<template>
  <div class="meal-data">
    <div class="meal-data__header">
      <div class="meal-data__header-top">
        <h2 class="meal-data__title">
          오늘의 학식
        </h2>

        <button class="meal-data__filter-button" @click="toggleAllergyFilter">
          <span>알러지 필터</span>
          <img
            src="/NewAraExtendIcons/filter-icon.svg"
            alt="Filter Icon"
            class="meal-data__filter-icon"
          >
        </button>

        <div v-if="isAllergyFilterVisible" class="meal-data__filter-panel">
          <AllergyFilter
            :on-allergy-change="handleAllergyChange"
            :initial-allergies="selectedAllergies"
          />
        </div>

        <div class="meal-data__restaurant-selector">
          <button
            class="meal-data__restaurant-button"
            @click="toggleDropdown"
          >
            <span>{{ selectedRestaurant }}</span>
            <img
              src="/NewAraExtendIcons/chevron-down.svg"
              alt="Arrow"
              :class="{ rotated: isDropdownOpen }"
            >
          </button>
          <div v-if="isDropdownOpen" class="meal-data__dropdown">
            <RestaurantSelection
              :on-select="handleRestaurantSelect"
              :initial-restaurant="selectedRestaurant"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="meal-data__divider" />
    <div class="meal-data__controls">
      <div class="meal-data__date-nav">
        <button class="meal-data__prev-button" @click="handlePreviousDay">
          <img
            src="/NewAraExtendIcons/caret-left-fill.svg"
            alt="Prev"
          >
        </button>
        <span class="meal-data__date-text">{{ formattedDate }}</span>
        <button class="meal-data__next-button" @click="handleNextDay">
          <img
            src="/NewAraExtendIcons/caret-right-fill.svg"
            alt="Next"
          >
        </button>
      </div>
      <div class="meal-data__meals">
        <button
          v-for="meal in mealOptions"
          :key="meal"
          :class="['meal-data__meal-button', { selected: meal === selectedMeal }]"
          @click="selectedMeal = meal"
        >
          {{ meal }}
        </button>
      </div>
    </div>

    <div v-if="isLoading" class="meal-data__loading">
      로딩 중...
    </div>
    <div v-else-if="error" class="meal-data__error">
      {{ error }}
    </div>
    <div v-else class="meal-data__menu-list-container">
      <CafeteriaMenuList
        v-if="selectedRestaurant === '카페테리아'"
        :menu-data="getCurrentCafeteriaMenuData()"
        :selected-allergies="selectedAllergies"
      />
      <CourseMenuList
        v-else
        :menu-data="getCurrentMenuData()"
        :selected-allergies="selectedAllergies"
      />
    </div>
  </div>
</template>

<script>
import AllergyFilter from './AllergyFilter.vue'
import RestaurantSelection from './RestaurantSelection.vue'
import CourseMenuList from './CourseMenuList.vue'
import CafeteriaMenuList from './CafeteriaMenuList.vue'
import { initialAllergens } from './utils'

const restaurantKeyMap = {
  카페테리아: 'east1',
  카이마루: 'fclt',
  서맛골: 'west',
  '동맛골 1층': 'east1',
  '동맛골 2층': 'east2',
  교수회관: 'emp'
}

const mealTimeMap = {
  아침: 'morning_menu',
  점심: 'lunch_menu',
  저녁: 'dinner_menu'
}

export default {
  name: 'MealData',
  components: {
    AllergyFilter,
    RestaurantSelection,
    CourseMenuList,
    CafeteriaMenuList
  },
  data () {
    return {
      isAllergyFilterVisible: false,
      selectedAllergies: initialAllergens,
      mealOptions: ['아침', '점심', '저녁'],
      selectedMeal: '점심',
      currentDate: new Date(),
      isDropdownOpen: false,
      selectedRestaurant: '카이마루',
      courseMenuData: null,
      cafeteriaMenuData: null,
      isLoading: false,
      error: null
    }
  },
  computed: {
    formattedDate () {
      const days = ['일', '월', '화', '수', '목', '금', '토']
      const date = this.currentDate
      const day = days[date.getDay()]
      return `${date.getMonth() + 1}/${date.getDate()} (${day})`
    }
  },
  watch: {
    currentDate (newDate) {
      this.fetchMenuData(newDate)
    }
  },
  mounted () {
    this.fetchMenuData(this.currentDate)
  },
  methods: {
    toggleAllergyFilter () {
      this.isAllergyFilterVisible = !this.isAllergyFilterVisible
    },
    handleAllergyChange (updatedAllergies) {
      this.selectedAllergies = updatedAllergies
    },
    toggleDropdown () {
      this.isDropdownOpen = !this.isDropdownOpen
    },
    handleRestaurantSelect (restaurant) {
      this.selectedRestaurant = restaurant
      this.isDropdownOpen = false
      this.fetchMenuData(this.currentDate)
    },
    handleNextDay () {
      this.currentDate = new Date(this.currentDate.getTime() + 86400000)
    },
    handlePreviousDay () {
      this.currentDate = new Date(this.currentDate.getTime() - 86400000)
    },
    formatDateForAPI (date) {
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    },
    async fetchMenuData (date) {
      this.isLoading = true
      this.error = null
      try {
        const formattedDate = this.formatDateForAPI(date)
        const [courseData, cafeteriaData] = await Promise.all([
          fetch(`https://newara.dev.sparcs.org/api/meals/${formattedDate}/course_menu/`).then((res) => res.json()),
          fetch(`https://newara.dev.sparcs.org/api/meals/${formattedDate}/cafeteria_menu/`).then((res) => res.json())
        ])
        this.courseMenuData = courseData
        this.cafeteriaMenuData = cafeteriaData
      } catch (err) {
        this.error = err.message || '메뉴를 불러오는데 실패했습니다.'
      } finally {
        this.isLoading = false
      }
    },
    getCurrentMenuData () {
      if (this.selectedRestaurant === '카페테리아' || !this.courseMenuData) return null
      const restaurantKey = restaurantKeyMap[this.selectedRestaurant]
      const timeKey = mealTimeMap[this.selectedMeal]
      const restaurant = this.courseMenuData[restaurantKey]
      return restaurant ? restaurant[timeKey] : null
    },
    getCurrentCafeteriaMenuData () {
      if (!this.cafeteriaMenuData) return null
      const timeKey = mealTimeMap[this.selectedMeal]
      return this.cafeteriaMenuData.east1 && this.cafeteriaMenuData.east1[timeKey] ? this.cafeteriaMenuData.east1[timeKey] : null
    }
  }
}
</script>

<style scoped lang="scss">
.meal-data {
  display: flex;
  flex-direction: column;
  width: 375px;
  height: 100%;
  padding: 1rem;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  font-family: var(--font);
  min-height: 500px;
  max-height: calc(100vh - 200px);

  &__header {
    display: flex;
    flex-direction: column;
  }

  &__header-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__title {
    font-size: 20px;
    font-weight: 600;
    color: black;
    margin-right: 8px;
  }

  &__filter-button {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 600;
    color: #c62626;
    margin-right: auto;
    gap: 0.25rem;
    background-color: white;
    border: none;
    padding: 0px;
  }

  &__filter-icon {
    width: 1rem;
    height: 1rem;
  }

  &__filter-panel {
    position: absolute;
    top: 0;
    right: 100%;
    margin-right: 0.5rem;
  }

  &__restaurant-selector {
    position: relative;
  }

  &__restaurant-button {
    display: flex;
    align-items: center;
    font-weight: 600;
    font-size: 18px;
    color: #c62626;
    gap: 5px;
    background-color: white;
    border: none;
  }

  &__dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: 0.5rem;
    z-index: 50;
  }

  &__divider {
    width: 100%;
    height: 1px;
    background: #e5e5e5;
    margin-top:3px;
    margin-bottom: 3px;
  }

  &__controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 6px;
    margin-bottom: 10px
  }

  &__date-nav {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  &__date-text {
    font-size: 14px;
    font-weight: 600;
    color: black;
  }

  &__prev-button {
    display: flex;
    background-color: white;
    border: none;
  }

  &__next-button {
    display: flex;
    background-color: white;
    border: none;
  }

  &__meals {
    display: flex;
    gap: 0.5rem;
  }

  &__meal-button {
    height: 24px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
    padding: 0 0.75rem;
    border: 1px solid #ccc;
    background: white;
    color: black;
    line-height: 24px;
    display: flex;
    align-items: center;

    &.selected {
      background: #ed3a3a;
      color: white;
      border: none;
    }
  }

  &__loading,
  &__error {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 10rem;
    color: #666;
  }

  &__menu-list-container {
    padding: 0px;
    padding-right: 8px; // 스크롤바 여백
    padding-left: 8px; // 대칭성
    flex: 1 1 auto;
    min-height: 0;  // flexbox 스크롤 문제 해결용 필수
    overflow: auto;
    scrollbar-width: thin; //firefox
    scrollbar-color: #fff transparent; //firefox
    &::-webkit-scrollbar {
      width: 8px;
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background: #fdf0f0;
      border-radius: 4px;
      border: 2px solid transparent;
      background-clip: padding-box;
      transition: background 0.2s;
    }
    &::-webkit-scrollbar-thumb:hover {
      background: #fdf0f0; // hover 시 색상
    }
    &::-webkit-scrollbar-thumb:active {
      background: #fdf0f0; // 클릭(드래그) 시 색상
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }
  }

  .rotated {
    transform: rotate(180deg);
    transition: transform 0.2s;
  }
}
</style>
