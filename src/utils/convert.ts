import moment from 'moment'

export const converDateTimeFromDB = (time: any): any => {
  return moment(time).format('DD-MM-YYYY')
}
