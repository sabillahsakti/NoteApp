import { Alert } from 'react-native';
import FIREBASE from '../config/FIREBASE'
import { clearStorage, getData, storeData } from '../utils/localStorage';

export const registerUser = async (data, password) => {
  try {
    const success = await FIREBASE.auth().createUserWithEmailAndPassword(data.email, password);

    const dataBaru = {
      ...data,
      uid: success.user.uid
    };

    await FIREBASE.database().ref('users/' + success.user.uid).set(dataBaru);
    //Local storage(Async Storage)
    storeData('user', dataBaru)
    return dataBaru;
  } catch (error) {
    throw error;
  }
}

export const loginUser = async (email, password) => {
  try {
    const success = await FIREBASE.auth().signInWithEmailAndPassword(email, password);
    const resDB = await FIREBASE.database().ref('/users/' + success.user.uid).once('value');

    if (resDB.val()) {
      // Local storage (Async Storage)
      await storeData('user', resDB.val());
      return resDB.val();
    } else {
      throw new Error('User data not found');
    }
  } catch (error) {
    throw error;
  }
}

export const logoutUser = () => {
  FIREBASE.auth().signOut().then(() => {
    // Sign-out successful.
    clearStorage();
  }).catch((error) => {
    // An error happened.
    alert(error)
  });
}

export const addNote = async (data) => {
  try {
    // Ambil data yg sudah login dari fungsi 'getData'
    const userData = await getData('user');

    if (userData) {
      // Tambah note sesuai uid
      const dataBaru = {
        ...data,
        uid: userData.uid
      };

      await FIREBASE.database().ref('notes/' + userData.uid).push(dataBaru);

      console.log('Note added successfully');
    } else {
      Alert.alert('Error', 'Login Terlebih Dahulu');
    }
  } catch (error) {
    throw error;
  }
}

export const getNote = async () => {
  const userData = await getData('user');
  const notesRef = FIREBASE.database().ref('notes/' + userData.uid);

  return notesRef.once('value')
    .then((snapshot) => {
      const notesData = snapshot.val();
      if (notesData) {
        const notesArray = Object.entries(notesData).map(([noteId, noteData]) => ({
          noteId,
          ...noteData,
        }));
        return notesArray;
      } else {
        return [];
      }
    })
    .catch((error) => {
      console.error('Error fetching user notes:', error);
      return [];
    });
};

export const editNote = async (noteId, updatedData) => {
  try {
    // Ambil data pengguna yang sudah login dari fungsi 'getData'
    const userData = await getData('user');

    if (userData) {
      // Perbarui catatan berdasarkan noteId
      const noteRef = FIREBASE.database().ref(`notes/${userData.uid}/${noteId}`);
      const snapshot = await noteRef.once('value');
      const existingNote = snapshot.val();

      if (existingNote) {
        const updatedNote = {
          ...existingNote,
          ...updatedData,
        };

        await noteRef.update(updatedNote);
        console.log('Note updated successfully');
      } else {
        console.log('Note not found');
      }
    } else {
      Alert.alert('Error', 'Login Terlebih Dahulu');
    }
  } catch (error) {
    throw error;
  }
};

export const deleteNote = async (noteId) => {
  try {
    const userData = await getData('user');

    if (!userData) {
      Alert.alert('Error', 'Login Terlebih Dahulu');
      return;
    }

    const noteRef = FIREBASE.database().ref(`notes/${userData.uid}/${noteId}`);
    const snapshot = await noteRef.once('value');
    const existingNote = snapshot.val();

    if (!existingNote) {
      console.log('Note not found');
      return;
    }

    // Hapus catatan dari database
    await noteRef.remove();
    console.log('Note deleted successfully');
  } catch (error) {
    throw error;
  }
};
