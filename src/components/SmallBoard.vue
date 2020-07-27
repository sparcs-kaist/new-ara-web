<template>
  <div class="board">
    <h2 class="board__name">
      <slot></slot>
    </h2>
    <div
    v-for="(post, index) in listitems"
    :key="post.id"
    class="post">
      <h3 class="post__title">
        <router-link
        :to="{
            name: 'post',
            params: { postId: post.id }
        }">
        {{index + 1}}. {{ post.title }}
        </router-link>
      </h3>

      <div class="post__username" v-if="author">
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
    author: {
      type: Boolean
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme.scss';

.board {
  max-width: 450px;
  margin-bottom: 2rem;
  font-family: 'NanumSquareRound',sans-serif;

  &__name {
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 0.7em;
    padding-left: 1em;
    border-left: thick solid #ffafaf;
  }

  .post {
    border-left: thick solid transparent;
    display: flex;
    font-size: 1.0rem;
    justify-content: space-between;
    margin: 0.5rem 0;
    padding-left: 1em;

    &__username{
      color: gray;
      font-size: 0.7rem;
    }
  }
}
</style>
