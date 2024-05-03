import React, { Component } from 'react'
import { View, StyleSheet, Alert, Text } from 'react-native'
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
        const { nama, email, nohp, password } = this.state;
        return (
            <View style={styles.page}>
                <View style={styles.card}>
                    <Text style={styles.title}>Register</Text>
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
                        padding={10}
                        onPress={() => { this.onRegister() }}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        padding: 20,
    },
    card: {
        margin: 20,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
});

export default Register;