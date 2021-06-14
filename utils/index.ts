import moment from 'moment';

export function formatDateString(dateString) {
  const date = moment(dateString);
  return date.format('MMMM Do, YYYY');
}

export default {};
