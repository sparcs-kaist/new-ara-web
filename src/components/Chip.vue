<template>
  <button
    class="chip"
    :class="{ chip__clicked : isClicked }"
    @click="click()">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'Chip',
  props: {
    // isClicked required: true로 만들고, Alert Dialog에서 binding되는 변수들을 주어주는 방식으로 변경할 예정.
    // label: { required: true, type: String },
    isClicked: { required: true, type: Boolean },
    skey: { required: true, type: String }
  },
  methods: {
    click () {
      this.$emit('chip-click', !this.isClicked, this.skey)
    }
  }
}
</script>

<style lang="scss" scoped>
.chip {
  //float: left;
  margin: 4px 3px;

  cursor: pointer;
  background: var(--grey-300);
  border: none;
  border-radius: 30px;
  padding: 5px 9px 7px 9px;
  transition: background .4s ease;

  display: flex;
  align-items: center;
  height: 30px;
  font-size: 15px;
  line-height: 30px;

  &:hover {
    box-shadow: 0 2px 6px 0 rgba(51, 51, 51, 0.25);
  }

  &__clicked {
    background: var(--theme-400);
    color: var(--background);
  }
}
</style>
