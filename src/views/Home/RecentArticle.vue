<template>
  <div>
    <router-link class="router-link" :to="{ name: 'PostDetail', params: { board: boardNameList[article.parent_board.id - 1], post_id: article.id }}">
      <span class="post-title">{{ article.title }}</span>
      <span class="post-no-comments">({{ commentNumber }})</span>
      <span class="post-time">{{ elapsedTime(article.created_at) }}</span>
    </router-link>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  props: ['article'],
  computed: {
    ...mapState([
      'auth',
      'apiUrl',
    ]),
    ...mapGetters([
      'boardNameList',
    ]),
  },
  asyncComputed: {
    commentNumber() {
      return new Promise((resolve) => {
        this.$axios.get(`${this.apiUrl}/api/comments/?parent_article=${this.article.id}`)
          .then((res) => {
            resolve(res.data.results.length);
          });
      });
    },
  },
  methods: {
    elapsedTime(createdAt) {
      const created = new Date(createdAt);
      const elapsed = new Date() - created;
      if (elapsed < 1000 * 60) {
        return '방금 전';
      } else if (elapsed < 1000 * 60 * 60) {
        return `${Math.floor(elapsed / 1000 / 60)}분 전`;
      } else if (elapsed < 1000 * 60 * 60 * 24) {
        return `${Math.floor(elapsed / 1000 / 60 / 60)}시간 전`;
      } else if (elapsed < 1000 * 60 * 60 * 24 * 3) {
        return `${Math.floor(elapsed / 1000 / 60 / 60 / 24)}일 전`;
      }
      return `${created.getMonth() + 1}월 ${created.getDate()}일`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

.post-no-comments {
  color: $theme-red;
}

.router-link {
  color: #4a4a4a;
}

.router-link:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>
