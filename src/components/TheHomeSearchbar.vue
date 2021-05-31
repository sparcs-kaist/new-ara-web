<template>
  <div class="searchbar">
    <h2 class="searchbar__landing">
      <i18n path="landing.text">
        <template #ara>
          <span class="searchbar__landing--bold">{{
            $t('landing.ara')
          }}</span>
        </template>
        <template #accurate>
          <span class="searchbar__landing--highlight">{{
            $t('landing.accurate')
          }}</span>
        </template>
        <template #fast>
          <span class="searchbar__landing--highlight">{{
            $t('landing.fast')
          }}</span>
        </template>
      </i18n>
    </h2>

    <form class="searchbar__search field" action="board" @submit.prevent="search">
      <p class="control has-icons-left">
        <input class="input is-large" type="text" v-model="query" name="query">
        <button class="icon is-small is-left" type="submit">
          <i class="material-icons">search</i>
        </button>
      </p>
    </form>

    <div class="keywords">
      <span class="keywords__description">
        {{ $t('keyword') }}
      </span>

      <div class="keywords__list">
        <router-link :to="{
            name: 'board',
            query: {
              query: keyword[`${$i18n.locale}_name`]
            }
          }"
          class="keywords__keyword"
          v-for="keyword in keywords"
          :key="keyword.key">

          {{ keyword[`${$i18n.locale}_name`] }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
// @TODO after backend implementation, change it to fetching backend
const keywords = [
  {
    key: 'students-working',
    ko_name: '근로학생',
    en_name: 'Students Working'
  },
  {
    key: 'lecture-review',
    ko_name: '강의평가',
    en_name: 'Lecture Review'
  },
  {
    key: 'enrolment',
    ko_name: '수강신청',
    en_name: 'Enrolment'
  },
  {
    key: 'season-term',
    ko_name: '계절학기',
    en_name: 'Season Term'
  },
  {
    key: 'grade-posting-period',
    ko_name: '성적게시기간',
    en_name: 'Grade Posting Period'
  },
  {
    key: 'tuition-payment',
    ko_name: '등록금 납부',
    en_name: 'Tuition Payment'
  },
  {
    key: 'graduation-requirements',
    ko_name: '졸업요건',
    en_name: 'Graduation Reqs'
  }
]

export default {
  data () {
    return {
      query: '',
      keywords
    }
  },

  methods: {
    search () {
      this.$router.push({
        name: 'board',
        query: {
          query: this.query
        }
      })
    }
  }
}
</script>

<i18n>
ko:
  landing:
    text: '{ara} {accurate}를 {fast}'
    ara: 'ARA,'
    accurate: '가장 정확한 정보'
    fast: '가장 신속하게.'
  keyword: '키워드'

en:
  landing:
    text: '{ara} {fast} delivery of {accurate}'
    ara: 'ARA,'
    accurate: 'the most accurate information'
    fast: 'the fastest'
  keyword: 'Keywords'
</i18n>

<style lang="scss" scoped>
@import "@/theme.scss";

.searchbar {
  max-width: 800px;
  width: 100%;

  @include breakPoint(min) {
    margin: 0 auto;
  }

  &__landing {
    background: transparent;
    color: var(--text);
    font-family: var(--font);
    font-size: 2rem;
    margin-bottom: 20px;

    @include breakPoint(min) {
      font-size: 1.3rem;
      text-align: center;
    }

    &--bold, &--highlight {
      font-weight: 900;
      white-space: nowrap;
    }

    &--highlight {
      color: var(--theme-400);
    }
  }

  &__search {
    .input {
      height: 3.4rem;
      border: 3px solid var(--theme-400);
      border-radius: 10px;
      font-size: 1rem;

      @include breakPoint(mobile) {
        height: 2.8rem;
        font-size: 0.85rem;
      }

      &:active, &:focus, &:hover {
        box-shadow: 0 0 6px 0 var(--theme-300);
      }
    }

    .icon {
      color: var(--theme-400);
      border: none;
      cursor: pointer;
      background: transparent;
      pointer-events: auto;

      &:hover {
        color: var(--theme-500);
      }
    }
  }
}

.keywords {
  display: flex;
  color: var(--grey-600);
  font-family: var(--font);

  @include breakPoint(min) {
    display: none;
  }

  &__description {
    color: var(--theme-400);
    font-weight: 500;
    flex-shrink: 0;
    margin-right: 10px;
  }

  &__list {
    display: inline-flex;
    flex-wrap: wrap;
  }

  &__keyword {
    margin: 0 10px;
  }
}
</style>
