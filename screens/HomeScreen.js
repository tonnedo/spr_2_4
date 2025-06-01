import React, { useEffect, useState } from 'react';
import { FlatList, Button } from 'react-native';
import { getNotes } from '../utils/db';
import NoteItem from '../components/NoteItem';

export default function HomeScreen({ navigation }) {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getNotes(setNotes);
  }, []);

  const filteredNotes = notes.filter(n =>
    n.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
      <FlatList
        data={filteredNotes}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <NoteItem
            note={item}
            onPress={() => navigation.navigate('Редактировать', { note: item })}
          />
        )}
      />
      <Button title="Добавить заметку" onPress={() => navigation.navigate('Создать заметку')} />
    </>
  );
}