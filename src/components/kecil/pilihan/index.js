import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Picker } from '@react-native-picker/picker';

const Pilihan = ({ label, datas, width, height, fontSize, selectedValue, onValueChange }) => {

    if (label === "Status") {
        return (
            <View style={styles.container}>
                <Text style={styles.label(fontSize)}>{label} :</Text>
                <View style={styles.wrapperPicker}>
                    <Picker
                        selectedValue={selectedValue}
                        itemStyle={styles.picker(width, height, fontSize)}
                        onValueChange={onValueChange}
                    >
                        <Picker.Item label="-- Pilih --" value="" />
                        <Picker.Item label="Progress" value="progress" />
                        <Picker.Item label="Done" value="done" />
                    </Picker>
                </View>
            </View>
        )
    } else if (label === "Category") {
        return (
            <View style={styles.container}>
                <Text style={styles.label(fontSize)}>{label} :</Text>
                <View style={styles.wrapperPicker}>
                    <Picker
                        selectedValue={selectedValue}
                        itemStyle={styles.picker(width, height, fontSize)}
                        onValueChange={onValueChange}
                    >
                        <Picker.Item label="-- Pilih --" value="" />
                        {datas.map((data, index) => (
                            <Picker.Item key={index} label={data} value={data} />
                        ))}
                    </Picker>
                </View>
            </View>
        )
    }
}

export default Pilihan

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    },

    label: (fontSize) => ({
        fontSize: fontSize ? fontSize : 18,
    }),
    picker: (width, height, fontSize) => ({
        fontSize: fontSize ? fontSize : 18,
        width: width,
        height: height ? height : 46,
        color: 'black'
    }),
    wrapperPicker: {
        borderWidth: 1,
        borderRadius: 5,
    }
})