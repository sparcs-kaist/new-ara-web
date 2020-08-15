<template>
  <div class="post-status">
    <LikeButton class="post-status__like" :item="post" :votable="votable" @vote="$emit('vote', $event)"/>

    <div class="post-status__comment">
      <span class="post-status__label">
        {{ $t('comments') }}
      </span>

      {{ commentCount }}
    </div>

    <div class="post-status__view">
      <span class="post-status__label">
        {{ $t('views') }}
      </span>

      {{ viewCount }}
    </div>
  </div>
</template>

<script>
import LikeButton from '@/components/LikeButton.vue'

export default {
  name: 'post-status',
  props: {
    post: {
      required: true
    },

    votable: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    commentCount () { return this.post.nested_comments_count },
    viewCount () { return this.post.hit_count }
  },

  components: {
    LikeButton
  }
}
</script>

<i18n>
ko:
  comments: '댓글'
  views: '조회수'

en:
  comments: 'Reply'
  views: 'View'
</i18n>

<style lang="scss" scoped>
.post-status {
  display: flex;
  font-size: .9rem;

  & > *:not(&__like) {
    display: inline-flex;
    justify-content: flex-start;
    align-items: center;
    min-width: 4rem;
    white-space: nowrap;
  }

  & > * {
    margin-right: 10px;
  }

  &__label {
    font-weight: 700;
    margin-right: 4px;
  }
}
</style>
