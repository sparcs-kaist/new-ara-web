<template>
  <div ref="calendarContainer" class="calendar">
    <transition name="fade" duration="1000">
      <CalendarPopup
        v-if="hoveringEvent"
        :event="hoveringEvent"
        :tags="tags"
        :x="hoveringPosition.x"
        :y="hoveringPosition.y"
        @mouseleave="hoverEventLeave"
      />
    </transition>

    <div class="calendar-top">
      <div class="calendar-top-start">
        <div class="calendar-prev">
          <button class="calendar-prev-button" @click="prev">
            <i class="material-icons">chevron_left</i>
          </button>
        </div>
        <div class="calendar-date">
          {{ calendarTitle }}
        </div>
        <div class="calendar-next">
          <button class="calendar-next-button" @click="next">
            <i class="material-icons">chevron_right</i>
          </button>
        </div>
      </div>
      <div class="calendar-top-center">
        <div class="calendar-search">
          <div class="search-icon">
            <i class="material-icons">search</i>
          </div>
          <input
            v-model="keyword"
            class="calendar-search-input"
            type="text"
            :placeholder="$t('search')"
            @keyup.enter="searchEvent(keyword)"
          >
        </div>
      </div>
      <div class="calendar-top-end">
        <div class="calendar-view">
          <button
            class="calendar-view-button"
            :class="{'calendar-view-active': activeBtn === 'month' }"
            @click="changeView('month')"
          >
            {{ $t('month') }}
          </button>
          <button
            class="calendar-view-button"
            :class="{'calendar-view-active': activeBtn === 'week' }"
            @click="changeView('week')"
          >
            {{ $t('week') }}
          </button>
          <button
            class="calendar-view-button"
            :class="{'calendar-view-active': activeBtn === 'day' }"
            @click="changeView('day')"
          >
            {{ $t('day') }}
          </button>
        </div>
        <div class="calendar-today">
          <button class="calendar-today-button" @click="todayView">
            {{ $t('today') }}
          </button>
        </div>
      </div>
    </div>
    <div class="calendar-content">
      <FullCalendar
        ref="mainCalendar"
        class="main-calendar"
        :options="mainCalendarOptions"
      />
      <FullCalendar
        ref="eventCalendar"
        class="event-calendar"
        :options="eventCalendarOptions"
      />
    </div>
    <div class="calendar-bottom">
      <div class="calendar-tag">
        {{ $t('tag') }}
      </div>
      <div calss="tag">
        <div class="tag-select">
          <div
            v-for="tag in tags"
            :key="tag.value"
            class="tag-checkbox"
          >
            <input
              :id="tag.name"
              v-model="selectedTags"
              :value="tag.value"
              type="checkbox"
              @change="filterTag"
            >
            <label class="tag-label" :for="tag.name">{{ tag.name }}</label>
          </div>
        </div>
        <div class="tag-reset">
          <button class="tag-reset-button" @click="selectAllEvent">
            {{ $t('select-all') }}
          </button>
          <button class="tag-reset-button" @click="deselectAllEvent">
            {{ $t('deselect-all') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list'
import esLocale from '@fullcalendar/core/locales/es'
import koLocale from '@fullcalendar/core/locales/ko'
import CalendarPopup from './CalendarPopup.vue'
import {
  fetchEventList,
  fetchTagList
} from '@/api/calendar'

export default {
  name: 'TheCalendar',

  components: {
    FullCalendar,
    CalendarPopup
  },
  data () {
    return {
      // testEventList: [
      //   { id: 1, ko_title: 'KAIST 신입생 면접', en_title: 'en title example1', date: '2023-11-29', tagList: [1] },
      //   { id: 2, ko_title: '정기 정전', en_title: 'en title example2', date: '2023-11-05', tagList: [1] },
      //   { id: 3, ko_title: '뭔가 있음', en_title: 'en title example3', date: '2023-11-25', tagList: [2] },
      //   { id: 4, ko_title: '검색 기능 테스트를 위한 긴 텍스트', en_title: 'en title example4', start: '2023-11-28', end: '2023-11-31', allday: true, tagList: [1, 2] },
      //   { id: 5, ko_title: 'G-Star 행사', start: '2023-11-18', en_title: 'en title example5', end: '2023-11-20', tagList: [1, 3] },
      //   { id: 6, ko_title: 'Ara 회식', start: '2023-11-13', en_title: 'en title example6', tagList: [3] },
      //   { id: 7, ko_title: '가을학기 석·박사과정 신입생 수강신청', en_title: 'en title example7', location: '(E3) 정보전자공학동 1101', url: 'https://cais.kaist.ac.kr', start: new Date('2023-12-07 23:00'), end: new Date('2023-12-11 4:00'), allday: false, tagList: [1, 2, 3], ko_description: '가을학기 석·박사과정 신입생 수강신청 기간입니다.' }
      // ],
      // tags: [
      //   { name: '', id: 1, ko_name: '태그1', en_name: 'tag1', color: '#88d7da' },
      //   { name: '', id: 2, ko_name: '태그2', en_name: 'tag2', color: '#f49963' },
      //   { name: '', id: 3, ko_name: '태그3', en_name: 'tag3', color: '#ee82a1' }],
      defaultEventList: [],
      // tags: [],
      filteredEventList: [],
      selectedTags: [],
      keyword: '',
      calendarTitle: '',
      hoveringEvent: null,
      hoveringPosition: { x: 0, y: 0 },
      activeBtn: 'month'
    }
  },
  computed: {
    eventList () {
      return this.filteredEventList.map((event) => {
        return {
          ...event,
          title: this.$i18n.locale === 'ko' ? event.ko_title : event.en_title,
          description: this.$i18n.locale === 'ko' ? event.ko_description : event.en_description
        }
      })
    },
    mainCalendarOptions () {
      return {
        initialView: 'dayGridMonth',
        plugins: [ dayGridPlugin ],
        titleFormat: { year: 'numeric', month: 'short' },
        headerToolbar: {
          start: '',
          center: '',
          end: ''
        },
        buttonText: {
          today: '오늘',
          month: '월',
          week: '주',
          day: '일',
          list: '목록'
        },
        eventTextColor: 'white',
        height: '635px',
        contentHeight: '700px',
        aspectRatio: 1.0,
        locales: [ esLocale, koLocale ],
        locale: this.$t('locale'),
        dayCellContent: function (arg) {
          return arg.dayNumberText.replace('일', '')
        },
        datesSet: this.syncCalendars,
        events: this.eventList,
        eventMouseEnter: this.hoverEventEnter
      }
    },
    eventCalendarOptions () {
      return {
        initialView: 'listMonth',
        plugins: [ listPlugin ],
        listDayFormat: { year: 'numeric', month: 'short', day: 'numeric' },
        listDaySideFormat: { weekday: 'short' },
        headerToolbar: {
          start: '',
          center: '',
          end: ''
        },
        eventTextColor: 'black',
        height: '635px',
        locales: [ esLocale, koLocale ],
        locale: this.$t('locale'),
        events: this.eventList
      }
    }
  },
  watch: {
    '$i18n.locale': function (newLocale, oldLocale) {
      this.calendarTitle = this.$refs.mainCalendar.getApi().getDate().toLocaleString(newLocale, { year: 'numeric', month: 'short' })
      this.tags.forEach((tag) => {
        tag.name = newLocale === 'ko' ? tag.ko_name : tag.en_name
      })
    }
  },
  mounted () {
    this.calendarTitle = this.$refs.mainCalendar.getApi().getDate().toLocaleString(this.$i18n.locale, { year: 'numeric', month: 'short' })
    var eventList = fetchEventList()
    eventList.then((res) => {
      this.defaultEventList = res.results
      this.filteredEventList = this.defaultEventList
      this.filteredEventList.forEach((event) => {
        event.start = event.start_at
        event.end = event.end_at
        event.allday = event.is_all_day
        event.color = event.tags[0].color
      })
    })
    var tagList = fetchTagList()
    tagList.then((res) => {
      this.tags = res.results
      this.tags.forEach((tag) => {
        tag.name = this.$i18n.locale === 'ko' ? tag.ko_name : tag.en_name
      })
    })
    this.selectedTags = this.tags.map((tag) => tag.id)
  },
  methods: {
    syncCalendars (date) {
      const eventCalendarApi = this.$refs.eventCalendar.getApi()

      if (eventCalendarApi) {
        eventCalendarApi.gotoDate(date.view.currentStart)
      }
    },
    selectAllEvent () {
      this.selectedTags = this.tags.map((tag) => tag.value)
      this.filteredEventList = this.defaultEventList
      // add color
      this.filteredEventList.forEach((event) => {
        event.color = event.tags[0].color
      })
    },
    deselectAllEvent () {
      this.selectedTags = []
      this.filteredEventList = []
    },
    filterTag () {
      this.filteredEventList = this.defaultEventList.filter((event) =>
        event.tags.filter((tag) => this.selectedTags.includes(tag.id)).length > 0
      )
    },
    searchEvent (keyword) {
      const newEventList = []
      this.filterTag()
      this.filteredEventList.forEach((event) => {
        if (this.$i18n.locale === 'ko') {
          if (event.ko_title.includes(keyword)) {
            newEventList.push(event)
          }
        } else {
          if (event.en_title.includes(keyword)) {
            newEventList.push(event)
          }
        }
      })
      this.filteredEventList = newEventList
      // add color using colorlist with tag
      this.filteredEventList.forEach((event) => {
        event.color = event.tags[0].color
      })
    },
    next () {
      this.$refs.mainCalendar.getApi().next()
      this.calendarTitle = this.$refs.mainCalendar.getApi().getDate().toLocaleString(this.$i18n.locale, { year: 'numeric', month: 'short' })
    },
    prev () {
      this.$refs.mainCalendar.getApi().prev()
      this.calendarTitle = this.$refs.mainCalendar.getApi().getDate().toLocaleString(this.$i18n.locale, { year: 'numeric', month: 'short' })
    },
    changeView (view) {
      const viewList = [
        ['month', 'dayGridMonth', 'listMonth'],
        ['week', 'dayGridWeek', 'listWeek'],
        ['day', 'dayGridDay', 'listDay']
      ]
      const viewType = viewList.find((viewType) => viewType[0] === view)
      this.$refs.mainCalendar.getApi().changeView(viewType[1])
      this.$refs.eventCalendar.getApi().changeView(viewType[2])
      this.activeBtn = view
    },
    monthView () {
      this.$refs.mainCalendar.getApi().changeView('dayGridMonth')
      this.$refs.eventCalendar.getApi().changeView('listMonth')
    },
    weekView () {
      this.$refs.mainCalendar.getApi().changeView('dayGridWeek')
      this.$refs.eventCalendar.getApi().changeView('listWeek')
    },
    dayView () {
      this.$refs.mainCalendar.getApi().changeView('dayGridDay')
      this.$refs.eventCalendar.getApi().changeView('listDay')
    },
    todayView () {
      this.$refs.mainCalendar.getApi().today()
      this.calendarTitle = this.$refs.mainCalendar.getApi().getDate().toLocaleString(this.$i18n.locale, { year: 'numeric', month: 'long' })
    },
    hoverEventEnter ({ event, el, jsEvent, view }) {
      const rect = this.$refs.calendarContainer.getBoundingClientRect()
      this.hoveringEvent = this.eventList.find((e) => e.id === event.id)
      this.hoveringPosition = { x: jsEvent.x - rect.left - 20, y: jsEvent.y - rect.top - 30 }
    },
    hoverEventLeave () {
      this.hoveringEvent = null
    }
  }
}
</script>

<i18n>
ko:
  locale: 'ko'
  tag: '태그'
  select-all: '모두 선택'
  deselect-all: '모두 해제'
  month: '월'
  week: '주'
  day: '일'
  today: '오늘'
  search: '일정 검색'
en:
  locale: 'en'
  tag: 'Tag'
  select-all: 'Select All'
  deselect-all: 'Reset'
  month: 'Month'
  week: 'Week'
  day: 'Day'
  today: 'Today'
  search: 'Search'
</i18n>

<style lang="scss" scoped>
@import "@/theme.scss";
.calendar-content {
  display: inline-flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
}

.main-calendar {
  width: 70%;
  margin-right: 10px;
  //float: left;
}

.event-calendar {
  width: 30%;
  //float: left;
}

.main-calendar /deep/ {
  & .fc-toolbar-title {
    font-size: 1.75rem;
    font-weight: 700;
    line-height: 36px;
  }

  & .fc-day-sun a {
    color: #E15858;
  }
  & .fc-day-sat a {
    color: #535CAC;
  }
  & .fc-scrollgrid, & .fc-scrollgrid-liquid {
    border-radius: 5px;
  }
  & .fc-col-header-cell {
    border-top: none;
    border-left: none;
    border-right: none;
  }
  & .fc-daygrid-day {
    // background-color: #F0F0F0;
    border-color: var(--fc-neutral-bg-color);
    width: 10%;
    border-left: none;
    border-right: none;
  }
  & .fc-day-today{
    background-color: #e8f5e9;
  }

  & .fc-button-primary {
    background-color: var(--fc-neutral-bg-color);
    border-color: transparent;
    color: #A9A9A9;

    &:active {
      background-color: var(--fc-neutral-bg-color);
    }
  }
  & .fc-button-primary:hover {
    //background-color: transparent;
    //border-color: transparent;
    color: #E15858;
  }

  & .fc-button-group {
    border-radius: 15px;
    background-color: var(--fc-neutral-bg-color);

    & .fc-button-active {
      background-color: white;
      color: black;
      border: transparent;
      border-radius: 10px;
      box-shadow: 0 2px 4px 0 rgba($color: #000000, $alpha: 0.1);
    }
  }
  & .fc-dayGridMonth-button, & .fc-dayGridWeek-button, & .fc-dayGridDay-button {
    background-color: transparent;
    border-color: transparent;
    width: 60px;
    color: #A9A9A9;
    margin: 5px 6px;
    padding-top: 3px;
    padding-bottom: 3px
  }
}

.event-calendar /deep/ {
  & .fc-list-day-cushion {
    background-color: var(--fc-neutral-bg-color);
    border: 0;
  }
}

.calendar-top {
  width: 100%;
  height: 70px;
  border-radius: 20px;
  align-items: center;
  box-shadow: 0px 3px 6px 0px #0000001A;
  border: 1px solid #F0F0F0;
  position: relative;
  display: flex;
}

.calendar-top-start {
  float: left;
  width: 32%;
  height: 36px;
  top: 50%;
  gap: 20px;
  align-items: center;
  justify-content: center;
  display: flex;
  .calendar-prev {
    width: 5%;
    height: 24px;
    align-items: center;
    float: left;
    justify-content: center;
    .calendar-prev-button {
      height: 24px;
      color: #A9A9A9;
      background: none;
      border: none;
      align-items: center;
      font-weight: 700;
      text-align: center;
      .material-icons {
        font-size: 24px;
        font-weight: 500;
        align-items: center;
        text-align: center;
      }
    }

    .calendar-prev-button:hover {
      color: #E15858;
    }
  }

  .calendar-date {
    width: 40%;
    height: 36px;
    float: left;
    font-size: 24px;
    font-weight: 700;
    letter-spacing: 0em;
    text-align: center;
    color: #000000;
    margin-left: 15px;
  }
  .calendar-next {
    width: 5%;
    height: 24px;
    align-items: center;
    float: left;
    justify-content: center;
    .calendar-next-button {
      height: 24px;
      color: #A9A9A9;
      background: none;
      border: none;
      align-items: center;
      font-weight: 700;
      text-align: center;
      .material-icons {
        font-size: 24px;
        font-weight: 500;
        align-items: center;
        text-align: center;
      }
    }

    .calendar-next-button:hover {
      color: #E15858;
    }
  }
}

.calendar-top-center {
  float: left;
  width: 33%;
  margin-right: 10px;
  .calendar-search {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 40px;
    top: 50%;
    left: 399px;
    border-radius: 15px;
    background: #F0F0F0;
    border-style: none;
  }
  .search-icon {
    width: 18.3px;
    height: 18.3px;
    top: 26.7px;
    left: 410.7px;
    .material-icons {
      font-size: 18.3px;
      font-weight: 500;
      color: #A9A9A9;
    }
  }
  .calendar-search-input {
    width: 70px;
    height: 23px;
    top: 23px;
    left: 568px;
    background: none;
    border: none;
    font-size: 16px;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: left;
    color: #A9A9A9;
  }
}

.calendar-top-end {
  float: right;
  width: 30%;
  display: flex;
;
}
.calendar-view {
  display: flex;
  height: 100%;
  float: left;
  align-items: center;
  justify-content: center;
  top: 15px;
  left: 877px;
  border-radius: 15px;
  background-color: #F0F0F0;
  margin-right: 20px;
  margin-left: 30px;
}

.calendar-view-button {
  background-color: transparent;
  border-color: transparent;
  width: 60px;
  color: #A9A9A9;
  margin: 5px 6px;
  padding-top: 3px;
  padding-bottom: 3px;
}

.calendar-view-active {
  background-color: white;
  color: black;
  border: transparent;
  border-radius: 10px;
  box-shadow: 0 2px 4px 0 rgba($color: #000000, $alpha: 0.1);
}

.calendar-view-button:hover {
  color: #E15858;
}

.calendar-today {
  height: 100%;
  float: left;
  align-items: center;
}

.calendar-today-button {
  width: 70px;
  height: 40px;
  top: 15px;
  left: 1112px;
  padding: 8px, 20px, 8px, 20px;
  border-radius: 15px;
  gap: 10px;
  border: 1px solid var(--fc-border-color);
  background-color: white;
  color: black;
}

.calendar-today-button:hover {
  color: #E15858;
}
.calendar-bottom {
  display: flex;
  flex-direction: row;
  width: 100%;
}
.calendar-tag {
  width: 45px;
  height: 36px;
  top: 874px;
  left: 120px;
  font-size: 24px;
  font-weight: 700;
  line-height: 36px;
  letter-spacing: 0em;
  text-align: left;
  color: #000000;
  margin-right: 10px;
}
.tag {
  justify-content: space-between;
}
.tag-checkbox {
  margin-right: 10px;
  margin-bottom: 8px;
  float: left;
}
.tag-label {
  width: 134px;
  height: 40px;
  padding: 8px, 14px, 8px, 14px;
  border-radius: 20px;
  gap: 5px;
  border: 1px solid #DBDBDB;
  border-style: dashed;
  display: inline-block;
  text-align: center;
  color: #DBDBDB;
  font-size: 16px;
  font-weight: 500;
  line-height: 33px;
  cursor: pointer;
}

input[type="checkbox"] {
  display: none;
}

input[type="checkbox"]:checked + label {
  border-style: solid;
  border-color: #666666;
  color: #666666;
;
}

.tag-reset {
  flex: right;
  margin-right: 10px;
}
.tag-reset-button {
  width: 87px;
  height: 40px;
  padding: 8px, 12px, 8px, 12px;
  border-radius: 20px;
  border-style: none;
  margin-right: 8px;
  gap: 5px;
  background: #F0F0F0;
  font-size: 16px;
  font-weight: 500;
  line-height: 33px;
  letter-spacing: 0em;
  text-align: center;
  color: #333333;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-enter, .fade-leave-to {
  opacity: 0 !important;
}
</style>
