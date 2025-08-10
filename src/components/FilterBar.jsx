import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import {  RECURRING_OPTIONS,PRIORITY_LEVELS, STATUS_OPTIONS } from '../constants';

const FilterBar = ({ filters, setFilters, searchQuery, setSearchQuery }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const resetFilters = () => {
    setFilters({ status: '', priority: '', category: '', dueDate: '', recurring: '' });
    setSearchQuery('');
  };

  return (
    <LinearGradient colors={['#00c6ff', '#0072ff']} style={styles.gradient}>
      {/* Search Row with Filter & Reset */}
      <View style={styles.topRow}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search tasks..."
          placeholderTextColor="#666"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.iconButton} onPress={() => setModalVisible(true)}>
          <Icon name="filter" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={resetFilters}>
          <Icon name="rotate-ccw" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Filter Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filters</Text>

            {/* Status */}
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={filters.status}
                onValueChange={(itemValue) => setFilters({ ...filters, status: itemValue })}
              >
                <Picker.Item label="All Statuses" value="" />
                {STATUS_OPTIONS.map((status) => (
                  <Picker.Item key={status} label={status} value={status} />
                ))}
              </Picker>
            </View>

            {/* Priority */}
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={filters.priority}
                onValueChange={(itemValue) => setFilters({ ...filters, priority: itemValue })}
              >
                <Picker.Item label="All Priorities" value="" />
                {PRIORITY_LEVELS.map((priority) => (
                  <Picker.Item key={priority} label={priority} value={priority} />
                ))}
              </Picker>
            </View>

            {/* Recurring */}
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={filters.recurring}
                onValueChange={(itemValue) => setFilters({ ...filters, recurring: itemValue })}
              >
                <Picker.Item label="All Recurring Types" value="" />
                {RECURRING_OPTIONS.map((rec) => (
                  <Picker.Item key={rec} label={rec} value={rec} />
                ))}
              </Picker>
            </View>

            {/* Due Today / Overdue */}
            <View style={styles.filterRow}>
              <TouchableOpacity
                style={[
                  styles.filterButton,
                  filters.dueDate === 'dueToday' && styles.activeFilter,
                ]}
                onPress={() =>
                  setFilters({
                    ...filters,
                    dueDate: filters.dueDate === 'dueToday' ? '' : 'dueToday',
                  })
                }
              >
                <Text style={[
                  styles.filterButtonText,
                  filters.dueDate === 'dueToday' && styles.activeFilterText
                ]}>Due Today</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.filterButton,
                  filters.dueDate === 'overdue' && styles.activeFilter,
                ]}
                onPress={() =>
                  setFilters({
                    ...filters,
                    dueDate: filters.dueDate === 'overdue' ? '' : 'overdue',
                  })
                }
              >
                <Text style={[
                  styles.filterButtonText,
                  filters.dueDate === 'overdue' && styles.activeFilterText
                ]}>Overdue</Text>
              </TouchableOpacity>
            </View>

            {/* Close Button */}
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    backgroundColor: '#fff',
    marginRight: 8,
  },
  iconButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8,
    marginLeft: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
    overflow: 'hidden',
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  filterButton: {
    flex: 1,
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  activeFilter: {
    backgroundColor: '#4CAF50',
  },
  filterButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  activeFilterText: {
    color: '#fff',
  },
  closeButton: {
    backgroundColor: '#0072ff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default FilterBar;
