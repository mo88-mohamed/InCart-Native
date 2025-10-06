import { useThemeColor } from '@/hooks/use-theme-color';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';



export default function Top() {

    const tint = useThemeColor({},'tint');
    const textColo = useThemeColor({},"text");
    const router = useRouter();
    const {t} = useTranslation();
  return (
    <View style={[styles.container]}>
      <TouchableOpacity style={[styles.button,styles.searchbutton]} onPress={()=>router.navigate('/search')}>
      <FontAwesome style={[styles.searchicon]} name='search' size={30} color={tint} />
        
        {/* <FontAwesome name='angle-left' size={30} color={tint} /> */}
        <Text style={[{color:textColo,flex:1}]}>
            {t('search')}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button,styles.favbutton]} onPress={()=>router.navigate('/favorites')}>
        <FontAwesome name='heart-o' size={30} color={tint}/>
      </TouchableOpacity>
    </View>
  )
}


const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        margin:10,
        marginTop:50,
        gap:10
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
        width:"80%",

    },
    searchicon:{
        flex:0
    },
    favbutton:{

    }

});