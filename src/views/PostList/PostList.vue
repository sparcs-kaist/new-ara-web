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
      <div v-for="item in post_items" :key="item.id">
        <router-link v-if="item.id !== post.id" :to="{ name: 'PostDetail', params: { board, post_id: item.id }, query: $route.query }">
          <post-item :board="board" :item="item" ></post-item>
        </router-link>
        <span v-else>
          <post-item :board="board" :item="item" ></post-item>
        </span>
      </div>
    <div>
      <a @click="updatePageAndFetch(1)">«</a>
      <a v-if="page > 10" @click="updatePageAndFetch(page_base)">&lt;</a>
      <span v-else>&lt;</span>
      <span class="paging">
        <div v-for="iter_page in page_list" style="display: inline-block">
          <a v-if="iter_page != page" @click="updatePageAndFetch(iter_page)" :key="page_list_index(iter_page)">{{ iter_page }}</a>
          <span v-else>{{ iter_page }}</span>
        </div>
      </span>
      <a v-if="page_base + 10 < num_pages" @click="updatePageAndFetch(page_base + 11)">&gt;</a>
      <span v-else>&gt;</span>
      <a @click="updatePageAndFetch(num_pages)">»</a>
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
    ...mapState([
      'post',
      'board',
      'page',
    ]),
  },
  methods: {
    board_list_index(board) {
      return ['all', 'talk', 'love', 'play'].indexOf(board);
    },
    page_list_index(page) {
      return this.page_list.indexOf(page) + 1;
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
      const queryStr = searchInputElement.value;
      const query = {};

      if (searchType === 'title') query.title__contains = queryStr;
      else if (searchType === 'content') query.content__contains = queryStr;
      else if (searchType === 'created_by') query.created_by = queryStr;

      searchTypeElement.selectedIndex = 0;
      searchInputElement.value = '';

      this.fetchPost(undefined);
      this.updatePage(1);
      this.$router.push({
        name: 'PostList',
        params: { board: this.board },
        query,
      });
    },
    updatePageAndFetch(page) {
      const condition = {};
      if (this.$route.query.searchType === 'title') condition.title__contains = this.$route.query.query;
      else if (this.$route.query.searchType === 'content') condition.content__contains = this.$route.query.query;
      else if (this.$route.query.searchType === 'created_by') condition.created_by = this.$route.query.query;

      this.updatePage(page);
      this.refresh(this.$route.query);
    },
  },
  components: {
    PostItem,
  },
  watch: {
    $route(to, from) {
      const condition = {};
      if (this.$route.query.searchType === 'title') condition.title__contains = this.$route.query.query;
      else if (this.$route.query.searchType === 'content') condition.content__contains = this.$route.query.query;
      else if (this.$route.query.searchType === 'created_by') condition.created_by = this.$route.query.query;

      if (from.params.board !== to.params.board) {
        this.updateBoard(to.params.board);
        this.updatePage(1);
      }

      this.refresh(this.$route.query);
    },
  },
  mounted() {
    const condition = {};
    if (this.$route.query.searchType === 'title') condition.title__contains = this.$route.query.query;
    else if (this.$route.query.searchType === 'content') condition.content__contains = this.$route.query.query;
    else if (this.$route.query.searchType === 'created_by') condition.created_by = this.$route.query.query;

    if (this.board !== this.$route.params.board) {
      this.updateBoard(this.$route.params.board);
      this.updatePage(1);
    }

    this.refresh(this.$route.query);
  },
};
</script>

<style>

</style>
