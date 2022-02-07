<template>
  <div v-if="sideArticlesEnabled" class="post-navigation">
    <BoardItem
      v-if="post.side_articles.after"
      :post="post.side_articles.after"
      :from-query="$route.query"
    />
    <BoardItem
      :post="post"
      :from-query="$route.query"
      class="post-navigation__current"
    />
    <BoardItem
      v-if="post.side_articles.before"
      :post="post.side_articles.before"
      :from-query="$route.query"
    />
  </div>
</template>

<script>
import BoardItem from '@/components/BoardItem.vue'

export default {
  name: 'ThePostNavigation',

  components: {
    BoardItem
  },

  props: {
    post: {
      type: Object,
      required: true
    },
    context: Object
  },

  computed: {
    sideArticlesEnabled () {
      return this.post.side_articles && (this.post.side_articles.before || this.post.side_articles.after)
    }
  }
}
</script>

<style lang="scss" scoped>
.post-navigation {
  &__current {
    background: #fbf2f1;
  }
  margin-top: 20px;
  border-top: 1px solid black;
  border-bottom: 1px solid black;

  & > * {
    padding: 10px;
  }
}
</style>
