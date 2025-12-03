import { getChipColor } from "@/helpers/getChipColors";
import { fonts } from "@/hooks/useCacheResource";
import { GenreItemDto } from "@/services/movies/query/types";
import { StyleSheet, Text, View } from "react-native";


export const GenreChips=({genre}:{genre:GenreItemDto})=>{
    const color=getChipColor(genre.name);
    return(
        <View  style={[style.chip,{
            backgroundColor:color,
        }]}>
        <Text style={style.chipText}>{genre.name}</Text>
                       </View>
    )
}

const style=StyleSheet.create({
    chip:{
        borderRadius:30,
        paddingHorizontal:10,
        paddingVertical:5,
    },
    chipText:{
        color:'#fff',
        fontSize:12,
        fontFamily:fonts.poppins.semibold,
    }
})