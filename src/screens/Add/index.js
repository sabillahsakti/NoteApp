import React, { Component } from 'react'
import { SafeAreaView, StyleSheet, View, Alert, TextInput, Text, TouchableOpacity } from 'react-native'
import { Button, Input, Pilihan } from '../../components'
import { addNote, getNote } from '../../actions/AuthAction'
import Modal from 'react-native-modal';


export class Add extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      content: '',
      status: '',
      caregory: '',
      categoryUser: [],

      //Buat Modal
      isModalVisible: false,
      newCategory: '',
    }
  }

  // Fungsi untuk menampilkan atau menyembunyikan modal
  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }

  ubahStatus = (status) => {
    this.setState({
      status: status,
    })

  }

  async componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', async () => {
      const notes = await getNote();
      const categories = notes.map((note) => note.category);
      const uniqueCategories = categories.filter((value, index, self) => {
        return self.indexOf(value) === index;
      });
      this.setState({ categoryUser: uniqueCategories });
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  onAddNote = async () => {
    const { title, content, status, category } = this.state
    if (title && content && status && category) {
      const data = {
        title: title,
        content: content,
        status: status,
        category: category
      }

      console.log(data)
      try {
        const user = await addNote(data);
        this.props.navigation.replace('MainApp');
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    } else {
      Alert.alert('Error', 'Data tidak lengkap');
    }
  }

  handleAddCategory = (newCategory) => {
    this.setState((prevState) => ({
      categoryUser: [...prevState.categoryUser, newCategory],
    }));
    this.toggleModal();
  }
  render() {
    const { title, content, status, category, categoryUser } = this.state
    const { isModalVisible, newCategory } = this.state;
    console.log("Isi Category", categoryUser)

    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Input
            label="Title"
            width={200}
            value={title}
            onChangeText={(title) => this.setState({ title })}
          />
          <Input
            textarea={true}
            label="Content"
            value={content}
            onChangeText={(content) => this.setState({ content })}
          />
          <Pilihan
            label="Status"
            selectedValue={status}
            onValueChange={(status) => this.ubahStatus(status)}
          />
          <View style={styles.categoryContainer}>
            <Pilihan
              label="Category"
              selectedValue={category}
              datas={categoryUser}
              width={200}
              onValueChange={(selectedCategory) => this.setState({ category: selectedCategory })}
            />
            <Button type="text" title="Add" padding={10} onPress={this.toggleModal} fontSize={14} />
          </View>
          <Button
            type="text"
            title="Save"
            padding={10}
            onPress={() => { this.onAddNote() }}
          />
        </View>

        <Modal
          isVisible={isModalVisible}
          style={styles.modal} // Menentukan gaya modal
          onBackdropPress={this.toggleModal} // Menutup modal saat area di luar modal diklik
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Category</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Category Name"
              value={newCategory}
              onChangeText={(text) => this.setState({ newCategory: text })}
            />
            <TouchableOpacity style={styles.modalButton} onPress={() => this.handleAddCategory(newCategory)}>
              <Text style={styles.modalButtonText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={this.toggleModal}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Modal>

      </SafeAreaView>
    )
  }
}

export default Add

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f4f4f4', // Light grey background
    justifyContent: 'center',
  },
  container: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 30,
    marginHorizontal: 20
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
  },
  modalButton: {
    backgroundColor: 'dodgerblue',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
