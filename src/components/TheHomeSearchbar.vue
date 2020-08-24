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

    <div class="searchbar__search field">
      <p class="control has-icons-left">
        <input class="input is-large" type="text">
        <span class="icon is-small is-left">
          <i class="material-icons">search</i>
        </span>
      </p>
    </div>

    <div class="keywords">
      <span class="keywords__description">
        {{ $t('keyword') }}
      </span>

      <div class="keywords__list">
        <!-- TODO implement -->
        <span class="keywords__keyword" v-for="keyword in keywords" :key="keyword.key">
          {{ keyword[`${$i18n.locale}_name`] }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      keywords: [
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
    font-family: 'NanumSquareRound', sans-serif;
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

      &:active, &:focus, &:hover {
        box-shadow: 0 0 6px 0 var(--theme-300);
      }
    }

    .icon {
      color: var(--theme-400);
    }
  }
}

.keywords {
  display: flex;
  color: var(--grey-600);
  font-family: 'NanumSquareRound', sans-serif;

  @include breakPoint(min) {
    display: none;
  }

  &__description {
    color: var(--theme-400);
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
