<template>
  <div>
    <div>
      <div class="oneline">
        작성자
      </div>
      <div class="oneline">
        {{ board_or_heading }}
      </div>
      <div class="oneline">
        제목
      </div>
      <div class="oneline">
        추천/반대
      </div>
      <div class="oneline">
        조회수
      </div>
      <div class="oneline">
        작성일자
      </div>
    </div>
    <router-link v-for="item in post_items" :to="`/posts/${board}/${page}/${item.id}`" :key="item.id">
      <post-item :board="board" :item="item" ></post-item>
    </router-link>
  </div>
  </div>
</template>

<script>
import PostItem from './PostItem';

export default {
  name: 'PostList',
  props: [
    'board',
    'page',
    'post_items',
  ],
  computed: {
    board_or_heading() {
      if (this.board === 'all') return '게시판';
      return '말머리';
    },
  },
  components: {
    PostItem,
  },
};
</script>

<style>

</style>
