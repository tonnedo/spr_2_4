import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { addNote } from '../utils/db';

export default function CreateNoteScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [content, setContent] = useState('');

  const handleSave = () => {
    const note = { title, date, time, content };
    addNote(note, () => navigation.goBack());
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Заголовок" value={title} onChangeText={setTitle} />
      <TextInput placeholder="Дата (например, 01.04.2025)" value={date} onChangeText={setDate} />
      <TextInput placeholder="Время (например, 14:30)" value={time} onChangeText={setTime} />
      <TextInput
        placeholder="Содержание"
        multiline
        value={content}
        onChangeText={setContent}
        style={{ height: 100, borderWidth: 1, marginTop: 10 }}
      />
      <Button title="Сохранить" onPress={handleSave} />
    </View>
  );
}