import React, { Component } from 'react'
import { SafeAreaView, StyleSheet, View, Alert, Text } from 'react-native'
import { Button, Input, Pilihan } from '../../components'
import { editNote, getNote } from '../../actions/AuthAction';

export class EditNote extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: props.route.params.judul,
      content: props.route.params.isi,
      category: props.route.params.category,
      status: props.route.params.status,
      noteId: props.route.params.noteId,
      categoryUser: []
    };
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

  onEditNote = async () => {
    const { title, content, status, category, noteId } = this.state

    if (title && content && status && category) {
      const data = {
        title: title,
        content: content,
        status: status,
        category: category
      }

      console.log(data)
      try {
        const user = await editNote(noteId, data);
        this.props.navigation.replace('MainApp');
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    } else {
      Alert.alert('Error', 'Data tidak lengkap');
    }
  }

  render() {
    const { title, content, status, category, categoryUser } = this.state;
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
        <Text style={styles.title}>Edit Note</Text>
          <Input
            label="Title"
            value={title}
            onChangeText={(title) => this.setState({ title })}
            style={styles.input}
          />
          <Input
            textarea={true}
            label="Content"
            value={content}
            onChangeText={(content) => this.setState({ content })}
            style={styles.textarea}
          />
          <Pilihan
            label="Status"
            selectedValue={status}
            onValueChange={(status) => this.setState({ status })}
            style={styles.picker}
          />
          <Pilihan
            label="Category"
            selectedValue={category}
            datas={categoryUser}
            onValueChange={(category) => this.setState({ category })}
            style={styles.picker}
          />
          <Button
            title="Update"
            padding={10}
            onPress={() => { this.onEditNote() }}
            color="#007AFF" // iOS blue button color
            style={styles.button}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default EditNote

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  container: {
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
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  textarea: {
    height: 100, // larger area for content
    textAlignVertical: 'top', // align text at the top
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  picker: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
},
});