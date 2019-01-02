export { parseTime, formatTime } from './timePlug'
import moment from 'moment'

export function time(val, format) {
  return val ? moment(val).format(format || 'YYYY-MM-DD HH:mm:ss') : ''
}

export function timeStr(val, format) {
  return val ? moment(val).format(format || 'YYYY-MM-DD') : ''
}
