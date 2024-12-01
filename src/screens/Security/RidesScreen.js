import * as React from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Header } from "./Header";
import { RideCard } from "./RideCard";

const rideData = [
  {
    name: "Amanda Chase",
    space: "Space 4c",
    uniqueId: "CPA-0129",
    checkInTime: "11:00 am",
    checkOutTime: "05:00 pm",
    specifications: "None"
  },
  {
    name: "John Doe",
    space: "Space 5b",
    uniqueId: "CPA-0130",
    checkInTime: "12:00 pm",
    checkOutTime: "06:00 pm",
    specifications: "None"
  }
];

const RidesScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.screenContainer}>
      <View style={styles.contentWrapper}>
        <Header />
        {rideData.map((ride, index) => (
          <View key={index} style={styles.floatContainer}>
            <View style={styles.rideCardWrapper}>
              <RideCard {...ride} />
              <Image
                resizeMode="contain"
                source={{ uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/174cfa01377686a7a913b9fa4d3aa15ee38bb56df309d8abe8d5def9d499b35a?placeholderIfAbsent=true&apiKey=e90d4f59aba64d23b82258821f450ccc" }}
                style={styles.cardIcon}
              />
            </View>
          </View>
        ))}
        <View style={styles.bottomCard}>
          <View style={styles.actionSection}>
            <View style={styles.specificationRow}>
            </View>
            <TouchableOpacity
              style={styles.homeButtonContainer}
              onPress={() => navigation.navigate('SecurityDashboard')} 
            >
              <Text style={styles.homeButtonText}>Go Back to Home Screen</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    display: "flex",
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: 480,
    width: "100%",
    paddingTop: 14,
    paddingBottom: 62,
    flexDirection: "column",
    overflow: "hidden",
    alignItems: "stretch",
  },
  contentWrapper: {
    display: "flex",
    width: "100%",
    paddingHorizontal: 16,
    flexDirection: "column",
  },
  floatContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  rideCardWrapper: {
    position: "relative",
  },
  cardIcon: {
    alignSelf: "center",
    position: "relative",
    zIndex: 10,
    marginTop: -28,
    width: 56,
    aspectRatio: 1,
  },
  bottomCard: {
    borderRadius: 6,
    alignSelf: "center",
    width: "100%",
    maxWidth: 343,
    paddingTop: 27,
  },
  actionSection: {
    borderRadius: 6,
    backgroundColor: "#613EEA",
    alignSelf: "stretch",
    zIndex: 10,
    marginTop: 7,
    marginBottom: -19,
    width: "100%",
    padding: 13,
    paddingRight: 55,
    paddingBottom: 22,
    flexDirection: "column",
    alignItems: "center", // Center the content horizontally
  },
  specificationRow: {
    display: "flex",
    alignItems: "stretch",
    marginVertical: 10, // Use margin to create space between elements
  },
  specLabel: {
    color: "rgba(117, 127, 140, 1)",
    fontWeight: "400",
  },
  specValue: {
    color: "rgba(59, 65, 75, 1)",
    fontWeight: "600",
  },
  homeButtonContainer: {
    alignSelf: "center",
    marginTop: "auto",
    marginBottom: 0, 
    marginLeft: 20,
    backgroundColor: "#613EEA", 
    paddingVertical: 10, 
    paddingHorizontal: 20,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center", 
  },
  homeButtonText: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "600",
  },
});

export default RidesScreen;