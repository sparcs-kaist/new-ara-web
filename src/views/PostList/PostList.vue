<template>
  <div>
    <h1>{{ board }}</h1>
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
    <post-item v-for="item in post_items" :board="board" :item="item" :key="item.id"></post-item>
    <p class="paging">
      1 2 3 4 5 6 7 8 9 10
    </p>
    <div>
      search search search
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import PostItem from './PostItem';

export default {
  name: 'PostList',
  data() {
    return {
      board: 'all',
      page_num: 0,
      post_items: [],
    };
  },
  computed: {
    board_or_heading() {
      if (this.board === 'all') return '게시판';
      return '말머리';
    },
  },
  components: {
    PostItem,
  },
  mounted() {
    axios.get('http://13.124.216.27:8000/api/articles/', {
      auth: {
        username: 'jsh56son',
        password: 'asdfasdf1234',
      },
    })
    .then((req) => {
      // console.log(req);
      this.post_items = req.data.results;
      this.page_num = req.num_pages;
    })
    .catch((err) => {
      console.log(err);
    });
  },
};
</script>

<style>

</style>
