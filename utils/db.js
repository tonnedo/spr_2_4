import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  { name: 'notes.db', location: 'default' },
  () => {},
  error => console.log('Ошибка открытия БД:', error)
);

db.transaction(tx => {
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, date TEXT, time TEXT, content TEXT);'
  );
});

export const getNotes = callback => {
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM notes;', [], (_, { rows }) => callback(rows._array));
  });
};

export const addNote = (note, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO notes (title, date, time, content) VALUES (?, ?, ?, ?);',
      [note.title, note.date, note.time, note.content],
      callback
    );
  });
};

export const updateNote = (note, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE notes SET title=?, date=?, time=?, content=? WHERE id=?;',
      [note.title, note.date, note.time, note.content, note.id],
      callback
    );
  });
};

export const deleteNote = (id, callback) => {
  db.transaction(tx => {
    tx.executeSql('DELETE FROM notes WHERE id=?;', [id], callback);
  });
};