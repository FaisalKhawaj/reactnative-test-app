import { fonts } from "@/hooks/useCacheResource"
import { Pressable, StyleSheet, Text } from "react-native"
import { LazyImage } from "./LazyImage"


export const WatchListItem=({item}:any)=>{
    return(
        <Pressable style={{flex:1}}>
    <LazyImage uri={item.image} 
    height={100} width={'100%'} borderRadius={10}
    />
    <Text style={style.textStyle}>{item?.name}</Text>
</Pressable>
    )
}

const style=StyleSheet.create({
    textStyle:{
        fontSize:16,
        fontFamily:fonts.poppins.medium,
        lineHeight:20,
        position:'absolute',
        bottom:10,left:10,
        color:'#fff'
    }
})