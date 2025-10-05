
import { useThemeColor } from '@/hooks/use-theme-color';
import { FontAwesome } from '@expo/vector-icons';
import { goBack } from 'expo-router/build/global-state/routing';
import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

export default function SearchInput() {

    const tint = useThemeColor({},"tint");
    const textColo = useThemeColor({},"text");
    const [query,setQuery] = useState<string>();
  return (
    <View style={[styles.container,styles.button]}>
      <FontAwesome name='angle-left' size={30} color={tint} onPress={goBack}  />

      <TextInput style={{flex:1,color:"textColo"}} placeholder='Search' value={query} onChangeText={setQuery} returnKeyType='send'/>
      <FontAwesome style={[styles.searchicon]} name='search' size={30} color={tint} />

    </View>
  )
};

const styles = StyleSheet.create({
    container:{
        // flexDirection:"row",
        // margin:10,
        // marginTop:50,
        // gap:10

    },
    button:{
        padding:10,
        display:"flex",
        flexDirection:"row",
        gap:10,
        alignItems:'center',
        borderWidth:1,
        borderColor:"#ccc",
        borderRadius:15

    },
    searchbutton:{
        width:"100%",
        margin:10

    },
    searchicon:{
        flex:0
    },
    favbutton:{

    }

});