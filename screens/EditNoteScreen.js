import React, { useState, useEffect } from 'react';
import { View, TextInput, Button } from 'react-native';
import { updateNote } from '../utils/db';

export default function EditNoteScreen({ route, navigation }) {
  const { note } = route.params;
  const [title, setTitle] = useState(note.title);
  const [date, setDate] = useState(note.date);
  const [time, setTime] = useState(note.time);
  const [content, setContent] = useState(note.content);

  const handleUpdate = () => {
    const updatedNote = { ...note, title, date, time, content };
    updateNote(updatedNote, () => navigation.goBack());
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Заголовок" value={title} onChangeText={setTitle} />
      <TextInput placeholder="Дата" value={date} onChangeText={setDate} />
      <TextInput placeholder="Время" value={time} onChangeText={setTime} />
      <TextInput
        placeholder="Содержание"
        multiline
        value={content}
        onChangeText={setContent}
        style={{ height: 100, borderWidth: 1, marginTop: 10 }}
      />
      <Button title="Обновить" onPress={handleUpdate} />
    </View>
  );
}