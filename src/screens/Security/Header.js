import * as React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.statusBar}>
        </View>
      <View style={styles.navigationBar}>

        <View style={styles.titleContainer}>
          <View style={styles.titleText}>
            <Text style={styles.title}>Incoming Rides</Text>
          </View>
          <Image
            resizeMode="contain"
            source={{ uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/887198a4c98ed7e4971570b4db9633c58b6593b8460a467db93063c276641aba?placeholderIfAbsent=true&apiKey=e90d4f59aba64d23b82258821f450ccc" }}
            style={styles.titleIcon}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    display: "flex",
    flexDirection: "column",
    paddingVertical: 0, 
    backgroundColor: "#f8f8f8", 
  },
  statusBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 5, 
    fontFamily: "SF Pro Text, sans-serif",
    fontSize: 15,
    color: "rgba(0, 0, 0, 1)",
    fontWeight: "600",
    textAlign: "center",
    letterSpacing: -0.24,
    lineHeight: 1,
  },

  statusIcon: {
    width: 14,
    aspectRatio: 1,
  },
  menuIcon: {
    marginTop: 43,
    width: 25,
    aspectRatio: 1.14,
  },
  navigationBar: {
    flexDirection: "column",
    alignItems: "stretch",
    marginTop: 20, // Adjust margin as needed
  },
  iconGroup: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 5, // Adjust padding as needed
  },
  navIcon: {
    width: 21,
    aspectRatio: 1.5,
  },
  titleContainer: {
    marginTop: 42,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // Center the title text
    fontFamily: "Open Sans, sans-serif",
    fontSize: 18,
    color: "rgba(59, 65, 75, 1)",
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: 0.1,
    lineHeight: 1,
  },
  titleText: {
    marginTop: "auto",
    marginBottom: "auto",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "rgba(59, 65, 75, 1)",
  },
  titleIcon: {
    width: 32,
    aspectRatio: 1,
    marginLeft: 20  , 
  },
});