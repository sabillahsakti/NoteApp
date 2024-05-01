import React, { Component } from 'react'
import { SafeAreaView, StyleSheet, View, Alert } from 'react-native'
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
    const { title, content, status, category, categoryUser } = this.state
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
          <Pilihan
            label="Category"
            selectedValue={category}
            datas={categoryUser}
            onValueChange={(category) => this.setState({
              category: category,
            })}
          />
          <Button
            type="text"
            title="Update"
            padding={10}
            onPress={() => { this.onEditNote() }}
          />
        </View>
      </SafeAreaView>
    )
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
    padding: 20, // Mengurangi padding agar lebih kompak
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 30,
    marginHorizontal: 20
  }
})