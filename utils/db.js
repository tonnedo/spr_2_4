import SQLite from 'react-native-sqlite-storage';

// Открытие базы данных
const db = SQLite.openDatabase('notes.db');

// Создание таблицы при инициализации
db.transaction(tx => {
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, date TEXT, time TEXT, content TEXT);',
    [],
    () => console.log('Таблица создана или уже существует'),
    (_, error) => console.log('Ошибка создания таблицы:', error)
  );
});

// Получить все заметки
export const getNotes = callback => {
  console.log('Запрашиваем заметки...');
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM notes;',
      [],
      (_, result) => {
        const notesArray = [];
        console.log('result:', result)

        for (let i = 0; i < result.rows.length; i++) {
          notesArray.push(result.rows.item(i));
        }

        console.log('Результат SQL:', notesArray);
        callback(notesArray);
      },
      (_, error) => {
        console.error('Ошибка SQL:', error);
        callback([]);
      }
    );
  });
};

// Добавить заметку
export const addNote = (note, callback) => {
  const { title, date, time, content } = note;

  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO notes (title, date, time, content) VALUES (?, ?, ?, ?)',
      [title, date, time, content],
      (_, result) => {
        const insertId = result.insertId;
        console.log('Заметка добавлена с ID:', insertId);

        // Проверяем сразу в этой же транзакции
        tx.executeSql(
          'SELECT * FROM notes WHERE id = ?',
          [insertId],
          (_, res) => {
            console.log('Только что добавленная заметка:', res);
            
            // Вызываем callback, если он есть
            if (callback) callback(insertId);
          },
          (_, err) => {
            console.error('Ошибка SELECT:', err);
          }
        );
      },
      (_, error) => {
        console.error('Ошибка INSERT:', error);
      }
    );
  });
};

// Обновить заметку
export const updateNote = (note, callback) => {
  const { id, title, date, time, content } = note;
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE notes SET title=?, date=?, time=?, content=? WHERE id=?;',
      [title, date, time, content, id],
      (_, result) => {
        console.log('Заметка обновлена, изменено строк:', result.rowsAffected);
        if (callback) callback();
      },
      (_, error) => {
        console.error('Ошибка обновления заметки:', error);
      }
    );
  });
};

// Удалить заметку
export const deleteNote = (id, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM notes WHERE id = ?',
      [id],
      (_, result) => {
        console.log('Заметка удалена');
        callback();
      },
      error => {
        console.error('Ошибка удаления заметки:', error);
      }
    );
  });
};

export const debugPrintNotes = () => {
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM notes;', [], (_, result) => {
      console.log('DEBUG: Все заметки в БД:', result.rows._array);
    });
  });
};