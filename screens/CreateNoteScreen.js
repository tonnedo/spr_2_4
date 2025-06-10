import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import MaskedTextInput from '../components/MaskedTextInput'; // Импорт нового компонента
import { addNote } from '../utils/db';

export default function CreateNoteScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [content, setContent] = useState('');

  const handleSave = () => {
    const note = { title, date, time, content };

    addNote(note, () => {
      console.log('Заметка сохранена');

      // Небольшая пауза для завершения транзакции
      setTimeout(() => {
        navigation.goBack();
      }, 100); // Задержка 100 мс
    });
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Заголовок" value={title} onChangeText={setTitle} />

      <MaskedTextInput
        placeholder="Дата (дд.мм.гггг)"
        mask="99.99.9999"
        value={date}
        onChangeText={setDate}
      />

      <MaskedTextInput
        placeholder="Время (чч:мм)"
        mask="99:99"
        value={time}
        onChangeText={setTime}
      />

      <TextInput
        placeholder="Содержание"
        multiline
        numberOfLines={5}
        value={content}
        onChangeText={setContent}
        style={{ height: 100, borderWidth: 1, marginTop: 10, padding: 10 }}
      />

      <Button title="Сохранить" onPress={handleSave} />
    </View>
  );
}