import RNFS from 'react-native-fs';

const NOTES_DIR = `${RNFS.DocumentDirectoryPath}/notes`;

const ensureDirExists = async () => {
  const exists = await RNFS.exists(NOTES_DIR);
  if (!exists) await RNFS.mkdir(NOTES_DIR);
};

export const saveNoteToFile = async note => {
  await ensureDirExists();
  const filePath = `${NOTES_DIR}/${note.id}.json`;
  await RNFS.writeFile(filePath, JSON.stringify(note), 'utf8');
};

export const loadNotesFromFile = async () => {
  await ensureDirExists();
  const files = await RNFS.readDir(NOTES_DIR);
  let notes = [];
  for (let file of files) {
    const data = await RNFS.readFile(file.path, 'utf8');
    notes.push(JSON.parse(data));
  }
  return notes;
};