<template>
  <div
    :class="{ 'board--sidebar': sidebar }"
    class="board"
  >
    <div class="red-box" />
    <h2 class="board__name">
      <span>
        <slot />
      </span>
      <router-link
        v-if="href"
        :to="href"
        class="board__more"
      >
        <span class="more-text">{{ $t('more') }}</span>
        <i class="material-icons chevron_right">
          chevron_right
        </i>
      </router-link>
    </h2>
    <div
      v-for="post in listitems"
      :key="post.id"
      class="board__post post"
    >
      <h3 :class="post.is_hidden ? 'has-text-grey-light' : ''" class="post__title-wrapper">
        <router-link
          :title="post.title"
          :to="{
            name: 'post',
            params: { postId: post.id },
            query: fromQuery
          }"
          class="post__title"
        >
          {{ title(post) }}
        </router-link>
      </h3>

      <div :class="post.is_hidden ? 'has-text-grey-light' : ''" class="post__username">
        {{ post.created_by.profile.nickname }}
      </div>
    </div>
  </div>
</template>

<script>
import i18n from '@/i18n'

export default {
  name: 'SmallBoard',

  props: {
    listitems: {
      type: Array,
      required: true
    },
    fromQuery: Object,
    detail: Boolean,
    sidebar: Boolean,
    href: Object
  },

  methods: {
    title (post) {
      if (post.is_hidden) {
        return i18n.t(post.why_hidden[0])
      }

      return post.title
    }
  }
}
</script>

<i18n>
ko:
  more: '더보기'

en:
  more: 'More'
</i18n>

<style lang="scss" scoped>
@import '@/theme.scss';

.board {
  max-width: 450px;
  margin: 0 auto;
  margin-bottom: 2rem;
  font-family: var(--font);

  .red-box {
    height: 5px;
    width: 30px;
    background-color: var(--theme-400);
    margin-bottom: 1em;
    margin-left: 1.2rem;
    @include breakPoint(mobile) {
      margin: 0 auto;
      margin-bottom: 14px;
    }
  }

  &__name {
    width:100%;
    display: flex;
    justify-content: space-between;
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 0.7em;
    padding-left: 1rem;

    span {
      width: 100%
    }

    @include breakPoint(mobile) {
      font-size: 16px;
      font-weight: 600;
      justify-content: center;
      padding: 0;
      text-align: center;
    }
  }

  &__more {
    font-size: 13px;
    font-weight: 400 !important;
    color: var(--grey-700);
    width: 70px;
    margin-left: -70px;

    display: flex;
    align-items: center;

    .more-text {
      text-align: right;
      line-height: 24px;
    }

    @include breakPoint(mobile) {
      font-size: 0.8rem;
    }
    i {
      margin-left: -5px;
    }
  }

  .post {
    display: flex;
    font-size: 1.0rem;
    align-items: center;
    justify-content: space-between;
    margin: 0.25rem 0;
    padding: 5px 1rem;
    padding-right: 1.2rem;
    white-space: nowrap;

    @include breakPoint(mobile) {
      font-size: 0.8rem;
      margin: 0.25rem 0;
    }

    &__username{
      text-align: right;
      color: var(--text);
      font-size: 12px;
      text-overflow: ellipsis;
      overflow: hidden;
      min-width: 80px;

      @include breakPoint(mobile) {
        min-width: 60px;
        font-size: 12px;
      }
    }

    &__title {
      font-size: 16px;
      color: inherit;
      @include breakPoint(mobile) {
        font-size: 15px;
      }
    }

    &__title-wrapper {
      text-overflow: ellipsis;
      overflow: hidden;
      color: var(--text);
    }
  }

  &--sidebar & {
    &__name {
      font-size: 15px;
    }

    &__post {
      font-size: 13px;
      padding: 0;
      padding-left: 1rem;

      .post__title {
        font-size: 13px;
        font-weight: 500;
      }

      .post__username {
        font-size: 11px;
      }
    }
  }
}
</style>
