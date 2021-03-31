<template>
  <div class="chip">
    <button
      class="chip__button"
      v-on:click="click()"
      v-bind:class="{ chip__button__clicked : isClicked }">
      <slot></slot>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    label: { required: true, type: String },
    isClicked: { default: false, type: Boolean }
  },
  methods: {
    click () {
      this.isClicked = !this.isClicked
      this.$emit('chip-click')
    }
  }
}
</script>

<style lang="scss" scoped>
.chip {
  display: flex;
  justify-content: center;
  float: left;
  margin: 4px 5px 4px 5px;

  &__button {
    cursor: pointer;
    background: var(--grey-300);
    border: none;
    border-radius: 30px;
    padding: 3px 9px;
    transition: background .4s ease;
    font-size: 13px;

    &:hover {
      box-shadow: 0 2px 6px 0 rgba(51, 51, 51, 0.25);
    }

    &__clicked {
      background: var(--theme-400);
      color: var(--background);
    }
  }
}
</style>
