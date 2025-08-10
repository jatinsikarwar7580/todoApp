import moment from 'moment';

export const isOverdue = (date, status) => {
  const now = moment();
  return moment(date).isBefore(now, 'day') && status !== 'Completed';
};

