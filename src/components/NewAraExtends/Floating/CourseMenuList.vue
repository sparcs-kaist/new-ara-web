<template>
  <div class="course-menu-list">
    <!-- 메뉴가 없을 경우 -->
    <template v-if="!menuData || menuData.length === 0">
      <div class="course-menu-list__empty">
        <span class="course-menu-list__empty-text">미운영</span>
      </div>
    </template>

    <!-- 메뉴가 있을 경우 -->
    <template v-else>
      <div
        v-for="(course, courseIndex) in menuData"
        :key="courseIndex"
        class="course-menu-list__course"
      >
        <div class="course-menu-list__header">
          <h3 class="course-menu-list__course-name">
            {{ course.course_name }}
          </h3>
          <span class="course-menu-list__price">
            {{ formatPrice(course.price) }}원
          </span>
        </div>
        <!-- eslint-disable-next-line vue/html-self-closing -->
        <div class="course-menu-list__divider"></div>

        <div class="course-menu-list__menu-list">
          <div
            v-for="(menuItem, index) in course.menu_list"
            :key="index"
            class="course-menu-list__menu-item"
          >
            <span
              class="course-menu-list__menu-name"
              :class="{
                'course-menu-list__menu-name--disabled': hasSelectedAllergy(menuItem[1])
              }"
            >
              {{ menuItem[0] }}
            </span>
            <img
              v-if="hasSelectedAllergy(menuItem[1])"
              src="/NewAraExtendIcons/exclamation.svg"
              alt="Exclamation Icon"
              class="course-menu-list__icon"
            >
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'CourseMenuList',
  props: {
    menuData: {
      type: Array,
      default: () => null
    },
    selectedAllergies: {
      type: Array,
      required: true
    }
  },
  computed: {
    selectedAllergyIds () {
      return this.selectedAllergies
        .filter(allergy => allergy.selected)
        .map(allergy => allergy.id)
    }
  },
  methods: {
    hasSelectedAllergy (allergyList) {
      return allergyList.some(id => this.selectedAllergyIds.includes(id))
    },
    formatPrice (price) {
      return price.toLocaleString()
    }
  }
}
</script>

<style scoped lang="scss">
.course-menu-list {
  display: flex;
  flex-direction: column;
  margin-top: 12px;

  &__empty {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 160px;

    &-text {
      color: #999;
    }
  }

  &__course {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 12px;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__course-name {
    font-weight: 600;
    font-size: 18px;
    color: #c62626;
  }

  &__price {
    font-weight: 600;
    font-size: 16px;
    color: #ed3a3a;
  }

  &__divider {
    width: 100%;
    height: 1px;
    background-color: #e5e7eb;
  }

  &__menu-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  &__menu-item {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  &__menu-name {
    font-size: 14px;
    font-weight: 400;
    color: #000;

    &--disabled {
      color: #999;
    }
  }

  &__icon {
    width: 16px;
    height: 16px;
  }
}
</style>
