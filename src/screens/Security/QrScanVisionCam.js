import {useNavigation} from '@react-navigation/native';
import {expandAnimation} from '@src/animation';
import {useEffect, useState} from 'react';
import {LayoutAnimation, StyleSheet, Text, View} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';

const QrScanVisionCam = () => {
  const device = useCameraDevice('back');
  const [show, setShow] = useState(true);
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      console.log(`Scanned ${codes.length} codes!`, codes);
      if (codes.length > 0) {
        setShow(() => false);
        const data = JSON.parse(codes[0].value);
        console.log('QR DATA', data);
        setQrData(data);
      } else {
        setShow(() => true);
      }
    },
  });
  const {hasPermission, requestPermission} = useCameraPermission();
  const navigation = useNavigation();
  const [scanning, setScanning] = useState(false);
  const [qrData, setQrData] = useState(null);

  const handleBarCodeRead = e => {
    setScanning(false);
    console.log('_>>>', e.data);
    setQrData(e.data);
  };

  const handleSelectImage = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0];
        alert(`Selected image: ${selectedImage.uri}`);
      }
    });
  };
  useEffect(() => {
    setShow(true);
  }, []);
  useEffect(() => {
    if (!hasPermission) {
      requestPermission().then(() => {
        Alert.alert('Error, permission denied');
        navigate('HomeStaff');
      });
    }
  }, []);
  useEffect(() => {
    LayoutAnimation.configureNext(expandAnimation);
  }, [show]);
  return (
    <View style={styles.container}>
      {show && (
        <View style={{flex: 1}}>
          <Camera
            style={{backgroundColor: 'red', flex: 1}}
            device={device}
            codeScanner={codeScanner}
            isActive={true}
          />
        </View>
      )}
      {/* <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>Tap to Scan QR Code</Text>
        <TouchableOpacity
          style={styles.cameraButton}
          onPress={() => setScanning(true)}>
          <Image
            source={require('../../assets/icons/photo-camera.png')}
            style={styles.cameraIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.galleryButton}
          onPress={handleSelectImage}>
          <Text style={styles.galleryButtonText}>
            Select Image from Gallery
          </Text>
        </TouchableOpacity>
      </View> */}

      {qrData && (
        <View style={styles.qrDataContainer}>
          <Text style={styles.qrDataText}>
            QR Code Data: {qrData.checkinTime}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#fff',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 10,
    width: 300,
    height: 300,
  },
  placeholderText: {
    fontSize: 18,
    color: '#888',
    marginBottom: 20,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  cameraIcon: {
    width: 50,
    height: 50,
  },
  galleryButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  galleryButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  qrDataContainer: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
  },
  qrDataText: {
    fontSize: 16,
    color: '#333',
  },
});

export default QrScanVisionCam;
