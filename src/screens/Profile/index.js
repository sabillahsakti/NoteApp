import React, { Component } from 'react'
import { StyleSheet, View, Text, Image } from "react-native";
import { Button } from '../../components'
import { clearStorage, getData } from '../../utils';
import FIREBASE from '../../config/FIREBASE';



export class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      profile: false,
    }
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getUserData();
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  getUserData = () => {
    getData('user')
      .then(res => {
        const data = res;
        if (data) {
          console.log("isi data", data);
          this.setState({
            profile: data
          })
        } else {
          // this.props.navigation.replace('Login')
        }
      })
  }
  onSubmit = (profile) => {
    if (profile) {
      FIREBASE.auth().signOut().then(() => {
        // Sign-out successful.
        clearStorage();
        this.props.navigation.replace('MainApp')
      }).catch((error) => {
        // An error happened.
        alert(error)
      });
    } else {
      this.props.navigation.replace("Login")
    }
  }
  render() {
    const { profile } = this.state
    return (
      <View style={styles.page}>
        <View style={styles.container}>
          <Image source={require('../../assets/images/avatar.png')} style={styles.foto} />
          <Text style={styles.nama}>{profile.nama}</Text>
          <View style={styles.profile}>
            <Text style={styles.boldTextBlack}>Data Diri</Text>
            <View>
              <Text style={styles.titleDD}>Email</Text>
              <Text style={styles.valueDD}>{profile.email}</Text>
            </View>
            <View>
              <Text style={styles.titleDD}>No HP</Text>
              <Text style={styles.valueDD}>{profile.nohp}</Text>
            </View>
            <View>
              <Button
                type="text"
                title={profile ? "Logout" : "Login"}
                padding={13}
                onPress={() => this.onSubmit(profile)}
              />
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default Profile

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
  },
  page: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center'
  },
  foto: {
    width: 150,
    height: 150,
    borderRadius: 40,
    alignSelf: 'center',

  },
  profile: {
    marginTop: 10,
    backgroundColor: 'white',
    height: 200,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    marginHorizontal: 10,
    borderRadius: 20,
    padding: 20,
    justifyContent: 'space-between'
  },
  nama: {
    fontSize: 24,
    alignSelf: 'center'
  },
  deskripsi: {
    fontSize: 18,
  },
  boldTextBlack: {
    color: 'black',
    fontSize: 20,
  },
  titleDD: {
    color: 'grey',
    fontSize: 14
  },
  valueDD: {
    fontSize: 14
  }
})