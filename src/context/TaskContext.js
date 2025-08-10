import React, { createContext, useReducer, useEffect } from 'react';
import { saveTaskList, loadTaskList } from '../storage/taskStorage';
import uuid from 'react-native-uuid';
import { generateNextRecurringTask } from '../utils/recurrenceUtils';


export const TaskContext = createContext();

const initialState = {
  tasks: [],
  loading: true,
};

const taskReducer = (state, action) => {
  let updatedTasks;

  switch (action.type) {
    case 'LOAD_TASKS':
      return { ...state, tasks: action.payload, loading: false };

    case 'ADD_TASK':
      updatedTasks = [...state.tasks, { ...action.payload, id: uuid.v4() }];
      saveTaskList(updatedTasks);
      return { ...state, tasks: updatedTasks };

    case 'DELETE_TASK':
      updatedTasks = state.tasks.filter(task => task.id !== action.payload);
      saveTaskList(updatedTasks);
      return { ...state, tasks: updatedTasks };

    case 'UPDATE_TASK': {
      updatedTasks = state.tasks.map(task =>
        task.id === action.payload.id ? { ...action.payload } : task
      );

    
      const originalTask = state.tasks.find(t => t.id === action.payload.id);
      if (
        originalTask &&
        originalTask.recurring !== 'One Time' &&
        action.payload.status === 'Completed' &&
        originalTask.status !== 'Completed'
      ) {
        const nextTask = generateNextRecurringTask(action.payload);
        if (nextTask) {
          updatedTasks = [...updatedTasks, nextTask];
        }
      }

      saveTaskList(updatedTasks);
      return { ...state, tasks: updatedTasks };
    }

    case 'COMPLETE_TASK': {
      updatedTasks = state.tasks.map(task =>
        task.id === action.payload ? { ...task, status: 'Completed' } : task
      );

   
      const completedTask = state.tasks.find(t => t.id === action.payload);
      if (
        completedTask &&
        completedTask.recurring !== 'One Time' &&
        completedTask.status !== 'Completed'
      ) {
        const nextTask = generateNextRecurringTask(completedTask);
        if (nextTask) {
          updatedTasks = [...updatedTasks, nextTask];
        }
      }

      saveTaskList(updatedTasks);
      return { ...state, tasks: updatedTasks };
    }

    default:
      return state;
  }
};

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  useEffect(() => {
    const fetchTasks = async () => {
      const savedTasks = await loadTaskList();
      dispatch({ type: 'LOAD_TASKS', payload: savedTasks });
    };
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider value={{ tasks: state.tasks, dispatch, loading: state.loading }}>
      {children}
    </TaskContext.Provider>
  );
};
