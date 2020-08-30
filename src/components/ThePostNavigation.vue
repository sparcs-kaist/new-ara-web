<template>
  <div class="post-navigation">
    <hr />

    <div class="post-navigation__posts" v-if="sideArticlesEnabled">
      <BoardItem :post="post.side_articles.after" :fromQuery="$route.query" v-if="post.side_articles.after" />
      <BoardItem class="post-navigation__post--current" :post="post" :fromQuery="$route.query" />
      <BoardItem :post="post.side_articles.before" :fromQuery="$route.query" v-if="post.side_articles.before" />
    </div>

    <div class="post-navigation__all">
      <router-link class="button" :to="context">
        {{ $t('all') }}
      </router-link>
    </div>
  </div>
</template>

<script>
import BoardItem from '@/components/BoardItem.vue'

export default {
  name: 'ThePostNavigation',

  props: {
    post: { required: true },
    context: {}
  },

  computed: {
    sideArticlesEnabled () {
      return this.post.side_articles && (this.post.side_articles.before || this.post.side_articles.after)
    }
  },

  components: {
    BoardItem
  }
}
</script>

<i18n>
ko:
  all: '전체보기'

en:
  all: 'All Posts'
</i18n>

<style lang="scss" scoped>
.post-navigation__post--current {
  background: var(--grey-100);
}

.post-navigation {
  padding-top: 20px;

  &__posts > * {
    margin: 15px 0;
    padding: 5px;
  }
}

.post-navigation__all {
  padding-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
