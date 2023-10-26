<template>
  <div class="calendar">
    <div class="calendar-content">
      <div class="main-calendar">
        <FullCalendar
          ref="mainCalendar"
          :options="mainCalendarOptions"
          :events="eventList"
        />
      </div>
      <div class="event-calendar">
        <FullCalendar
          ref="eventCalendar"
          :options="eventCalendarOptions"
          :events="eventList"
        />
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
      eventList: [
        { title: '으악', date: '2023-09-14', color: '#005AAA' },
        { title: '카포전', start: '2023-09-22', end: '2023-09-24', allday: true, color: '#005AAA' },
        { title: '으아아앙', date: '2023-09-25', color: '#005AAA' },
        { title: '추석', start: '2023-09-28', end: '2023-09-31', allday: true, color: '#ED3A3A' }
      ]
    }
  },
  computed: {
    mainCalendarOptions () {
      return {
        defaultView: 'dayGridMonth',
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
        locale: 'ko',
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
        locale: 'ko',
        events: this.eventList
      }
    }
  },
  mounted () {
    const nextButton = this.$refs.mainCalendar.$el.querySelector('.fc-next-button')
    const prevButton = this.$refs.mainCalendar.$el.querySelector('.fc-prev-button')

    if (nextButton) {
      nextButton.addEventListener('click', () => this.$refs.eventCalendar.getApi().next())
    }
    if (prevButton) {
      prevButton.addEventListener('click', () => this.$refs.eventCalendar.getApi().prev())
    }
  }
}
</script>

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

.fc-scrollgrid  .fc-scrollgrid-liquid {
  border-radius: 5px;
}

.fc-day-sun a {
  color: #E15858;
}

.fc-day-sat a {
  color: #535CAC;
}

.fc .fc-daygrid-day  .fc-day-today{
  background-color: #F0F0F0;
  border-color: transparent;
}

.fc .fc-button-primary {
  background-color: transparent;
  border-color: transparent;
  color: #A9A9A9;
}

.fc .fc-button-primary:hover {
  background-color: transparent;
  border-color: transparent;
  color: #E15858;
}

.fc .fc-dayGridMonth-button , .fc .fc-dayGridWeek-button , .fc .fc-dayGridDay-button {
  background-color: #F0F0F0;
  border-color: transparent;
  padding-left: 30px;
  padding-right: 30px;
  color: #A9A9A9;
}

.fc .fc-dayGridMonth-button:hover , .fc .fc-dayGridWeek-button:hover , .fc .fc-dayGridDay-button:hover {
  background-color: #F0F0F0;
  border-color: transparent;
  padding-left: 30px;
  padding-right: 30px;
  color: #000000;
}

.fc .fc-button-primary:not(:disabled).fc-button-active {
  background-color: #A9A9A9;
  border-color: transparent;
  color: #ffffff;
}

.fc .fc-today-button {
  background-color: transparent;
  border-color: transparent;
  color: #A9A9A9;
}

.fc .fc-today-button:disabled {
  background-color: transparent;
  border-color: transparent;
  color: #A9A9A9;
}

.fc-toolbar-title {
  font-size: 24px;
  font-weight: 700;
  line-height: 36px;
  letter-spacing: 0em;
  text-align: left;
}

.fc-list-day-cushion {
  background-color: transparent;
  border-color: transparent;
  color: #A9A9A9;
}
</style>
