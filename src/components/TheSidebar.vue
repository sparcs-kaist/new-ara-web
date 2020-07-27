<template>
  <aside class="sidebar">
    <h2 class="sidebar__name">
      <slot></slot>
    </h2>
    <div
    v-for="post in listitems"
    :key="post.id"
    class="post">
      <h3 class="post">
        <router-link
        :to="{
            name: 'post',
            params: { postId: post.id }
        }">
          {{ post.title }}
        </router-link>
      </h3>
    </div>
      <h3 class="post">
        글글글
      </h3>
      <h3 class="post">
        hi
      </h3>
      <h3 class="post">
        hi
      </h3>
  </aside>
</template>

<script>
export default {
  name: 'the-sidebar',
  props: {
    listitems: {
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme.scss';

.sidebar {
  max-width: 135px;
  margin-bottom: 2rem;
  font-family: 'NanumSquareRound',sans-serif;

  &__name {
    font-size: 14px;
    font-weight: 700;
    margin-top: 48px;
    margin-right: 48px;
    margin-bottom: 1.5em;
    padding-left: 1.5em;
    border-left: thick solid #ffafaf;
  }

  .post {
    border-left: thick solid transparent;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    margin: 1em 0;
    padding-left: 1.5em;
  }
}
</style>
