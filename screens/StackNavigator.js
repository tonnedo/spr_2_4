import React from 'react';
import { createStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import CreateNoteScreen from './CreateNoteScreen';
import EditNoteScreen from './EditNoteScreen';

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Главная">
      <Stack.Screen name="Главная" component={HomeScreen} />
      <Stack.Screen name="Создать заметку" component={CreateNoteScreen} />
      <Stack.Screen name="Редактировать" component={EditNoteScreen} />
    </Stack.Navigator>
  );
}