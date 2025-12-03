import { MovieSearchbar } from "@/components/ui/movie-search-bar";
import { globalStyles } from "@/styles/globalStyles";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Watch() {
    return(
        <SafeAreaView
        edges={['top', 'bottom',]}
        style={globalStyles.screenWrap}>



<MovieSearchbar />
        </SafeAreaView>
    )
}