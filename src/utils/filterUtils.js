import moment from 'moment';


export const getDueTodayTasks = (tasks) => {
  const today = moment().format('YYYY-MM-DD');
  return tasks.filter(task =>
    moment(task.dueDate).format('YYYY-MM-DD') === today
  );
};

export const getOverdueTasks = (tasks) => {
  const now = moment();
  return tasks.filter(task =>
    moment(task.dueDate).isBefore(now) && task.status !== 'Completed'
  );
};



export const filterTasksByStatus = (tasks, status) => {
  return tasks.filter(task => task.status === status);
};

export const filterTasksByPriority = (tasks, priority) => {
  return tasks.filter(task => task.priority === priority);
};

export const filterTasksByCategory = (tasks, category) => {
  return tasks.filter(task => task.category === category);
};
