/* eslint-disable camelcase */
export type CalendarEvent = {
  id: String,
  ko_title: String,
  en_title: String,
  start: Date,
  end: Date,
  allDay: Boolean,
  color: String,
  ko_description: String,
  en_description: String,
  tagList: Number[],
  location: String | null,
  url: String | null,
}
