import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { TaskProvider } from './src/context/TaskContext';
import AppNavigator from './src/context/navigation/AppNavigator';


const App = () => {
  return (
    <TaskProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#f9f9f9" />
        <AppNavigator />
      </SafeAreaView>
    </TaskProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
});

export default App;
