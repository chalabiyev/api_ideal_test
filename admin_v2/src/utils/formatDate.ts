// eslint-disable-next-line
import moment from 'moment';
// eslint-disable-next-line
export const formatDate = (dateString: string) => {
  return moment(dateString).format('DD MMM YYYY HH:mm');
};


export const formatDDate = (date: Date) => {
  return moment(date).format('DD MMM YYYY HH:mm');
};