import moment from 'moment';
import uuid from 'react-native-uuid';


export const generateNextRecurringTask = (task) => {
  let nextDate;

  if (task.recurring === 'Daily') {
    nextDate = moment(task.dueDate).add(1, 'day');
  } else if (task.recurring === 'Weekly') {
    nextDate = moment(task.dueDate).add(7, 'days');
  } else {
    return null; 
  }

  return {
    ...task,
    id: uuid.v4(),
    status: 'Pending',
    dueDate: nextDate.format('YYYY-MM-DD'),
  };
};
