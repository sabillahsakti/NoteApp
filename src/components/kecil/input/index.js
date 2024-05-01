import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import { Picker } from '@react-native-picker/picker'; // Import Picker from @react-native-picker/picker

const Input = ({ dropdown, textarea, width, height, fontSize, label, value, secureTextEntry, keyboardType, onChangeText, disabled }) => {
    if (textarea) {
        return (
            <View style={styles.container}>
                <Text style={styles.label(fontSize)}>{label} :</Text>
                <TextInput
                    style={styles.inputTextArea(fontSize)}
                    multiline={true}
                    numberOfLines={4}
                    value={value}
                    onChangeText={onChangeText}
                    editable={disabled ? false : true}
                />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label(fontSize)}>{label} :</Text>
            <TextInput style={styles.input(width, height, fontSize)}
                value={value} secureTextEntry={secureTextEntry} keyboardType={keyboardType}
                onChangeText={onChangeText} editable={disabled ? false : true} />
        </View>
    )
}

export default Input

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    },

    label: (fontSize) => ({
        fontSize: fontSize ? fontSize : 18,
    }),
    input: (width, height, fontSize) => ({
        fontSize: fontSize ? fontSize : 18,
        width: width,
        height: height,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'black',
        paddingVertical: 5,
        paddingHorizontal: 10,
    }),
    inputTextArea: (fontSize) => ({
        fontSize: fontSize ? fontSize : 18,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'black',
        paddingVertical: 5,
        paddingHorizontal: 10,
        textAlignVertical: 'top',
        height: 100,
    }),
    dropdown: {
        fontSize: 16, // Ukuran teks yang lebih kecil
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'black',
        paddingVertical: 5,
        paddingHorizontal: 10,
        height: 40,
    }
})
