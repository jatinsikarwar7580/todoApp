import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { TaskContext } from '../context/TaskContext';
import { getDueTodayTasks, getOverdueTasks } from '../utils/filterUtils';

const DashboardScreen = () => {
  const { tasks } = useContext(TaskContext);

  const total = tasks.length;
  const completed = tasks.filter(t => t.status === 'Completed').length;
  const today = getDueTodayTasks(tasks).length;
  const overdue = getOverdueTasks(tasks).length;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={['#00c6ff', '#0072ff']} 
        style={styles.container}
      >
        <Text style={styles.title}> Dashboard</Text>

        <View style={styles.card}>
          <Text style={styles.statLabel}>Total Tasks</Text>
          <Text style={styles.statValue}>{total}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.statLabel}>Completed</Text>
          <Text style={styles.statValue}>{completed}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.statLabel}>Due Today</Text>
          <Text style={styles.statValue}>{today}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.statLabel}>Overdue</Text>
          <Text style={styles.statValue}>{overdue}</Text>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 6,
    fontWeight: '600',
  },
  statValue: {
    fontSize: 22,
    color: '#fff',
    fontWeight: '700',
  },
});

export default DashboardScreen;
