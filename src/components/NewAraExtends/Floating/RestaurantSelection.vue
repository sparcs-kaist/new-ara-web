<template>
  <ul class="restaurant-selection-list">
    <li
      v-for="restaurant in restaurants"
      :key="restaurant"
      :class="['restaurant-selection-list__item', { selected: restaurant === selectedLocation }]"
      @click="selectRestaurant(restaurant)"
    >
      {{ restaurant }}
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'RestaurantSelection',
  props: {
    initialRestaurant: {
      type: String,
      required: true
    },
    onSelect: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      selectedLocation: this.initialRestaurant,
      restaurants: [
        '카이마루',
        '서맛골',
        '동맛골 1층',
        '카페테리아',
        '동맛골 2층',
        '교수회관'
      ]
    }
  },
  methods: {
    selectRestaurant (restaurant: string) {
      this.selectedLocation = restaurant
      this.onSelect(restaurant)
    }
  }
})
</script>

<style scoped>
.restaurant-selection-list {
  padding: 8px 0;
  margin: 0;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  min-width: 180px;
  list-style: none;
}

.restaurant-selection-list__item {
  padding: 5px 5px;
  cursor: pointer;
  font-size: 14px;
  color: black;
  transition: background 0.15s, color 0.15s;
}

.restaurant-selection-list__item:hover{
  background: #fdf0f0;
}

</style>
