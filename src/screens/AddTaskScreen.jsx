import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { TaskContext } from '../context/TaskContext';
import uuid from 'react-native-uuid';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import LinearGradient from 'react-native-linear-gradient';

import { CATEGORIES , RECURRING_OPTIONS,PRIORITY_LEVELS, STATUS_OPTIONS } from '../constants';

const AddTaskScreen = ({ navigation }) => {
  const { dispatch } = useContext(TaskContext);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [status, setStatus] = useState(STATUS_OPTIONS[0]);
  const [priority, setPriority] = useState(PRIORITY_LEVELS[0]);
  const [category, setCategory] = useState('General');
  const [recurring, setRecurring] = useState(RECURRING_OPTIONS[0]);

  const handleAddTask = () => {
    if (!title.trim()) {
      alert('Task title cannot be empty!');
      return;
    }

    const newTask = {
      id: uuid.v4(),
      title,
      description,
      dueDate: dueDate.toISOString(),
      status,
      priority,
      category,
      recurring,
    };

    dispatch({ type: 'ADD_TASK', payload: newTask });
    navigation.goBack();
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || dueDate;
    setShowDatePicker(Platform.OS === 'ios');
    setDueDate(currentDate);
  };

  return (
    <LinearGradient
      colors={['#89f7fe', '#66a6ff']}
      style={styles.gradientBackground}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          <Text style={styles.label}>Task Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Enter task title"
          />

          <Text style={styles.label}>Description (Optional)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Add a description"
            multiline
            numberOfLines={4}
          />

          <Text style={styles.label}>Due Date</Text>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={styles.datePickerButton}
          >
            <Text style={styles.datePickerText}>
              {dueDate.toLocaleDateString()}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={dueDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onChangeDate}
            />
          )}

          <Text style={styles.label}>Status</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={status}
              onValueChange={itemValue => setStatus(itemValue)}
              style={[styles.picker, { color: 'black' }]}
              dropdownIconColor="black"
            >
              {STATUS_OPTIONS.map(s => (
                <Picker.Item key={s} label={s} value={s} />
              ))}
            </Picker>
          </View>

          <Text style={styles.label}>Priority</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={priority}
              onValueChange={itemValue => setPriority(itemValue)}
              style={[styles.picker, { color: 'black' }]}
              dropdownIconColor="black"
            >
              {PRIORITY_LEVELS.map(p => (
                <Picker.Item key={p} label={p} value={p} />
              ))}
            </Picker>
          </View>

          <Text style={styles.label}>Category/Tag</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={category}
              onValueChange={itemValue => setCategory(itemValue)}
              style={[styles.picker, { color: 'black' }]}
              dropdownIconColor="black"
            >
              {CATEGORIES.map(option => (
                <Picker.Item key={option} label={option} value={option} />
              ))}
            </Picker>
          </View>

          <Text style={styles.label}>Recurring</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={recurring}
              onValueChange={itemValue => setRecurring(itemValue)}
              style={[styles.picker, { color: 'black' }]}
              dropdownIconColor="black"
            >
              {RECURRING_OPTIONS.map(r => (
                <Picker.Item key={r} label={r} value={r} />
              ))}
            </Picker>
          </View>

          <Button title="Add Task" onPress={handleAddTask} />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientBackground: { flex: 1 },
  scrollContent: { flexGrow: 1 },
  container: { padding: 16, paddingBottom: 30 },
  label: { marginBottom: 8, fontSize: 16, fontWeight: 'bold', color: '#333' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  textArea: { height: 100, textAlignVertical: 'top' },
  datePickerButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  datePickerText: { fontSize: 16, color: '#333' },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  picker: { height: 58, width: '100%' },
});

export default AddTaskScreen;
