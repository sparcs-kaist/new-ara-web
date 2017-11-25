<template>
  <div>
    <span class="post-title">{{ title }}</span>
    <span class="post-no-comments">({{ commentNumber }})</span>
    <span class="post-time">{{ time }}</span>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: ['title', 'time', 'id'],
  computed: {
    ...mapState([
      'auth',
      'apiUrl',
    ]),
  },
  asyncComputed: {
    commentNumber() {
      return new Promise((resolve) => {
        this.$axios.get(`${this.apiUrl}/comments/?parent_article=${this.id}`, { auth: this.auth })
          .then((res) => {
            resolve(res.data.results.length);
          });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

.post-no-comments {
  color: $theme-red;
}
</style>
