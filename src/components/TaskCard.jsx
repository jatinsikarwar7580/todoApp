import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
const TaskCard = ({ task, onEdit, onDelete, isOverdue }) => {
  const colors = isOverdue
    ? ['#ff9a9e', '#ff6a6a'] 
    : getGradientColors(task.priority); 

  return (
    <LinearGradient colors={colors} style={styles.card}>
      <View style={styles.contentContainer}>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{task.title}</Text>
          {task.description && (
            <Text style={styles.meta}>Description: {task.description}</Text>
          )}
          <Text style={styles.meta}>
            Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}
          </Text>
          <Text style={styles.meta}>Priority: {task.priority}</Text>
          <Text style={styles.meta}>Status: {task.status}</Text>
          <Text style={styles.meta}>Category: {task.category}</Text>
          <Text style={styles.meta}>Recurring: {task.recurring}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={onEdit} style={styles.button}>
            <Icon name="edit" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete} style={styles.button}>
            <Icon name="delete" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const getGradientColors = priority => {
  switch (priority) {
    case 'High':
      return ['#ff6a6a', '#ff4d4d'];
    case 'Medium':
      return ['#ffcc70', '#ffb84d'];
    case 'Low':
    default:
      return ['#a8e063', '#56ab2f'];
  }
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 4,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailsContainer: {
    flex: 1, // Ensures details take up available space
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  meta: {
    color: '#f0f0f0',
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  button: {
    marginLeft: 15,
    padding: 5,
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
});

export default TaskCard;
