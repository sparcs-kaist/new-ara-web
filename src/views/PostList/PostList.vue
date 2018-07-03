<template>
  <div>
    <table class="table centerh">
      <tr>
        <th>.</th>
        <th class="w-102">{{ boardOrHeading }}</th>
        <th class="w-313">제목</th>
        <th class="w-102">작성자</th>
        <th class="w-60">추천</th>
        <th class="w-60">조회</th>
        <th class="w-102">시간</th>
      </tr>
      <post-item v-if="!isLoading" v-for="item in postItems" :key="item.id" :board="board" :item="item" :post="post"></post-item>
    </table>
    <div class="centerh">
      <a @click="updatePageAndFetch(1)">«</a>
      <a v-if="page > 10" @click="updatePageAndFetch(pageBase)">&lt;</a>
      <span v-else>&lt;</span>
      <span class="paging">
        <div v-for="iterPage in pageList" style="display: inline-block">
          <a v-if="iterPage != page" @click="updatePageAndFetch(iterPage)" :key="pageListIndex(iterPage)">{{ iterPage }}</a>
          <span v-else>{{ iterPage }}</span>
        </div>
      </span>
      <a v-if="pageBase + 10 < maxPage" @click="updatePageAndFetch(pageBase + 11)">&gt;</a>
      <span v-else>&gt;</span>
      <a @click="updatePageAndFetch(maxPage)">»</a>
    </div>
    <div class="centerh">
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
import { mapState, mapActions, mapGetters } from 'vuex';
import PostItem from './PostItem';

export default {
  name: 'PostList',
  data() {
    return {
      postItems: [],
      maxPage: 0,
      searchType: 'title',
      searchText: '',
      isLoading: false,
    };
  },
  computed: {
    boardOrHeading() {
      return this.board.id === 0 ? '게시판' : '말머리';
    },
    pageBase() {
      return (this.page - 1) - ((this.page - 1) % 10);
    },
    pageList() {
      const base = this.pageBase;
      const pageList = [];
      const pageListMax = (this.maxPage < base + 10 ? this.maxPage : base + 10);
      for (let i = base + 1; i <= pageListMax; i += 1) {
        pageList.push(i);
      }
      return pageList;
    },
    ...mapState([
      'post',
      'board',
      'page',
      'apiUrl',
    ]),
    ...mapGetters([
      'getBoardIdByName',
    ]),
  },
  methods: {
    pageListIndex(page) {
      return this.pageList.indexOf(page) + 1;
    },
    ...mapActions([
      'fetchPost',
      'updateBoard',
      'updatePage',
    ]),

    refresh() {
      const condition = this.$route.query;
      const keys = Object.keys(condition);
      let url = '?';
      for (let i = 0; i < keys.length; i += 1) {
        const key = keys[i];
        url += `${key}=${condition[key]}&`;
      }
      if (this.board.en_name !== 'all') url += `parent_board=${this.board.id}&`;
      url += `page=${this.page}`;

      /* Refresh post list. */
      this.$axios.get(`articles/${url}`)
        .then((res) => {
          this.postItems = res.data.results;
          this.maxPage = res.data.num_pages;
        })
        .catch(() => {
        })
        .finally(() => {
          this.isLoading = false;
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

      this.fetchPost(null);
      this.updatePage(1);
      this.$router.push({
        name: 'PostList',
        params: { board: this.board.en_name },
        query,
      });
    },
    async updatePageAndFetch(page) {
      this.isLoading = true;
      this.updatePage(page);
      this.refresh();
    },
  },
  components: {
    PostItem,
  },
  async mounted() {
    if (this.board.en_name !== this.$route.params.board) {
      this.updateBoard(this.$route.params.board);
      this.updatePage(1);
    }
    this.refresh();
  },
};
</script>

<style>
.oneline { display: inline-block;}
.bold { font-weight: 800;}
.w-35 { width:35px;}
.w-60 { width: 60px;}
.w-102 { width: 102px;}
.w-313 { width: 313px;}
.centerh { margin: 0 auto; text-align: center;}
</style>
