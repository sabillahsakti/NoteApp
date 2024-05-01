import React, { Component } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Input, Button, CustomModal } from "../../components";
import { loginUser } from '../../actions/AuthAction';

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
                <View style={styles.cardLogin}>
                    <Input
                        label="Login"
                        onChangeText={email => this.setState({ email })}
                        value={email}
                    />
                    <Input
                        label="Password"
                        secureTextEntry
                        onChangeText={password => this.setState({ password })}
                        value={password}
                    />
                    <View style={{ alignItems: 'column' }}>
                        <Button
                            title="Login"
                            type="text"
                            padding={12}
                            fontSize={18}
                            onPress={this.login}
                        />
                        <Button
                            title="Register"
                            type="text"
                            padding={12}
                            fontSize={18}
                            onPress={() => this.props.navigation.navigate("Register")}
                        />
                    </View>
                </View>
                <Button
    title="Test Navigate to MainApp"
    onPress={this.navigateToMainApp}
/>

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
        justifyContent: 'center'
    },
    cardLogin: {
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
        padding: 30,
        borderRadius: 10,
        marginTop: 10,
    }
});
