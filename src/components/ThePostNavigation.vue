<template>
  <div class="post-navigation" v-if="sideArticlesEnabled">
    <BoardItem :post="post.side_articles.after" :fromQuery="$route.query" v-if="post.side_articles.after" />
    <BoardItem class="post-navigation__current" :post="post" :fromQuery="$route.query" />
    <BoardItem :post="post.side_articles.before" :fromQuery="$route.query" v-if="post.side_articles.before" />
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
