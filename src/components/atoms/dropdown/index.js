import { SelectList } from 'react-native-dropdown-select-list'
import { View, StyleSheet, Text } from 'react-native'
import React from 'react'

export default function Dropdown() {
    const [category, setCategory] = React.useState("")
    const categories = [
      { key: 'D', value: 'Supervisor' },
      { key: 'S', value: 'Student' },
      { key: 'F', value: 'Student Finance' },
    ]
  
    // Callback yang akan dijalankan saat dropdown dipilih
    const handleCategoryChange = (selectedCategory) => {
        setCategory(selectedCategory)
    }
  
    return (    
        <View style={style.container}>
            <View style={style.inputcontainer}>
                <SelectList
                    setSelected={handleCategoryChange}
                    data={categories}
                    placeholder={"Status"} 
                    style={style.textinput}
                />
            </View> 
            {/* <Text>Category Selected: {category}</Text> */}
        </View>
    )
}

const style = StyleSheet.create({
    container: { marginBottom: 10, alignItems: 'center' },
    inputcontainer: {
        paddingHorizontal: 0, 
        borderRadius: 10,
        width: 280,
        backgroundColor: 'black',
        marginBottom: 15,
    },
    textinput: { marginLeft: 10, flex: 1 },
})
