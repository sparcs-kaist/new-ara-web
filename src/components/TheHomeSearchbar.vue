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
      <p class="control has-icons-right">
        <input class="input is-large" type="text">
        <span class="icon is-small is-right">
          <i class="material-icons">search</i>
        </span>
      </p>
    </div>

    <div class="keywords">
      <span class="keywords__description">
        {{ $t('keyword') }}
      </span>

      <div class="keywords__divider"></div>
      <div class="keywords__list">
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
.searchbar {
  &__landing {
    background: transparent;
    color: #484848;
    font-family: 'NanumSquareRound', sans-serif;
    font-size: 32px;
    margin-bottom: 20px;

    &--bold, &--highlight {
      font-weight: 900;
      white-space: nowrap;
    }

    &--highlight {
      color: #c46a6a;
    }
  }

  &__search {
    max-width: 720px;

    .input {
      height: 3.25em;
      border: 5px solid #d19696;
      border-radius: 10px;
      font-family: 'Noto Sans CJK KR', sans-serif;
      font-size: 1rem;
    }

    .icon {
      color: #d19696;
    }
  }
}

.keywords {
  display: flex;
  color: #797979;
  font-family: 'NanumSquareRound', sans-serif;

  &__description {
    flex-shrink: 0;
  }

  &__divider {
    display: inline-block;
    border-right: 1px solid #e5e5e5;
    margin: 0 10px;
  }

  &__list {
    display: inline-flex;
    flex-wrap: wrap;
  }

  &__keyword {
    margin: 0 5px;

    &::after {
      content: '·';
      margin: 0 5px;
    }

    &:last-child::after {
      display: none;
    }
  }
}
</style>
