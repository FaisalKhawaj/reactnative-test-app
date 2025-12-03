import { SearchIcon } from "@/assets/icons"
import { fonts } from "@/hooks/useCacheResource"
import { StyleSheet, TextInput, View } from "react-native"


export const MovieSearchbar=()=>{
    return(
        <View style={style.mainWrap}>
            <SearchIcon />
            <TextInput placeholder="TV shows,movies"
            style={style.inputStyle}
            placeholderTextColor={'#bfbec5'}
            />
        </View>
    )
}

const style=StyleSheet.create({
    mainWrap:{
        backgroundColor:'#EFEFEF',
        borderRadius:20,
        padding:15,
        flexDirection:'row',
        alignItems:'center',
        margin:10,
        gap:10,
    },
    inputStyle:{
        flex:1,
                color:'#bfbec5',
                fontFamily:fonts.poppins.medium,
                fontSize:14,
    }
})