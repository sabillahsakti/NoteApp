import React, { Component } from 'react';
import { Alert, StyleSheet, View, Text, TextInput } from 'react-native';
import { Input, Button, CustomModal } from "../../components";
import { loginUser } from '../../actions/AuthAction';
import { IconLogo } from '../../assets';

export default class Login extends Component {
    state = {
        email: '',
        password: '',
        isModalVisible: false
    };

    login = () => {
        const { email, password } = this.state;
        if (!email || !password) {
            Alert.alert('Error', 'Please enter both email and password');
            return;
        }
        loginUser(email, password)
            .then((user) => {
                this.setState({ isModalVisible: true });
            })
            .catch((error) => {
                Alert.alert('Error', error.message);
            });
    };

    handleModalClose = () => {
        console.log("Modal is now closing...");
        this.setModalVisible(false, this.navigateToMainApp);
    };

    setModalVisible = (visible, callback) => {
        this.setState({ isModalVisible: visible }, callback);
    };

    navigateToMainApp = () => {
        console.log("Navigating to MainApp...");
        try {
            this.props.navigation.replace("MainApp");
        } catch (error) {
            console.error("Failed to navigate to MainApp:", error);
        }
    };


    render() {
        const { email, password, isModalVisible } = this.state;
        return (
            <View style={styles.pages}>
                <View style={styles.logo}>
                    <IconLogo />
                </View>
                <View style={styles.cardLogin}>
                    <Text style={styles.label}>Login</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(email) => this.setState({ email })}
                        value={email}
                        placeholder="Enter your email"
                    />
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={styles.input}
                        secureTextEntry
                        onChangeText={(password) => this.setState({ password })}
                        value={password}
                        placeholder="Enter your password"
                    />
                    <View style={styles.buttonContainer}>
                        <Button
                            title="Login"
                            padding={12}
                            onPress={this.login}
                        />
                        <Button
                            title="Register"
                            padding={12}
                            onPress={() => this.props.navigation.navigate("Register")}
                        />
                    </View>
                </View>

                <CustomModal
                    visible={isModalVisible}
                    onClose={this.handleModalClose}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    pages: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        padding: 20,
    },
    logo: {
        alignItems: 'center',
    },
    cardLogin: {
        margin: 20,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    input: {
        height: 40,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 5,
    },
    label: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    }
});
