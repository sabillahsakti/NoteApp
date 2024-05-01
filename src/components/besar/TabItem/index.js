import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { IconHome,
    IconHomeActive,
    IconProfile,
    IconProfileActive,
    IconAdd,
    IconAddActive } from '../../../assets'

const TabItem = ({ isFocused, onPress, onLongPress, label }) => {
    const Icon = () => {
        if (label === "Home") {
            return isFocused ? <IconHomeActive /> : <IconHome />
        }
        if (label === "Add") {
            return isFocused ? <IconAddActive /> : <IconAdd />
        }
        if (label === "Profile") {
            return isFocused ? <IconProfileActive /> : <IconProfile />
        }
        return <IconHome />
    }
    return (
        <TouchableOpacity
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.container}
        >
            <Icon />
            <Text style={styles.text(isFocused)}>{label}</Text>
        </TouchableOpacity>
    )
}

export default TabItem

const styles = StyleSheet.create({
    container : {
        alignItems : 'center'
    },
    text : (isFocused) => ({
        color: isFocused ? 'white' : 'grey',
        fontSize : 11,
        marginTop: 4
    })
})