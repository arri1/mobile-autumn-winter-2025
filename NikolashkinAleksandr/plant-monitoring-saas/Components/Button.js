import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";

export default function Button({ text, tuk, styl, textStyle }) {
  return (
    <View>
      <TouchableOpacity onPress={tuk} style={[styles.button, styl]}>
        <Text style={textStyle}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "60%",
    height: 40,
    marginVertical: 5,
    marginLeft: "20%",
    borderRadius: 20,
  },
});
