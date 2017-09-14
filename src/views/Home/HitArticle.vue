<template>
  <div>
    <span class="post-hit">{{ hit }}</span>
    <span class="post-title">{{ title }}</span>
  </div>
</template>

<script>
export default {
  props: ['hit', 'title'],
};
</script>

<style>

</style>
