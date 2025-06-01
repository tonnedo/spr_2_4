import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function NoteItem({ note, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={{ padding: 15, borderBottomWidth: 1 }}>
      <Text style={{ fontWeight: 'bold' }}>{note.title}</Text>
      <Text>{note.date} | {note.time}</Text>
    </TouchableOpacity>
  );
}