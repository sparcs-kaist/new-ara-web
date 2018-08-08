<template>
  <div class="board">
    <!-- <div v-if="currentQuery">
      검색어: {{ currentQuery }}
    </div> -->
    <!-- query: { boardSlug: '' } -->
    <slot name="title"/>

    <table class="table post-table">
      <thead>
        <tr>
          <th class="post-table-title">게시판</th>
          <th>제목</th>
          <th class="post-table-author has-text-right">작성자</th>
          <th class="post-table-vote has-text-right">반응</th>
          <th class="post-table-hit has-text-right">조회수</th>
          <th class="post-table-time has-text-right">작성시간</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="article in board.results"
          :key="article.id">
          <td> {{ article.parent_board.ko_name }} </td>
          <td>
            <router-link
              :to="{
                name: 'post',
                params: {
                  postId: article.id
                }
              }">
              {{ article.title }}
            </router-link>
          </td>
          <td class="has-text-right">
            <router-link
              :to="{
                name: 'user',
                params: {
                  username: article.created_by
                }
              }">
              {{ article.created_by }}
            </router-link>
          </td>
          <td class="has-text-right">{{ article.positive_vote_count }}</td>
          <td class="has-text-right">{{ article.hit_count }}</td>
          <td class="has-text-right">
            <Timeago :time="article.created_at"/>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="post-tools">
      <TheBoardPaginator
        :numPages="board.num_pages"
        :currentPage="board.current"/>

      <div>
        <div class="post-search">
          <div class="field has-addons">
            <div class="control">
              <input
                v-model="query"
                class="input"
                type="text"
                placeholder="글 검색"
              />
            </div>
            <div class="control">
              <router-link
                :to="{
                  query: {
                    query: this.query
                  }
                }"
                class="button is-text">
                검색
              </router-link>
            </div>
          </div>
        </div>
        <router-link
          :to="{
            name: 'write',
            query: { board_slug: $route.params.boardSlug }
          }"
          class="button is-text">
          글 작성
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import TheBoardPaginator from '@/components/TheBoardPaginator.vue'
import Timeago from '@/components/Timeago.vue'

export default {
  name: 'the-board',
  props: {
    board: { required: true }
  },
  data () {
    return { query: '' }
  },
  computed: {
    currentQuery () {
      // @TODO: 요것도 아래와 같은 의미로 prop으로 받아야될듯..?
      return this.$route.query && this.$route.query.query
    }
  },
  // @TODO: components/ 아래의 컴퍼넌트는 $route에 의존적이지 않아야 한다.
  // 목표는 검색 이후에 navigation을 하면 검색어가 사라지게 하는 것.
  // 다른 관점에서 봐서 부모가 현재 검색어를 prop으로 내려주면 해결되는 듯?
  // watch: {
  //   $route () {
  //     this.query = ''
  //   }
  // },
  components: { TheBoardPaginator, Timeago }
}
</script>

<style lang="scss" scoped>
.board {
  padding-right: 5rem;

  h1 {
    margin-bottom: 1rem;
  }

  .post-table {
    width: 100%;
    margin: 0 0 0.75rem -0.75rem;

    thead th {
      padding-bottom: 1em;
    }

    .post-table-title {
      width: 5rem;
    }
    .post-table-author {
      width: 7rem;
    }
    .post-table-vote {
      width: 4rem;
    }
    .post-table-hit {
      width: 5rem;
    }
    .post-table-time {
      width: 6rem;
    }
  }
  .post-tools {
    display: flex;
    justify-content: space-between;
    .post-search {
      display: inline-block;
    }
  }
}
</style>
