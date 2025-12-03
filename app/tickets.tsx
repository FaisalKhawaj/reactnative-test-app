import { BackIcon, SeatIcon } from "@/assets/icons";
import { fonts } from "@/hooks/useCacheResource";
import { router } from "expo-router";
import React, { useCallback, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type SeatKind = "regular" | "vip" | "unavailable";

type Seat = {
  id: string;
  row: number;
  col: number;
  kind: SeatKind;
  selected: boolean;
};

type Row = {
  rowNumber: number;
  seats: Seat[];
};

/**
 * Deterministic layout:
 * - Rows 3–5 => VIP
 * - Some seats in multiple rows => "unavailable" (grey)
 */
const createRows = (rowCount: number, seatsPerRow: number): Row[] => {
  const rows: Row[] = [];

  for (let r = 0; r < rowCount; r++) {
    const seats: Seat[] = [];

    for (let c = 0; c < seatsPerRow; c++) {
      let kind: SeatKind = "regular";

      // VIP block in the middle rows
      if (r >= 2 && r <= 4) {
        kind = "vip";
      }

      // Mark some specific seats as unavailable (visible pattern instead of random)
      const isUnavailable =
        // first row: 4 seats in the middle
        (r === 0 && (c === 5 || c === 6 || c === 7 || c === 8)) ||
        // second row: 2 seats
        (r === 1 && (c === 3 || c === 10)) ||
        // one in a VIP row
        (r === 3 && (c === 2 || c === 11)) ||
        // bottom row: edges unavailable
        (r === rowCount - 1 && (c === 0 || c === seatsPerRow - 1));

      if (isUnavailable) {
        kind = "unavailable";
      }

      seats.push({
        id: `R${r + 1}-C${c + 1}`,
        row: r,
        col: c,
        kind,
        selected: false,
      });
    }

    rows.push({ rowNumber: r + 1, seats });
  }

  return rows;
};

export default function BookTickets()  {
  const [rows, setRows] = useState<Row[]>(() => createRows(10, 14));


  const toggleSeat = useCallback((seatId: string) => {
    setRows((prev) =>
      prev.map((row) => ({
        ...row,
        seats: row.seats.map((seat) => {
          if (seat.id !== seatId) return seat;
          if (seat.kind === "unavailable") return seat;
          return { ...seat, selected: !seat.selected };
        }),
      }))
    );
  }, []);

  const getSeatColorAndOpacity = (seat: Seat) => {
    if (seat.selected) {
      return { color: "#CD9D0F", opacity: 1 }; // selected
    }

    switch (seat.kind) {
      case "unavailable":
        return { color: "#A6A6A6", opacity: 0.5 };
      case "vip":
        return { color: "#564CA3", opacity: 1 };
      case "regular":
      default:
        return { color: "#61C3F2", opacity: 1 };
    }
  };

  return (
    <SafeAreaView edges={['top','bottom']} style={styles.container}>

<View style={{flexDirection:'row',alignItems:'center'}}>
<Pressable onPress={()=>router.back()}>
  <BackIcon color={'#000'} />
</Pressable>
<View style={{flex:1,alignItems:'center'}}>
  <Text style={styles.headerTitle}>The King's Man</Text>
  <Text style={styles.headerSubtitle}>
  In theaters december 22, 2021
  </Text>
</View>
</View>

<View style={{marginTop:40}} />
        <Text style={styles.screenText}>SCREEN</Text>
   <View style={{marginTop:10}} />

      {/* Seats grid */}
      <ScrollView
        contentContainerStyle={styles.gridWrapper}
        showsVerticalScrollIndicator={false}
      >
        {rows.map((row) => (
          <View key={row.rowNumber} style={styles.row}>
            <Text style={styles.rowLabel}>{row.rowNumber}</Text>

            <View style={styles.rowSeats}>
              {row.seats.map((seat) => {
                const { color, opacity } = getSeatColorAndOpacity(seat);
                return (
                  <Pressable
                    key={seat.id}
                    onPress={() => toggleSeat(seat.id)}
                    disabled={seat.kind === "unavailable"}
                    style={styles.seatPressable}
                    hitSlop={8}
                  >
                    <SeatIcon color={color} opacity={opacity} size={18} />
                  </Pressable>
                );
              })}
            </View>
          </View>
        ))}
      </ScrollView>


      <View style={styles.rowSeatingWrap}>
<View style={styles.rowSeat}>
<SeatIcon color="#CD9D0F" />
<Text style={styles.seatingTitle}>Selected</Text>
</View>

<View style={styles.rowSeat}>
<SeatIcon color="#A6A6A6" opacity={0.5} />
<Text style={styles.seatingTitle}>Not available</Text>
</View>
        </View>

        <View style={styles.rowSeatingWrap}>
<View style={styles.rowSeat}>
<SeatIcon color="#564CA3" />
<Text style={styles.seatingTitle}>VIP (150$)</Text>
</View>

<View style={styles.rowSeat}>

<SeatIcon color="#61C3F2" />
<Text style={styles.seatingTitle}>Regular ($50)</Text>
</View>
        </View>


        

  
    </SafeAreaView>
  );
};


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
