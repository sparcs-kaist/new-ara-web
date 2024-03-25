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
            border-radius: 3px;
          "
          :style="{ backgroundColor: event.color }"
        />
        <h3 class="calendar-popup-header__title--inner">
          {{ event.title }}
        </h3>
      </div>
      <div v-if="event.location" class="calendar-popup-header__location">
        <i class="calendar-popup-icon material-icons-outlined">
          location_on
        </i>
        {{ event.location }}
      </div>
      <div v-if="event.url" class="calendar-popup-header__link">
        <i class="calendar-popup-icon material-icons-outlined">
          link
        </i>
        <a
          :href="event.url"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ event.url }}
        </a>
      </div>
    </div>
    <hr class="calendar-popup-line">
    <div class="calendar-popup-body">
      <div class="calendar-popup-body__dates">
        <div id="calendar-popup-body__date--start" class="calendar-popup-body__date">
          <p>
            <span style="color: #A9A9A9">
              {{ $t('start') }}
            </span>
            <span style="color: red">
              {{ startTimeLeft }}
            </span>
          </p>
          <p>
            {{ event.start.toLocaleString($i18n.locale, { year: 'numeric', month: 'long', day: 'numeric', weekday: 'narrow', hour: 'numeric', minute: 'numeric' }) }}
          </p>
        </div>
        <div id="calendar-popup-body__date--end" class="calendar-popup-body__date">
          <p>
            <span style="color: #A9A9A9">
              {{ $t('end') }}
            </span>
            <span style="color: red">
              {{ endTimeLeft }}
            </span>
          </p>
          <p>
            {{ event.end.toLocaleString($i18n.locale, { year: 'numeric', month: 'long', day: 'numeric', weekday: 'narrow', hour: 'numeric', minute: 'numeric' }) }}
          </p>
        </div>
      </div>
      <div class="calendar-popup-body__description">
        {{ event.description || $t('no-description') }}
      </div>
    </div>
    <hr class="calendar-popup-line">
    <div class="calendar-popup-footer">
      <div class="calendar-popup-footer__tag">
        <p class="calendar-popup-footer__tag--title">
          {{ $t('tag') }}
        </p>
        <div class="calendar-popup-footer__tag--box">
          <div
            v-for="tag in eventTagList"
            :key="tag.id"
            class="calendar-popup-footer__tag--item"
          >
            <div
              class="calendar-popup-footer__tag--item--circle"
              :style="{ backgroundColor: tag.color }"
            />
            {{ tag.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { CalendarEvent, Tag } from '@/types'
export default Vue.extend({
  name: 'CalendarPopup',

  props: {
    event: {
      type: Object as () => CalendarEvent,
      required: true
    },
    tags: {
      type: Array as () => Tag[],
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
  },
  computed: {
    startTimeLeft (): string {
      const now = new Date()
      const diff = this.event.start.getTime() - now.getTime()
      const days = Math.floor(Math.abs(diff) / (1000 * 60 * 60 * 24))
      const hours = Math.floor((Math.abs(diff) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const sign = diff < 0 ? '-' : ''
      return `${sign}${days}${this.$t('day')} ${hours}${this.$t('hour')}`
    },
    endTimeLeft (): string {
      const now = new Date()
      const diff = this.event.end.getTime() - now.getTime()
      const days = Math.floor(Math.abs(diff) / (1000 * 60 * 60 * 24))
      const hours = Math.floor((Math.abs(diff) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const sign = diff < 0 ? '-' : ''
      return `${sign}${days}${this.$t('day')} ${hours}${this.$t('hour')}`
    },
    eventTagList (): Tag[] {
      return this.event.tags
    }
  }
})
</script>

<i18n>
ko:
  start: '시작'
  end: '종료'
  no-description: '설명이 없습니다.'
  tag: '태그'
  day: '일'
  hour: '시간'
en:
  start: 'Start'
  end: 'End'
  no-description: 'No description provided.'
  tag: 'Tag'
  day: 'd'
  hour: 'h'
</i18n>

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
