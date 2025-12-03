import { fonts } from "@/hooks/useCacheResource";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";




const SeatingScreen: React.FC = () => {








  return (
    <SafeAreaView edges={['top','bottom']} style={styles.container}>


  

<Text>Coming soon</Text>


        

  
    </SafeAreaView>
  );
};

export default SeatingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom:25
  },
  screenWrapper: {
    alignItems: "center",
    marginBottom: 24,
  },
  screen: {
    width: "80%",
    height: 18,
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    backgroundColor: "#61C3F2",
    opacity: 0.3,
  },
  screenText: {

    color: "#202C43",
    fontSize: 12,
    textAlign:'center'
  },
  headerTitle:{
    fontSize:16,
    fontFamily:fonts.poppins.medium,
    lineHeight:22,
  },
  headerSubtitle:{
    color:'#61C3F2',fontSize:12,lineHeight:17, fontFamily:fonts.poppins.regular
  },
  gridWrapper: {
    // paddingBottom: 24,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  rowLabel: {
    width: 20,
    color: "#202C43",
    fontSize: 10,
    textAlign: "center",
  },
  rowSeats: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
  },
  seatPressable: {
    marginHorizontal: 3,
  },

  footer: {
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
    marginTop: "auto",
  },
  legendRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 8,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
    marginBottom: 4,
  },
  legendText: {
    marginLeft: 4,
    color: "#202C43",
    fontSize: 11,
  },
  footerText: {
    color: "#202C43",
    fontSize: 12,
  },
  rowSeatingWrap:{
    flexDirection:'row',justifyContent:'space-between',
    marginVertical:12,
  },
  rowSeat:{
    flexDirection:'row',
    alignItems:'center',
    gap:10,
    flex:1,

  },
  seatingTitle:{
    fontSize:12,
    lineHeight:18,
    fontFamily:fonts.poppins.medium,
  }
});
