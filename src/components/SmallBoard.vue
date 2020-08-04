<template>
  <div class="board">
    <h2 class="board__name">
      <slot></slot>
    </h2>
    <div
    v-for="(post, index) in listitems"
    :key="post.id"
    class="post">
      <h3>
        <router-link class="post__title"
        :to="{
            name: 'post',
            params: { postId: post.id }
        }">
        {{ getTitle(post, index) }}
        </router-link>
      </h3>

      <div class="post__username" v-if="detail">
        {{article.created_by.profile.nickname}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'small-board',
  props: {
    listitems: {
      required: true
    },
    detail: {
      type: Boolean
    }
  },

  methods: {
    getTitle (post, index) {
      return (this.detail ? `${index + 1}. ` : '') + post.title
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme.scss';

.board {
  max-width: 450px;
  margin-bottom: 2rem;
  font-family: 'NanumSquareRound', sans-serif;

  &__name {
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 0.7em;
    padding-left: 1em;
    border-left: thick solid var(--theme-300);
  }

  .post {
    border-left: thick solid transparent;
    display: flex;
    font-size: 1.0rem;
    justify-content: space-between;
    margin: 0.5rem 0;
    padding-left: 1em;

    &__username{
      color: var(--text);
      font-size: 0.7rem;
    }

    &__title {
      color: var(--text);
    }
  }
}
</style>
