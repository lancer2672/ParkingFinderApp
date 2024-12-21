import {Image, StyleSheet, Text, View} from 'react-native';

export function SecurityProfile({user}) {
  return (
    <View style={styles.container}>
      <Image
        resizeMode="contain"
        source={{
          uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/91dd6f215cec285d57ac86fd13c54cb53ef86718b4b8496fc6f19c900579af5d?placeholderIfAbsent=true&apiKey=e90d4f59aba64d23b82258821f450ccc',
        }}
        style={styles.profileImage}
      />
      <View style={styles.profileInfo}>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{user?.name}</Text>
        </View>
        <View>
          <Text style={styles.role}>Security Guard</Text>
        </View>
        <View>
          <Text style={styles.badge}>Số điện thoại {user?.phoneNumber}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    marginTop: 29,
    alignItems: 'stretch',
    gap: 21,
  },
  profileImage: {
    position: 'relative',
    display: 'flex',
    width: 77,
    flexShrink: 0,
    aspectRatio: 1,
  },
  profileInfo: {
    display: 'flex',
    marginTop: 'auto',
    marginBottom: 'auto',
    flexDirection: 'column',
  },
  nameContainer: {
    marginBottom: 4,
  },
  name: {
    color: 'rgba(59, 65, 75, 1)',
    fontSize: 18,
    fontFamily: 'Open Sans, sans-serif',
    fontWeight: '700',
    lineHeight: 18,
  },
  role: {
    color: 'rgba(117, 127, 140, 1)',
    fontSize: 16,
    fontFamily: 'Open Sans, sans-serif',
    marginBottom: 4,
  },
  badge: {
    color: 'rgba(117, 127, 140, 1)',
    fontSize: 16,
    fontFamily: 'Open Sans, sans-serif',
  },
});
