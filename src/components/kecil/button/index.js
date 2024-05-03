import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../../../utils'


const Button = ({padding, title, onPress, fontSize}) => {
    return (
        <TouchableOpacity style={styles.container(padding)} onPress={onPress} >
            <Text style={styles.text(fontSize)}>{title}</Text>
        </TouchableOpacity>
    )
}

export default Button
 
const styles = StyleSheet.create({
    container:(padding)=>({
        backgroundColor : colors.primary,
        padding: padding,
        borderRadius: 5,
        marginTop: 7
    }),
    text: (fontSize) => ({
        color : 'white',
        textAlign: 'center',
        fontSize: fontSize ? fontSize : 13,
    })
})