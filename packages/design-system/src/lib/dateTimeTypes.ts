/** Inclusive date range (ISO `YYYY-MM-DD`). */
export interface DateRangeValue {
  from: string
  to: string
}

/** Inclusive time range (`HH:mm:ss`). */
export interface TimeRangeValue {
  from: string
  to: string
}

/** Single date + time pair. */
export interface DateTimeValue {
  date: string
  time: string
}

/** Date range with times on each bound. */
export interface DateTimeRangeValue {
  from: DateTimeValue
  to: DateTimeValue
}

export type DateInputModelValue =
  | string
  | DateRangeValue
  | DateTimeValue
  | DateTimeRangeValue
