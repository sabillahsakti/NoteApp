import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

const CategoryTab = ({padding, title, onPress, fontSize}) => {
  return (
    <TouchableOpacity style={styles.container(padding)} onPress={onPress} >
      <Text style={styles.text(fontSize)}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CategoryTab

const styles = StyleSheet.create({
  container:(padding)=>({
      backgroundColor : 'blue',
      padding: padding,
      borderRadius: '50%',
      width:100,
      marginRight: 5
  }),
  text: (fontSize) => ({
      color : 'white',
      textAlign: 'center',
      fontSize: fontSize ? fontSize : 13,
  })
})