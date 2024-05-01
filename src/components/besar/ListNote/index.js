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
      <View>
        <Text style={styles.judul}>{judul}</Text>
        <Text>{isi}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.dateText}>{tanggal}</Text>
          <View style={styles.status}>
            <Text style={styles.statusText}>{status}</Text>
          </View>
        </View>
      </View>
      <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
        <TouchableOpacity onPress={handleEditClick}>
          <IconEdit />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDeleteClick}>
          <IconDelete />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ListNote

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
    padding: 20, // Mengurangi padding agar lebih kompak
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // Memastikan konten vertikal sejajar
    marginBottom: 10,
  },
  judul: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  dateText: {
    fontSize: 16,
    marginRight: 4,
  },
  status: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: 'green',
    borderRadius: 50,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusText: {
    color: 'white',
    fontWeight: 'bold',
  },
})
