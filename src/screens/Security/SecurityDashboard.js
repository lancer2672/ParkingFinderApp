import * as React from "react";
import { View, StyleSheet, Text } from "react-native";
import { StatusBar } from "./StatusBar";
import { SecurityProfile } from "./SecurityProfile";
import { ActionCard } from "./ActionCard";
import { useNavigation } from "@react-navigation/native";
import { id } from "date-fns/locale";
import viewIncomingIcon from '../../assets/icons/Group.png';
import parkingHistoryIcon from '../../assets/icons/settings/language.png';
import contactPoliceIcon from '../../assets/icons/terms_of_use.png';
import notificationIcon from '../../assets/icons/notifications.png';
const actionCardsData = [
        {
                id: 1,
                icon: viewIncomingIcon,
                title: "View Incoming"
        },
        {
                id: 2,
                icon: parkingHistoryIcon,
                title: "Parking History"
        },
        {
                id: 3,
                icon: contactPoliceIcon,
                title: "Contact Police"
        },
        {
                id: 4,
                icon: notificationIcon,
                title: "Notification"
        },
];


function SecurityDashboard() {
        const navigation = useNavigation();
        const handleCardPress = (id) => {
                console.log(id);
                if (id === 1) {
                        navigation.navigate("RidesScreen");
                }
                else if (id === 2) {
                        navigation.navigate("ParkingHistory");
                }
                else if (id === 3) {
                        navigation.navigate("QrScan");
                }
        }
        return (
                <View style={styles.container}>
                        <View style={styles.dashboardWrapper}>
                                <StatusBar />
                                <View style={styles.titleContainer}>
                                        <Text style={styles.title}>Lekki Gardens Car Park A Security</Text>
                                </View>
                                <SecurityProfile />
                                <View style={styles.actionCardsContainer}>
                                        {actionCardsData.map((card) => (
                                                <ActionCard
                                                        key={card.id}
                                                        icon={card.icon}
                                                        title={card.title}
                                                        style={styles.actionCard}
                                                        onPress={() => handleCardPress(card.id)}
                                                />
                                        ))}
                                </View>
                        </View>
                        <View style={styles.bottomSpacing} />
                </View>
        );
}

const styles = StyleSheet.create({
        container: {
                display: "flex",
                marginLeft: "auto",
                marginRight: "auto",
                maxWidth: 480,
                width: "100%",
                flexDirection: "column",
                overflow: "hidden",
                alignItems: "stretch",
        },
        dashboardWrapper: {
                display: "flex",
                width: "100%",
                paddingLeft: 16,
                paddingRight: 16,
                flexDirection: "column",
        },
        titleContainer: {
                marginTop: 20,
                alignSelf: "center",
        },
        title: {
                color: "rgba(59, 65, 75, 1)",
                fontSize: 18,
                fontFamily: "Open Sans, sans-serif",
                fontWeight: "700",
                lineHeight: 18,
                letterSpacing: 0.1,
                textAlign: "center",
        },
        actionCardsContainer: {
                display: "flex",
                marginTop: 30,
                flexDirection: "row",
                justifyContent: "space-between",
                flexWrap: "wrap",
                alignItems: "center",
                gap: 15,
        },
        actionCard: {
                width: "48%",
                aspectRatio: 1,
                marginBottom: 15,
        },
        bottomSpacing: {
                display: "flex",
                minHeight: 80,
                marginTop: 40,
                width: "100%"
        }
});

export default SecurityDashboard;