import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TaskContext } from '../context/TaskContext';
import TaskCard from '../components/TaskCard';
import FilterBar from '../components/FilterBar';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {
  filterTasksByCategory,
  filterTasksByPriority,
  filterTasksByStatus,
} from '../utils/filterUtils';
import { isOverdue } from '../utils/dateUtils';

const HomeScreen = () => {
  const { tasks, dispatch } = useContext(TaskContext);
  const navigation = useNavigation();

  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    category: '',
    dueDate: '',
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTasks, setFilteredTasks] = useState(tasks);

  useEffect(() => {
    let temp = [...tasks];

    if (searchQuery) {
      temp = temp.filter(
        task =>
          task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (task.description &&
            task.description.toLowerCase().includes(searchQuery.toLowerCase())),
      );
    }

    if (filters.status) temp = filterTasksByStatus(temp, filters.status);
    if (filters.priority) temp = filterTasksByPriority(temp, filters.priority);
    if (filters.category) temp = filterTasksByCategory(temp, filters.category);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (filters.dueDate === 'dueToday') {
      temp = temp.filter(task => {
        const taskDueDate = new Date(task.dueDate);
        taskDueDate.setHours(0, 0, 0, 0);
        return taskDueDate.getTime() === today.getTime();
      });
    }

    if (filters.dueDate === 'overdue') {
      temp = temp.filter(task => {
        const taskDueDate = new Date(task.dueDate);
        taskDueDate.setHours(0, 0, 0, 0);
        return (
          taskDueDate.getTime() < today.getTime() && task.status !== 'Completed'
        );
      });
    }

    setFilteredTasks(temp);
  }, [filters, tasks, searchQuery]);

  const handleEditTask = task => {
    navigation.navigate('EditTask', { task });
  };

  const handleDeleteTask = taskId => {
    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        onPress: () => dispatch({ type: 'DELETE_TASK', payload: taskId }),
      },
    ]);
  };

  const handleCompleteTask = taskId => {
    Alert.alert('Complete Task', 'Mark this task as completed?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Complete',
        onPress: () => dispatch({ type: 'COMPLETE_TASK', payload: taskId }),
      },
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient colors={['#89f7fe', '#66a6ff']} style={styles.container}>
        <FilterBar
          filters={filters}
          setFilters={setFilters}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <TouchableOpacity
          style={styles.dashboardButtonWrapper}
          onPress={() => navigation.navigate('Dashboard')}
        >
          <LinearGradient
            colors={['#ff9966', '#ff5e62']}
            style={styles.dashboardButton}
          >
            <Text style={styles.dashboardButtonText}>Go to Dashboard</Text>
          </LinearGradient>
        </TouchableOpacity>

        {filteredTasks.length === 0 ? (
          <Text style={styles.emptyText}>No tasks found.</Text>
        ) : (
          <FlatList
            data={filteredTasks}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TaskCard
                task={item}
                isOverdue={isOverdue(item.dueDate, item.status)}
                onEdit={() => handleEditTask(item)}
                onDelete={() => handleDeleteTask(item.id)}
                onComplete={() => handleCompleteTask(item.id)}
              />
            )}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        )}

        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate('AddTask')}
        >
          <Text style={styles.fabText}>＋</Text>
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#fff',
    marginTop: 30,
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#4CAF50',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  fabText: {
    fontSize: 30,
    color: '#fff',
    marginTop: -2,
  },
  dashboardButtonWrapper: {
    marginBottom: 16,
  },
  dashboardButton: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  dashboardButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
