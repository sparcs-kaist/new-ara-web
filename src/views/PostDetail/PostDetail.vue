<template>
  <div>
    <h1>글 내용</h1>
    {{ msg }} <br/>
    {{ language }}
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: ['post_id'],
  data() {
    return {
      msg: `message ${this.post_id}`,
    };
  },
  computed: {
    ...mapState(['language']),
  },
};
</script>

<style>

</style>
