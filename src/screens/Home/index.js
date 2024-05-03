import React, { Component } from 'react'
import { Text, View, StyleSheet, SafeAreaView } from 'react-native'
import { CategoryTab, ListNote } from '../../components'
import { getNote } from '../../actions/AuthAction';

export class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userNotes: [],
      category:[],
      selectedCategory: []
    };
  }

  async componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', async () => {
      const notes = await getNote();
      const categories = notes.map((note) => note.category);
      const uniqueCategories = categories.filter((value, index, self) => {
        return self.indexOf(value) === index;
      });
      this.setState({ 
        userNotes: notes,
        category: uniqueCategories
      });
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  onCategoryPress = (sselectedCategory) => {
    this.setState({
      selectedCategory: sselectedCategory
    })
  };

  render() {
    const { userNotes, category, selectedCategory } = this.state
    const filteredNotes = selectedCategory
    ? userNotes.filter((note) => note.category === selectedCategory)
    : userNotes;
    return (
      <SafeAreaView>
        <View style={styles.page}>
          <View style={styles.category}>
            {category.map((note, index) => (
              <CategoryTab
                key={index}
                title={note}
                padding={20}
                onPress={() => this.onCategoryPress(note)}
              />
            ))}
          </View>
          <View style={styles.todo}>
            {filteredNotes.map((note, index) => (
              <ListNote
                key={index}
                judul={note.title}
                isi={note.content}
                tanggal="tanggal"
                status={note.status}
                category={note.category}
                noteId={note.noteId}
              />
            ))}
          </View>
        </View>
      </SafeAreaView>
    )
  }
}

export default Home

const styles = StyleSheet.create({
  page: {
    marginHorizontal: 20
  },
  category: {
    flexDirection: 'row',
    marginBottom: 30
  }
})