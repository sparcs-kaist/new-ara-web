<template>
  <div class="Searchbar">
    <h2 class="Searchbar__landing">
      <i18n path="landing.text">
        <template #ara>
          <span class="Searchbar__landing--bold">{{
            $t('landing.ara')
          }}</span>
        </template>
        <template #accurate>
          <span class="Searchbar__landing--highlight">{{
            $t('landing.accurate')
          }}</span>
        </template>
        <template #fast>
          <span class="Searchbar__landing--highlight">{{
            $t('landing.fast')
          }}</span>
        </template>
      </i18n>
    </h2>

    <div class="Searchbar__search field">
      <p class="control has-icons-right">
        <input class="input is-large" type="text">
        <span class="icon is-small is-right">
          <i class="material-icons">search</i>
        </span>
      </p>
    </div>

    <div class="Keywords">
      <span class="Keywords__description">
        {{ $t('keyword') }}
      </span>

      <div class="Keywords__divider"></div>
      <div class="Keywords__list">
        <span class="Keywords__keyword" v-for="keyword in keywords" :key="keyword">
          {{ keyword }}
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
        '근로학생', '강의평가', '수강신청', '계절학기', '성적게시기간', '등록금 납부', '졸업요건'
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
.Searchbar {
  &__landing {
    color: #484848;
    font-family: 'NanumSquareRound', sans-serif;
    font-size: 32px;
    margin-bottom: 20px;

    &--bold, &--highlight {
      font-weight: 900;
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

.Keywords {
  display: flex;
  color: #797979;
  font-family: 'NanumSquareRound', sans-serif;

  &__divider {
    display: inline-block;
    border-right: 1px solid #e5e5e5;
    margin: 0 10px;
  }

  &__list {
    display: inline-flex;
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
