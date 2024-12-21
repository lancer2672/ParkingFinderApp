import {useNavigation} from '@react-navigation/native';
import useUserStore from '@src/store/userStore';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import viewIncomingIcon from '../../assets/icons/Group.png';
import notificationIcon from '../../assets/icons/notifications.png';
import parkingHistoryIcon from '../../assets/icons/settings/language.png';
import contactPoliceIcon from '../../assets/icons/terms_of_use.png';
import {ActionCard} from './ActionCard';
import {SecurityProfile} from './SecurityProfile';
import {StatusBar} from './StatusBar';
const actionCardsData = [
  {
    id: 1,
    icon: viewIncomingIcon,
    title: 'View Incoming',
  },
  {
    id: 2,
    icon: parkingHistoryIcon,
    title: 'Parking History',
  },
  {
    id: 3,
    icon: contactPoliceIcon,
    title: 'Contact Police',
  },
  {
    id: 4,
    icon: notificationIcon,
    title: 'Notification',
  },
];

function SecurityDashboard() {
  const user = useUserStore(s => s.user);
  const navigation = useNavigation();
  const handleCardPress = id => {
    console.log(id);
    if (id === 1) {
      navigation.navigate('RidesScreen');
    } else if (id === 2) {
      navigation.navigate('ParkingHistory');
    } else if (id === 3) {
      navigation.navigate('QrScan');
    } else if (id === 4) {
      navigation.navigate('Notification');
    }
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.dashboardWrapper}>
        <StatusBar />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Lekki Gardens Car Park A Security</Text>
        </View>
        <SecurityProfile user={user} />
        <View style={styles.actionCardsContainer}>
          {actionCardsData.map(card => (
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: 480,
    width: '100%',
    flexDirection: 'column',
    overflow: 'hidden',
    //     alignItems: 'stretch',
  },
  dashboardWrapper: {
    display: 'flex',
    width: '100%',
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: 'column',
  },
  titleContainer: {
    marginTop: 20,
    alignSelf: 'center',
  },
  title: {
    color: 'rgba(59, 65, 75, 1)',
    fontSize: 18,
    fontFamily: 'Open Sans, sans-serif',
    fontWeight: '700',
    lineHeight: 18,
    letterSpacing: 0.1,
    textAlign: 'center',
  },
  actionCardsContainer: {
    display: 'flex',
    marginTop: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 2,
  },
  actionCard: {
    width: '48%', // Slightly less than 50% to account for gap
    aspectRatio: 1,
    marginBottom: 15,
  },
  bottomSpacing: {
    display: 'flex',
    minHeight: 80,
    marginTop: 40,
    width: '100%',
  },
});

export default SecurityDashboard;
