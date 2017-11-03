<template>
  <div class="recomment-container">
    <div class="author"> {{ this.recomment.created_by }} </div>
    <div class="recomment"> {{ this.recomment.content }} </div>
    <post-action :context="this.recomment" :is-article="false" />
  </div>
</template>

<script>
import PostAction from './PostAction';

export default {
  components: {
    PostAction,
  },
  props: [
    'recomment',
  ],
};
</script>

<style>
.recomment-container {
  margin-bottom: .3rem;
}
</style>
