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
      if (this.board === 'all') return '게시판';
      return '말머리';
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
      'auth',
      'boardList',
      'apiUrl',
    ]),
    ...mapGetters([
      'boardNameList',
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
      'updateBoardList',
    ]),
    fetchPostList() {
      /* Construct url queries. */
      const urlQueries = [];
      /* Add current query to maintain context; e.g. search results. */
      const currQueries = this.$route.query;
      Object.keys(currQueries).forEach(currQueryName => urlQueries.push(`${currQueryName}=${currQueries[currQueryName]}`));
      /* Add board query if current board is not 'all' board. */
      if (this.board !== 'all') urlQueries.push(`parent_board=${this.boardNameList.indexOf(this.board) + 1}`);
      /* Add current page. */
      urlQueries.push(`page=${this.page}`);
      const url = `?${urlQueries.join('&')}`;

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

      this.fetchPost(undefined);
      this.updatePage(1);
      this.$router.push({
        name: 'PostList',
        params: { board: this.board },
        query,
      });
    },
    async updatePageAndFetch(page) {
      this.isLoading = true;
      this.updatePage(page);
      await this.updateBoardList();
      this.fetchPostList();
    },
  },
  components: {
    PostItem,
  },
  async mounted() {
    if (this.board !== this.$route.params.board) {
      this.updateBoard(this.$route.params.board);
      this.updatePage(1);
    }
    await this.updateBoardList();
    this.fetchPostList();
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
