<template>
  <div>
    <span class="post-title">{{ title }}</span>
    <span class="post-no-comments">({{ noComments }})</span>
    <span class="post-time">{{ time }}</span>
  </div>
</template>

<script>
export default {
  props: ['title', 'time', 'no-comments'],
};
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

.post-no-comments {
  color: $theme-red;
}
</style>
