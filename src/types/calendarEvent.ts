/* eslint-disable camelcase */
export type Tag = {
  name: String,
  en_name: String,
  ko_name: String,
  id: Number,
  color: String,
}

export type CalendarEvent = {
  id: String,
  title: String,
  ko_title: String,
  en_title: String,
  start: Date,
  end: Date,
  start_at: Date,
  end_at: Date,
  allDay: Boolean,
  color: String,
  description: String,
  ko_description: String,
  en_description: String,
  tags: Tag[],
  location: String | null,
  url: String | null,
}
