import * as React from "react";
import { View, StyleSheet, Image, Text } from "react-native";

export function StatusBar() {
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Image
          resizeMode="contain"
          source={{ uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/11b09c84733c2e0a9e04ad18e914ea6d63be91b886137ca328178ed1b5bc2f6e?placeholderIfAbsent=true&apiKey=e90d4f59aba64d23b82258821f450ccc" }}
          style={styles.signalIcon}
        />
      </View>
      <Image
        resizeMode="contain"
        source={{ uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/a03a0e774d6eefe436ecf77bc61185b6d51cc790578c442cfefa662f7af302d3?placeholderIfAbsent=true&apiKey=e90d4f59aba64d23b82258821f450ccc" }}
        style={styles.menuIcon}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    fontFamily: "SF Pro Text, sans-serif",
    fontSize: 15,
    color: "rgba(0, 0, 0, 1)",
    fontWeight: "600",
    textAlign: "center",
    letterSpacing: -0.24,
    lineHeight: 15,
  },
  topBar: {
    display: "flex",
    alignItems: "stretch",
    gap: 2,
  },
  timeContainer: {
    flexGrow: 1,
  },
  timeText: {
    fontSize: 15,
    fontWeight: "600",
  },
  signalIcon: {
    position: "relative",
    display: "flex",
    marginTop: "auto",
    marginBottom: "auto",
    width: 14,
    flexShrink: 0,
    aspectRatio: 1,
  },
  menuIcon: {
    position: "relative",
    display: "flex",
    marginTop: 43,
    width: 25,
    aspectRatio: 1.14,
  },
});