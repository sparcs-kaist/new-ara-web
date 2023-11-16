<template>
  <div
    class="calendar-popup"
    :style="{ top: y+'px', left: x+'px' }"
    @mouseleave="$emit('mouseleave')"
  >
    <div class="calendar-popup-header">
      <div class="calendar-popup-header__title">
        <div
          style="
            width: 5px;
            background: #005AAA;
            border-radius: 3px;
          "
        />
        <h3 class="calendar-popup-header__title--inner">
          {{ '가을학기 석·박사과정 신입생 수강신청' }}
        </h3>
      </div>
      <div class="calendar-popup-header__location">
        <i class="calendar-popup-icon material-icons-outlined">
          location_on
        </i>
        {{ '(E3) 정보전자공학동 1101' }}
      </div>
      <div class="calendar-popup-header__link">
        <i class="calendar-popup-icon material-icons-outlined">
          link
        </i>
        <a
          href="https://cais.kaist.ac.kr"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ 'https://cais.kaist.ac.kr' }}
        </a>
      </div>
    </div>
    <hr class="calendar-popup-line">
    <div class="calendar-popup-body">
      <div class="calendar-popup-body__dates">
        <div id="calendar-popup-body__date--start" class="calendar-popup-body__date">
          <p>
            <span style="color: #A9A9A9">
              {{ '시작' }}
            </span>
            <span style="color: red">
              {{ '5일 23시간' }}
            </span>
          </p>
          <p>
            {{ '2023년 8월 7일 (월) 오후 11:00' }}
          </p>
        </div>
        <div id="calendar-popup-body__date--end" class="calendar-popup-body__date">
          <p>
            <span style="color: #A9A9A9">
              {{ '종료' }}
            </span>
            <span style="color: red">
              {{ '9일 5시간' }}
            </span>
          </p>
          <p>
            {{ '2023년 8월 11일 (금) 오전 4:00' }}
          </p>
        </div>
      </div>
      <div class="calendar-popup-body__description">
        {{ '가을학기 석·박사과정 신입생 수강신청 기간입니다.' }}
      </div>
    </div>
    <hr class="calendar-popup-line">
    <div class="calendar-popup-footer">
      <div class="calendar-popup-footer__tag">
        <p class="calendar-popup-footer__tag--title">
          {{ '태그' }}
        </p>
        <div class="calendar-popup-footer__tag--box">
          <div class="calendar-popup-footer__tag--item">
            <div
              class="calendar-popup-footer__tag--item--circle"
              style="background: #005AAA"
            />
            {{ '학사 일정' }}
          </div>
          <div class="calendar-popup-footer__tag--item">
            <div
              class="calendar-popup-footer__tag--item--circle"
              style="background: #E9008C"
            />
            {{ '석·박사' }}
          </div>
          <div class="calendar-popup-footer__tag--item">
            <div
              class="calendar-popup-footer__tag--item--circle"
              style="background: #EBA12A"
            />
            {{ '동아리' }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { CalendarEvent } from '@/types'
export default Vue.extend({
  name: 'CalendarPopup',

  props: {
    event: {
      type: Object as () => CalendarEvent,
      required: true
    },
    x: {
      type: Number,
      required: true
    },
    y: {
      type: Number,
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
@import "@/theme.scss";
.calendar-popup {
  position: absolute;
  background: rgba(250, 250, 250, 0.8);
  z-index: 30;
  backdrop-filter: blur(7px);
  box-shadow: 0px 6px 12px 0px #33333333;
  width: 300px;
  border: 0.5px solid #A9A9A9;
  border-radius: 20px;
  padding: 20px;
}

.calendar-popup-line {
  background: lightgray;
  width: 100%;
  height: 1px;
  margin: 20px 0;
}

.calendar-popup-header {
  margin-top: 10px;

  &__title {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    margin-bottom: 10px;

    &--inner {
      margin-left: 10px;
      font-size: 18px;
      font-weight: 700;
    }
  }
}

.calendar-popup-body {
  &__dates {
    margin-bottom: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  &__date {
    font-size: 14px;
    width: 50%;
  }

  &__description {
    margin-bottom: 20px;
    font-size: 14px;
  }
}

.calendar-popup-footer {
  margin-bottom: 10px;
  &__tag {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    &--title {
      white-space: nowrap;
      margin-right: 10px;
    }

    &--box {
      display: flex;
      flex-flow: wrap;
      flex-direction: row;
      align-items: center;
      width: 100%;
    }

    &--item {
      font-size: 14px;
      height: 30px;
      padding: 5px 0px;
      margin-left: 10px;
      display: flex;
      white-space: nowrap;

      &--circle {
        width: 10px;
        height: 10px;
        border-radius: 5px;
        margin: auto;
        margin-right: 5px;
      }
    }
  }
}

.calendar-popup-icon {
  font-size: 20px;
  margin-right: 3px;
  vertical-align: bottom;
}
</style>
