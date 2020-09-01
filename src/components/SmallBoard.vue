<template>
  <div class="board" :class="{ 'board--sidebar': sidebar }">
    <h2 class="board__name">
      <slot></slot>
    </h2>
    <div
    v-for="(post, index) in listitems"
    :key="post.id"
    class="board__post post">
      <h3>
        <router-link class="post__title"
        :to="{
          name: 'post',
          params: { postId: post.id },
          query: fromQuery
        }">
          <span class="post__index" v-if="detail">
            {{ index + 1 }}
          </span>

          {{ post.title }}
        </router-link>
      </h3>

      <div class="post__username" v-if="detail">
        {{post.created_by.profile.nickname}}
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

    fromQuery: {
      type: Object
    },

    detail: {
      type: Boolean
    },

    sidebar: {
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
  font-family: var(--font);

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
    align-items: center;
    justify-content: space-between;
    margin: 0.5rem 0;
    padding: 5px 1rem;

    &__index {
      font-weight: 500;
      margin-right: 10px;
    }

    &__username{
      color: var(--text);
      font-size: 0.85rem;
    }

    &__title {
      color: var(--text);
    }
  }

  &--sidebar & {
    &__name {
      font-size: 14px;
    }

    &__post {
      font-size: 13px;
      padding: 0;
      padding-left: 1rem;
    }
  }
}
</style>
