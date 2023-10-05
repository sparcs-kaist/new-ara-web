/* eslint-disable */
import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import esLocale from '@fullcalendar/core/locales/es';
import koLocale from '@fullcalendar/core/locales/ko';
import './ReactCalendar.css'

const eventList = [
  { title: '으악', date: '2023-09-14', color:'#005AAA' },
  { title: '카포전', start: '2023-09-22', end: '2023-09-24', allday: true, color:'#005AAA' },
  { title: '으아아앙', date: '2023-09-25', color:'#005AAA'},
  { title: '추석', start: '2023-09-28', end: '2023-09-31', allday: true, color:'#ED3A3A' },
]

export default function ReactCalendar(): JSX.Element {
    return (
      <div className="Calendar">
        <div className="DateCalendar">
          <FullCalendar 
            defaultView='dayGridMonth'
            plugins={[ dayGridPlugin ]}
            titleFormat={{ year: 'numeric', month: 'long' }}
            headerToolbar={{
              start: 'prev next',
              center: 'title',
              end: 'dayGridMonth,dayGridWeek,dayGridDay today'
            }}
            buttonText={{
              today:    '오늘',
              month:    '월',
              week:     '주',
              day:      '일',
              list:     '목록'
            }}
            events={eventList}
            eventTextColor = 'white'
            height = '635px'
            contentHeight = '700px'
            aspectRatio={1.0}
            locales = {[ esLocale, koLocale ]}
            locale={'ko'}
          />
        </div>
        <div className='EventCalendar'>
          <FullCalendar 
              initialView="listYear" 
              plugins={[ listPlugin ]}
              headerToolbar={{
                start: '',
                center: '',
                end: ''
              }}
              events={eventList}
              eventTextColor = 'black'
              height='635px'
              locales = {[ esLocale, koLocale ]}
              locale={'ko'}
          />
        </div>
      </div>
    );
}