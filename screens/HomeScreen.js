import React, {useEffect, useMemo, useState} from 'react';
import {FlatList, Button, Text, View} from 'react-native';
import {getNotes} from '../utils/db';
import NoteItem from '../components/NoteItem';
import SearchBar from '../components/SearchBar';

export default function HomeScreen({navigation}) {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getNotes(setNotes);
  }, []);

  const filteredNotes = useMemo(() => (notes || []).filter(n =>
    n.title.toLowerCase().includes(searchQuery.toLowerCase()),
  ), []);

  return (
    <>
      <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
      {filteredNotes.length === 0 ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Заметки не найдены</Text>
        </View>
      ) : (
        <FlatList
          data={filteredNotes}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <NoteItem
              note={item}
              onPress={() => navigation.navigate('Редактировать', {note: item})}
            />
          )}
        />
      )}
      <Button
        title="Добавить заметку"
        onPress={() => navigation.navigate('Создать заметку')}
      />
    </>
  );
}
