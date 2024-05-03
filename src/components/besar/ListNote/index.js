import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { IconDelete, IconEdit } from '../../../assets'
import { useNavigation } from '@react-navigation/native';
import { deleteNote } from '../../../actions/AuthAction';


const ListNote = ({ judul, isi, tanggal, status, category, noteId }) => {
  const navigation = useNavigation();

  const handleEditClick = () => {
    navigation.navigate('EditNote', {
      judul,
      isi,
      category,
      status,
      noteId
    });
  };

  const handleDeleteClick = () => {
    deleteNote(noteId)
    navigation.replace('MainApp')
  }

  return (
    <View style={styles.cardLogin}>
      <View style={{ flex: 1 }}>
        <Text style={styles.judul}>{judul}</Text>
        <Text style={styles.isi}>{isi}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
          <View style={styles.status}>
            <Text style={styles.statusText}>{status}</Text>
          </View>
        </View>
      </View>
      <View style={styles.actionIcons}>
        <TouchableOpacity onPress={handleEditClick} style={styles.iconButton}>
          <IconEdit />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDeleteClick} style={styles.iconButton}>
          <IconDelete />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardLogin: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  judul: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4, // Added some margin for better spacing
  },
  isi: {
    fontSize: 16,
  },
  status: {
    backgroundColor: 'green',
    borderRadius: 50,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statusText: {
    color: 'white',
    fontWeight: 'bold',
  },
  actionIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 10, // Space between icons
  }
});

export default ListNote;
