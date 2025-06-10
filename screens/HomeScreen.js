import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import SearchBar from '../components/SearchBar';
import { getNotes, deleteNote } from '../utils/db'; // Предположим, что у тебя есть функция deleteNote
import Icon from 'react-native-vector-icons/FontAwesome'; // Импорт иконок

export default function HomeScreen({ navigation }) {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('Экран получил фокус, загружаем заметки...');
      getNotes(data => {
        console.log('Заметки загружены:', data);
        setNotes(data || []);
      });
    });

    return unsubscribe;
  }, [navigation]);

  const filteredNotes = (notes || []).filter(note =>
    note?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note?.content?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteNote = (noteId) => {
    deleteNote(noteId, () => {
      // После удаления обновляем список
      getNotes(data => {
        setNotes(data || []);
      });
    });
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {/* Поиск */}
      <SearchBar value={searchQuery} onChangeText={setSearchQuery} />

      {/* Список заметок */}
      <FlatList
        data={filteredNotes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.noteItem}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.date} {item.time}</Text>

            <View style={styles.iconsContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Редактировать', { note: item })}
                style={styles.iconButton}
              >
                <Icon name="pencil" size={20} color="#007AFF" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleDeleteNote(item.id)}
                style={styles.iconButton}
              >
                <Icon name="trash" size={20} color="#FF3B30" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Кнопка "Создать заметку" */}
      <Button
        title="Создать заметку"
        onPress={() => navigation.navigate('Создать заметку')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  noteItem: {
    borderBottomWidth: 1,
    paddingVertical: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 5,
  },
  iconButton: {
    marginLeft: 15,
  },
});