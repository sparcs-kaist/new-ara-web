<template>
  <div class="calendar">
    <div class="calendar-content">
      <FullCalendar
        ref="mainCalendar"
        class="main-calendar"
        :options="mainCalendarOptions"
        :events="eventList"
      />
      <FullCalendar
        ref="eventCalendar"
        class="event-calendar"
        :options="eventCalendarOptions"
        :events="eventList"
      />
    </div>
    <div class="calendar-bottom">
      <h2 class="calendar-tag">
        {{ $t('tag') }}
      </h2>
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
      eventList: [
        { title: '으악', date: '2023-09-14', color: '#005AAA' },
        { title: '카포전', start: '2023-09-22', end: '2023-09-24', allday: true, color: '#005AAA' },
        { title: '으아아앙', date: '2023-09-25', color: '#005AAA' },
        { title: '추석', start: '2023-09-28', end: '2023-09-31', allday: true, color: '#ED3A3A' },
        { title: '테스트', start: '2023-10-14', end: '2023-10-17', color: '#005AAA' },
        { title: '테스트2', start: '2023-10-15', end: '2023-10-18', color: '#005AAA' }
      ]
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
        events: this.eventList
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
        events: this.eventList
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
  },
  methods: {
    syncCalendars (date) {
      const eventCalendarApi = this.$refs.eventCalendar.getApi()

      if (eventCalendarApi) {
        eventCalendarApi.gotoDate(date.view.currentStart)
      }
    }
  }
}
</script>

<i18n>
ko:
  locale: 'ko'
  tag: '태그'
en:
  locale: 'en'
  tag: 'Tag'
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

</style>
