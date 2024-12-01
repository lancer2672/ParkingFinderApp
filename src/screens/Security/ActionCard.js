import * as React from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";

export const ActionCard = ({ icon, title, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.card, style]} onPress={onPress}>
      <Image
        resizeMode="contain"
        source={icon} // Directly use the icon prop
        style={styles.icon}
        accessibilityRole="image"
      />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  icon: {
    width: 40,
    height: 40,
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default ActionCard;