<template>
  <div class="article-status">
    <LikeButton class="article-status__like" :item="article" />

    <div class="article-status__comment">
      <span class="article-status__label">
        {{ $t('comments') }}
      </span>

      {{ commentCount }}
    </div>

    <div class="article-status__view">
      <span class="article-status__label">
        {{ $t('views') }}
      </span>

      {{ viewCount }}
    </div>
  </div>
</template>

<script>
import LikeButton from '@/components/LikeButton.vue'

export default {
  props: {
    article: {
      required: true
    }
  },

  computed: {
    commentCount() { return this.article.comments_count },
    viewCount() { return this.article.hit_count }
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
  comments: 'Comments'
  views: 'View'
</i18n>

<style lang="scss" scoped>
.article-status {
  display: flex;

  & > * {
    margin-right: 10px;
  }
}
</style>
