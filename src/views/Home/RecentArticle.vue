<template>
  <div>
    <span class="post-title">{{ title }}</span>
    <span class="post-no-comments">({{ commentNum }})</span>
    <span class="post-time">{{ time }}</span>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: ['title', 'time', 'id'],
  data() {
    return {
      commentNum: 0,
    };
  },
  computed: {
    ...mapState([
      'auth',
      'apiUrl',
    ]),
  },
  mounted() {
    this.$axios.get(`${this.apiUrl}/comments/?parent_article=${this.id}`, { auth: this.auth })
      .then((res) => {
        this.commentNum = res.data.results.length;
      });
  },
};
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

.post-no-comments {
  color: $theme-red;
}
</style>
