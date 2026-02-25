<!-- AllergyFilter.vue -->
<template>
  <div class="allergy-filter">
    <h2 class="allergy-filter__title">
      알러지 필터
    </h2>
    <div class="allergy-filter__buttons">
      <button
        v-for="allergen in allergens"
        :key="allergen.id"
        :class="[
          'allergy-filter__button',
          allergen.selected ? 'allergy-filter__button--selected' : 'allergy-filter__button--unselected'
        ]"
        @click="toggleAllergen(allergen.id)"
      >
        {{ allergen.name }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { initialAllergens } from './utils'
import { Allergen } from './types'

export default {
  name: 'AllergyFilter',
  props: {
    onAllergyChange: {
      type: Function,
      required: true
    },
    initialAllergies: {
      type: Array as () => Allergen[],
      default: () => JSON.parse(JSON.stringify(initialAllergens))
    }
  },
  data (this: any) {
    return {
      allergens: this.initialAllergies
    }
  },
  methods: {
    toggleAllergen (this: any, id: number): void {
      const updatedAllergens = this.allergens.map((allergen: Allergen) =>
        allergen.id === id
          ? { ...allergen, selected: !allergen.selected }
          : allergen
      )
      this.allergens = updatedAllergens
      this.onAllergyChange(updatedAllergens)
    }
  }
}
</script>

<style lang="scss" scoped>
.allergy-filter {
  display: flex;
  flex-direction: column;
  max-width: 366px;
  width: 306px;
  height: auto;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &__title {
    font-size: 16px;
    font-weight: 600;
    color: black;
    font-family: var(--font);
  }

  &__buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    width: 100%;
  }

  &__button {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    min-width: 85px;
    height: 24px;
    padding: 0px 8px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 500;
    line-height: 24px;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s, border-color 0.3s;
    font-family: var(--font);

    &--selected {
      background-color: #ed3a3a;
      color: white;
      border: 1px solid #ed3a3a;
    }

    &--unselected {
      background-color: white;
      color: #c62626;
      border: 1px solid #c62626;
    }
  }
}
</style>
