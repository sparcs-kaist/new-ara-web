<!-- CafeteriaMenuList.vue -->
<template>
  <div class="cafeteria-menu">
    <!-- 메뉴 데이터가 없는 경우 -->
    <div v-if="!menuData || menuData.length === 0" class="cafeteria-menu__empty">
      <span class="cafeteria-menu__empty-text">미운영</span>
    </div>
    <!-- 메뉴 데이터가 있는 경우 -->
    <div v-else class="cafeteria-menu__content">
      <!-- 메뉴 아이템 목록 -->
      <div class="cafeteria-menu__list">
        <div
          v-for="(item, index) in menuData"
          :key="index"
          :class="[
            'cafeteria-menu__item',
            selectedItems.has(index) ? 'cafeteria-menu__item--selected' : ''
          ]"
          @click="toggleItem(index)"
        >
          <div class="cafeteria-menu__item-info">
            <span
              :class="[
                'cafeteria-menu__item-name',
                hasSelectedAllergy(item.allergy) ? 'cafeteria-menu__item-name--warning' : ''
              ]"
            >
              {{ item.menu_name }}
            </span>
            <img
              v-if="hasSelectedAllergy(item.allergy)"
              src="/NewAraExtendIcons/exclamation.svg"
              alt="Exclamation Icon"
              class="cafeteria-menu__warning-icon"
            >
          </div>
          <span class="cafeteria-menu__item-price">
            {{ item.price.toLocaleString() }}원
          </span>
        </div>
      </div>
      <!-- 구분선 -->
      <div class="cafeteria-menu__divider" />
      <!-- Total -->
      <div class="cafeteria-menu__total">
        <span class="cafeteria-menu__total-label">
          Total ({{ selectedItems.size }}개 선택) :
        </span>
        <span class="cafeteria-menu__total-price">
          {{ totalPrice.toLocaleString() }}원
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Allergen, CafeteriaMenuItem } from './types'

export default {
  name: 'CafeteriaMenuList',
  props: {
    menuData: {
      type: Array as () => CafeteriaMenuItem[] | null,
      default: null
    },
    selectedAllergies: {
      type: Array as () => Allergen[],
      required: true
    }
  },
  data (this: any) {
    return {
      selectedItems: new Set<number>()
    }
  },
  computed: {
    selectedAllergyIds (this: any): number[] {
      return this.selectedAllergies
        .filter((allergy: Allergen) => allergy.selected)
        .map((allergy: Allergen) => allergy.id)
    },
    totalPrice (this: any): number {
      return Array.from(this.selectedItems as Set<number>).reduce(
        (sum: number, index: number) => {
          return sum + (this.menuData && this.menuData[index] ? this.menuData[index].price : 0)
        },
        0 as number // 초기값에 타입 명시
      )
    }
  },
  methods: {
    hasSelectedAllergy (this: any, allergyList: number[]): boolean {
      return allergyList.some((id: number) => this.selectedAllergyIds.includes(id))
    },
    toggleItem (this: any, index: number): void {
      const newSelected = new Set(this.selectedItems)
      if (newSelected.has(index)) {
        newSelected.delete(index)
      } else {
        newSelected.add(index)
      }
      this.selectedItems = newSelected
    }
  }
}
</script>

<style lang="scss" scoped>
.cafeteria-menu {
  height: 100%;
  display: flex;
  flex-direction: column;
  &__empty {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 160px; // h-40 = 10rem = 160px

    &-text {
      color: #6b7280; // text-gray-500
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 4px; // gap-1
    margin-top: 8px; // mt-6
    flex: 1 1 auto;
    min-height: 0;
    height: 100%;
  }

  &__list {
    flex: 1 1 auto;
    min-height: 0;
    overflow-y: auto;
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 3px 8px; // py-1 px-2
    cursor: pointer;

    &--selected {
      background-color: #FDF0F0;
    }
  }

  &__item-info {
    display: flex;
    align-items: center;
    gap: 8px; // gap-2
  }

  &__item-name {
    font-weight: 400; // font-medium
    font-size: 14px; // text-xs
    color: black;

    &--warning {
      color: #999999;
    }
  }

  &__warning-icon {
    width: 16px; // w-4
    height: 16px; // h-4
    color: #c62626;
  }

  &__item-price {
    font-weight: 400; // font-medium
    font-size: 14px; // text-xs
    color: black;
  }

  &__divider {
    width: 100%;
    height: 1px;
    background-color: #e5e7eb; // bg-gray-200
  }

  &__total {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__total-label {
    font-weight: 600; // font-semibold
    color: #c62626;
    font-size: 16px;
  }

  &__total-price {
    font-weight: 600; // font-semibold
    color: #ed3a3a;
    font-size: 16px;
  }
}
</style>
