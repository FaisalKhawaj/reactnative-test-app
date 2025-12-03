import { CloseIcon, SearchIcon } from "@/assets/icons";
import { fonts } from "@/hooks/useCacheResource";
import React from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";


type MovieSearchbarProps = {
  value: string;
  onChangeText: (text: string) => void;
};
// Controlled component here 
export const MovieSearchbar: React.FC<MovieSearchbarProps> = ({
  value,
  onChangeText,
}) => {
  return (
    <View style={style.mainWrap}>
        {/* Custom icon here : pros , dynamically pass width, heightt ,colors */}
      <SearchIcon />

      <TextInput
        placeholder="TV shows, movies"
        style={style.inputStyle}
        value={value}                  
        onChangeText={onChangeText}
        placeholderTextColor={"#bfbec5"}
      />

      {value?.length > 0 && (            // 👈 show clear only if something typed
        <Pressable onPress={() => onChangeText("")}>
          <CloseIcon />
        </Pressable>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  mainWrap: {
    backgroundColor: "#EFEFEF",
    borderRadius: 35,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
    gap: 10,
  },
  inputStyle: {
    flex: 1,
    color: "#bfbec5",
    fontFamily: fonts.poppins.medium,
    fontSize: 14,
  },
});
