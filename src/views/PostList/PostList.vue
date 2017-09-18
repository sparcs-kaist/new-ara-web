<template>
  <div>
    <div v-if="!error">
      <p>
        <router-link v-for="board in board_list" :to="`/posts/${board}/1`" :key="board_list_index(board)"><h1>{{ board }}</h1></router-link>
      </p>
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
        <router-link v-for="page in page_list" :to="`/posts/${board}/${page}`">{{ page }}</router-link>
      </p>
      <div>
        search search search
      </div>
    </div>
    <div v-else>
      Database error
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
      board_list: ['all', 'talk', 'love', 'play'],
      curr_page: 0,
      page_num: 0,
      post_items: [],
      error: false,
    };
  },
  computed: {
    board_or_heading() {
      if (this.board === 'all') return '게시판';
      return '말머리';
    },
    page_list() {
      return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    },
  },
  methods: {
    changePage(page) {
      const data = Object.assign({}, this.$route.query);
      data.page = page;
      this.$router.push({ path: '/post', query: data });
    },
    refresh(board, page) {
      let url = '';
      this.board = board;

      if (this.board !== 'all') url += `?parent_board_in=${['talk', 'love', 'play'].indexOf(this.board)}`;
      if (!page) this.curr_page = 1;
      else {
        this.curr_page = page;
        if (url !== '') url += `&page=${this.curr_page}`;
        else url += `?page=${this.curr_page}`;
      }

      axios.get(`http://13.124.216.27:8000/api/articles/${url}`, {
        auth: {
          username: 'jsh56son',
          password: 'asdfasdf1234',
        },
      })
      .then((req) => {
        this.error = false;
        this.post_items = req.data.results;
        this.page_num = req.num_pages;
      })
      .catch(() => {
        this.error = true;
      });
    },
  },
  components: {
    PostItem,
  },
  watch: {
    $route(to) {
      this.refresh(to.params.board, to.params.page);
    },
  },
  mounted() {
    this.refresh(this.$route.params.board, this.$route.params.page);
  },
};
</script>

<style>

</style>
