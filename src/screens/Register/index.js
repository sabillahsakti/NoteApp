import React, { Component } from 'react'
import { View, StyleSheet, Alert } from 'react-native'
import { Input, Button } from '../../components'
import { registerUser } from '../../actions/AuthAction'

export class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            nama: '',
            nohp: '',
            email: '',
            password: ''
        }
    }


    onRegister = async () => {
        const { nama, email, nohp, password } = this.state;

        if (nama && email && nohp && password) {
            const data = {
                nama: nama,
                email: email,
                nohp: nohp,
                status: 'user',
            };

            console.log(data)

            try {
                const user = await registerUser(data, password);
                this.props.navigation.replace('MainApp');
            } catch (error) {
                Alert.alert('Error', error.message);
            }
        } else {
            Alert.alert('Error', 'Data tidak lengkap');
        }
    }
    render() {
        const { nama, email, nohp, password } = this.state
        return (
            <View style={styles.page}>
                <View style={styles.card}>
                    <Input
                        label="Nama"
                        value={nama}
                        onChangeText={(nama) => this.setState({ nama })}
                    />
                    <Input
                        label="Email"
                        value={email}
                        onChangeText={(email) => this.setState({ email })}
                    />
                    <Input
                        label="No. Handphone"
                        keyboardType="number-pad"
                        value={nohp}
                        onChangeText={(nohp) => this.setState({ nohp })}
                    />
                    <Input
                        label="Password"
                        secureTextEntry
                        value={password}
                        onChangeText={(password) => this.setState({ password })}
                    />
                    <Button
                        title="Register"
                        type="text"
                        icon="submit"
                        padding={10}
                        fontSize={18}
                        onPress={() => { this.onRegister() }}
                    />
                </View>
            </View>
        )
    }
}

export default Register

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center'
    },
    card: {
        marginHorizontal: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        backgroundColor: 'white',
        paddingHorizontal: 30,
        paddingBottom: 20,
        paddingTop: 10,
        borderRadius: 10,
        marginTop: 10
    },
})