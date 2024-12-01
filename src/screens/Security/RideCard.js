import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

export const RideCard = ({ name, space, uniqueId, checkInTime, checkOutTime, specifications }) => {
  return (
    <View style={styles.rideCardContainer}>
      <View style={styles.headerSection}>
        <View style={styles.userInfoContainer}>
          <Text style={styles.userName}>{name}</Text>
          <Text style={styles.spaceInfo}>{space}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.uniqueIdContainer}>
          <Text style={styles.uniqueIdText}>Unique ID: {uniqueId}</Text>
        </View>
      </View>
      <View style={styles.timeSection}>
        <View style={styles.timeLabels}>
          <View>
            <Text style={styles.timeLabel}>Check-in Time: {checkInTime}</Text>
          </View>
          <View style={styles.checkoutContainer}>
            <Text style={styles.timeLabel}>Check-out Time (Est):{checkOutTime}</Text>
          </View>
          <View style={styles.specContainer}>
            <Text style={styles.timeLabel}>Specifications: {specifications}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rideCardContainer: {
    borderRadius: 6,
    width: "100%",
    paddingTop: 27,
    paddingBottom: 16,
    flexDirection: "column",
    alignItems: "stretch",
    fontFamily: "Open Sans, sans-serif",
    fontSize: 16,
    letterSpacing: 0.1,
  },
  headerSection: {
    width: "100%",
    paddingHorizontal: 15,
    flexDirection: "column",
    alignItems: "stretch",
  },
  userInfoContainer: {
    display: "flex",
    alignItems: "stretch",
    marginVertical: 20, // Use margin to create space between elements
    fontWeight: "600",
  },
  userName: {
    color: "rgba(59, 65, 75, 1)",
    fontWeight: "600",
  },
  spaceInfo: {
    color: "rgba(117, 127, 140, 1)",
    fontWeight: "600",
  },
  divider: {
    borderColor: "rgba(166, 170, 180, 0.6)",
    borderStyle: "solid",
    borderWidth: 1,
    marginTop: 4,
    height: 1,
  },
  uniqueIdContainer: {
    alignSelf: "center",
    marginTop: 14,
  },
  uniqueIdText: {
    color: "rgba(97, 62, 234, 1)",
    fontWeight: "400",
    textAlign: "center",
  },
  timeSection: {
    alignSelf: "center",
    display: "flex",
    marginTop: 13,
    width: "100%",
    maxWidth: 304,
    alignItems: "stretch",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  timeLabels: {
    flexDirection: "column",
    color: "rgba(117, 127, 140, 1)",
    fontWeight: "400",
  },
  timeLabel: {
    color: "rgba(117, 127, 140, 1)",
    fontWeight: "400",
  },
  checkoutContainer: {
    alignSelf: "stretch",
    marginTop: 16,
  },
  specContainer: {
    marginTop: 13,
  },
  timeValues: {
    flexDirection: "column",
    alignItems: "stretch",
    color: "rgba(59, 65, 75, 1)",
    fontWeight: "600",
  },
  timeValue: {
    color: "rgba(59, 65, 75, 1)",
    fontWeight: "600",
  },
  checkoutTimeContainer: {
    marginTop: 16,
  },
  specValueContainer: {
    marginTop: 13,
  },
});