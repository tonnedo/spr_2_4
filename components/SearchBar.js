import React from 'react';
import { TextInput, View } from 'react-native';

export default function SearchBar({ value, onChangeText }) {
  return (
    <View style={{ margin: 10 }}>
      <TextInput
        placeholder="Поиск заметок..."
        value={value}
        onChangeText={onChangeText}
        style={{ borderWidth: 1, padding: 10 }}
      />
    </View>
  );
}