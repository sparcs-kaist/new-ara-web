<template>
  <div>
    <div>
      <div class="oneline">작성자</div>
      <div class="oneline">{{ board_or_heading }}</div>
      <div class="oneline">제목</div>
      <div class="oneline">추천/반대</div>
      <div class="oneline">조회수</div>
      <div class="oneline">작성일자</div>
    </div>
      <router-link v-for="item in post_items" :to="{ name: 'PostDetail', params: { board, page, post_id: item.id }, query: $route.query }" :key="item.id">
      <post-item :board="board" :item="item" ></post-item>
    </router-link>
    <div>
      <router-link :to="new_url(1)">«</router-link>
      <router-link v-if="page > 10" :to="new_url(page_base)">&lt;</router-link>
      <span v-else>&lt;</span>
      <span class="paging">
        <div v-for="iter_page in page_list" style="display: inline-block">
          <router-link v-if="iter_page != page" :to="new_url(iter_page)" :key="page_list_index(iter_page)">{{ iter_page }}</router-link>
          <span v-else>{{ iter_page }}</span>
        </div>
      </span>
      <router-link v-if="page_base + 10 < num_pages" :to="new_url(page_base + 11)">&lt;</router-link>
      <span v-else>&gt;</span>
      <router-link :to="new_url(num_pages)">»</router-link>
    </div>
    <div>
      <select id="search_type" name="search_type">
        <option value="title" selected>제목</option>
        <option value="content">내용</option>
        <option value="created_by">글쓴이</option>
      </select>
      <input id="search_query" @keyup.enter="searchArticles()" type="text" />
      <button type="button" @click="searchArticles()">검색</button>
    </div>
  </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState, mapActions } from 'vuex';
import PostItem from './PostItem';

export default {
  name: 'PostList',
  data() {
    return {
      post_items: [],
      num_pages: 0,
    };
  },
  computed: {
    board_or_heading() {
      if (this.board === 'all') return '게시판';
      return '말머리';
    },
    page_base() {
      return (this.page - 1) - ((this.page - 1) % 10);
    },
    page_list() {
      // TODO: return correct page list
      const base = this.page_base;
      const pageList = [];
      const pageListMax = (this.num_pages < base + 10 ? this.num_pages : base + 10);
      for (let i = base + 1; i <= pageListMax; i += 1) {
        pageList.push(i);
      }
      return pageList;
    },
    ...mapState({
      post: 'post',
      board: 'board',
      page: 'page',
    }),
  },
  methods: {
    board_list_index(board) {
      return ['all', 'talk', 'love', 'play'].indexOf(board);
    },
    page_list_index(page) {
      return this.page_list.indexOf(page) + 1;
    },
    new_url(page) {
      if (!this.post) return { name: 'PostList', params: { board: this.board, page }, query: this.$route.query };
      return { name: 'PostDetail', params: { board: this.board, page, post_id: this.post.id }, query: this.$route.query };
    },
    ...mapActions([
      'fetchPost',
      'updateBoard',
      'updatePage',
    ]),
    refresh(condition) {
      let url = '?';
      const keys = Object.keys(condition);
      for (let i = 0; i < keys.length; i += 1) {
        const key = keys[i];
        url += `${key}=${condition[key]}&`;
      }
      if (this.board !== 'all') url += `parent_board=${this.board_list_index(this.board)}&`;
      url += `page=${this.page}`;

      axios.get(`http://13.124.216.27:8000/api/articles/${url}`, {
        auth: {
          username: 'sparcs',
          password: 'newara@sparcs',
        },
      })
      .then((res) => {
        this.post_items = res.data.results;
        this.num_pages = res.data.num_pages;
      })
      .catch(() => {
      });
    },
    searchArticles() {
      const searchTypeElement = document.getElementById('search_type');
      const searchType = searchTypeElement.options[searchTypeElement.selectedIndex].value;
      const searchInputElement = document.getElementById('search_query');
      const query = searchInputElement.value;

      searchTypeElement.selectedIndex = 0;
      searchInputElement.value = '';
      this.$router.push({
        name: 'PostList',
        params: { board: this.board, page: 1 },
        query: { searchType, query },
      });
    },
  },
  components: {
    PostItem,
  },
  watch: {
    $route(to) {
      this.updateBoard(to.params.board);
      this.updatePage(to.params.page);
      this.refresh({});
      // this.post_id = to.params.post_id;
      //
      // this.refresh({});
    },
  },
  mounted() {
    this.updateBoard(this.$route.params.board);
    this.updatePage(this.$route.params.page);
    this.refresh({});
  },
};
</script>

<style>

</style>
