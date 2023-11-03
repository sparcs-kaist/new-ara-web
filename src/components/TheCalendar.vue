<template>
  <div class="calendar">
    <div class="calendar-content">
      <FullCalendar
        ref="mainCalendar"
        class="main-calendar"
        :options="mainCalendarOptions"
        :events="filteredEventList"
      />
      <FullCalendar
        ref="eventCalendar"
        class="event-calendar"
        :options="eventCalendarOptions"
        :events="filteredEventList"
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
// import interactionPlugin from '@fullcalendar/interaction'

export default {
  name: 'TheCalendar',

  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  data () {
    return {
      defaultEventList: [
        { title: '태그1-1', date: '2023-11-14', color: '#88d7da', tag: '1' },
        { title: '태그1-2', start: '2023-11-22', end: '2023-11-24', allday: true, color: '#88d7da', tag: '1' },
        { title: '태그2-1', date: '2023-11-25', color: '#f49963', tag: '2' },
        { title: '태그2-2', start: '2023-11-28', end: '2023-11-31', allday: true, color: '#f49963', tag: '2' },
        { title: '태그3-1', start: '2023-11-14', end: '2023-11-17', color: '#ee82a1', tag: '3' },
        { title: '태그3-2', start: '2023-11-15', end: '2023-11-18', color: '#ee82a1', tag: '3' }
      ],
      filteredEventList: [],
      selectedTags: [],
      tags: [
        { name: 'tag1', value: '1' },
        { name: 'tag2', value: '2' },
        { name: 'tag3', value: '3' }]
    }
  },
  computed: {
    mainCalendarOptions () {
      return {
        initialView: 'dayGridMonth',
        plugins: [ dayGridPlugin ],
        titleFormat: { year: 'numeric', month: 'long' },
        headerToolbar: {
          start: 'prev next',
          center: 'title',
          end: 'dayGridMonth,dayGridWeek,dayGridDay today'
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
        events: this.filteredEventList
      }
    },
    eventCalendarOptions () {
      return {
        initialView: 'listMonth',
        plugins: [ listPlugin ],
        headerToolbar: {
          start: '',
          center: '',
          end: ''
        },
        eventTextColor: 'black',
        height: '635px',
        locales: [ esLocale, koLocale ],
        locale: this.$t('locale'),
        listDayFormat: (date) => {
          return date.date.day + '일'
        },
        events: this.filteredEventList
      }
    }
  },
  mounted () {
    // const nextButton = this.$refs.mainCalendar.$el.querySelector('.fc-next-button')
    // const prevButton = this.$refs.mainCalendar.$el.querySelector('.fc-prev-button')

    // if (nextButton) {
    //   nextButton.addEventListener('click', () => this.$refs.eventCalendar.getApi().next())
    // }
    // if (prevButton) {
    //   prevButton.addEventListener('click', () => this.$refs.eventCalendar.getApi().prev())
    // }
    this.filteredEventList = this.defaultEventList
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
    },
    deselectAllEvent () {
      this.selectedTags = []
      this.filteredEventList = []
    },
    filterTag () {
      const newEventList = []
      this.defaultEventList.forEach((event) => {
        if (this.selectedTags.includes(event.tag)) {
          newEventList.push(event)
        }
      })
      this.filteredEventList = newEventList
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
en:
  locale: 'en'
  tag: 'Tag'
  select-all: 'Select All'
  deselect-all: 'Deselect All'
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
  width: 700px;
  margin-right: 10px;
  //float: left;
}

.event-calendar {
  width: 400px;
  //float: left;
}

.calendar-tag {
  font-size: 1.5rem;
  font-weight: 500;
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
  & .fc-daygrid-day {
    // background-color: #F0F0F0;
    border-color: var(--fc-neutral-bg-color);
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

  & .fc-today-button {
    width: 70px;
    border: 1px solid var(--fc-border-color);
    border-radius: 15px;
    background-color: white;
    color: black;
  }
}

.event-calendar /deep/ {
  & .fc-list-day-cushion {
    background-color: var(--fc-neutral-bg-color);
    border: 0;
  }
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

</style>
