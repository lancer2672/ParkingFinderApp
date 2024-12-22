import { useNavigation } from '@react-navigation/native';
import { expandAnimation } from '@src/animation';
import reservationAPI from '@src/api/reservation.api';
import ButtonComponent from '@src/components/Button';
import LoadingModal from '@src/components/LoadingModal/LoadingModal';
import { generalColor } from '@src/theme/color';
import { RES_STATUS } from '@src/utils/constant';
import { useEffect, useState } from 'react';
import {
  Image,
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Pressable,
  ImageBackground,
  BackHandler,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { showMessage } from 'react-native-flash-message';
import { launchImageLibrary } from 'react-native-image-picker';
import Material from 'react-native-vector-icons/MaterialIcons';

const QrScan = () => {
  const navigation = useNavigation();
  const [scanning, setScanning] = useState(false);
  const [qrData, setQrData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reservation, setReservation] = useState(null);

  const handleBarCodeRead = e => {
    setScanning(false);
    fetchResById(e.data);
  };

  const isInValidResStatus = status => {
    return status === RES_STATUS.CANCELLED || status === RES_STATUS.CHECKED_OUT;
  };

  const fetchResById = async id => {
    if (!id) {
      return;
    }
    setLoading(true);
    try {
      const res = await reservationAPI.getByID(id);
      if (isInValidResStatus(res.status)) {
        showMessage({
          message: 'Lỗi! Chỗ đã bị hủy hoặc người dùng đã checkout trước đó',
          type: 'error',
        });
        return;
      }
      setReservation(res);
    } catch (error) {
      console.error('Error fetching reservation:', error);
      showMessage({
        message: 'Lỗi khi lấy thông tin đặt chỗ',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const getNextStatus = status => {
    if (status !== RES_STATUS.PENDING && status !== RES_STATUS.CHECKED_IN) {
      return '';
    }

    switch (status) {
      case RES_STATUS.PENDING:
        return RES_STATUS.CHECKED_IN;
      case RES_STATUS.CHECKED_IN:
        return RES_STATUS.CHECKED_OUT;
      default:
        return '';
    }
  };

  const handleSubmit = async () => {
    if (!reservation || getNextStatus(reservation.status) === '') {
      return;
    }
    try {
      const nextStatus = getNextStatus(reservation.status);
      const res = await reservationAPI.updateUserReservation({
        reservationId: reservation.id,
        status: nextStatus,
      });
      console.log(' >>>>res', nextStatus, res);
      if (nextStatus === RES_STATUS.CHECKED_IN) {
        showMessage({
          message: 'Cập nhật trạng thái thành công',
          type: 'success',
        });
      }
    } catch (error) {
      showMessage({
        message: 'Lỗi không xác định',
        type: 'error',
      });
      console.log('Error updating reservation:', error);
    }
  };

  const handleSelectImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (response.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0];
        alert(`Selected image: ${selectedImage.uri}`);
      }
    });
  };

  const getBtnContentByStatus = status => {
    switch (status) {
      case RES_STATUS.PENDING:
        return 'CHECK IN';
      case RES_STATUS.CHECKED_IN:
        return 'CHECK OUT';
      default:
        return '';
    }
  };

  useEffect(() => {
    LayoutAnimation.configureNext(expandAnimation);
    fetchResById('108'); // Temporary used for testing
  }, [scanning]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => BackHandler.exitApp()}>
          {/* <Image source={require('./assets/back.png')} style={{height: 36, width: 36}}></Image> */}
        </TouchableOpacity>
        <Pressable onPress={() => navigation.goBack()}>
          <Material name="arrow-back" size={30} />
        </Pressable>
        <Text style={styles.textTitle}>Scan QR Code</Text>
      </View>
      {loading && (
        <LoadingModal
          visible={loading}
          onClose={() => {
            setLoading(false);
          }}
        />
      )}
      {scanning ? (
        <QRCodeScanner
          reactivate={true}
          showMarker={true}
          ref={(node) => { this.scanner = node }}
          onRead={handleBarCodeRead}
          topContent={
            <Text style={styles.centerText}>
              Please move your camera {"\n"} over the QR Code
            </Text>
          }
          bottomContent={
            <View>
              <ImageBackground source={require('../../assets/icons/Background.png')} style={styles.bottomContent}>
                <TouchableOpacity style={styles.buttonScan2}
                  onPress={() => this.scanner.reactivate()}
                  onLongPress={() => this.setState({ scan: false })}>
                  <Image source={require('../../assets/icons/photo-camera.png')} style={{ height: 36, width: 36 }}></Image>
                </TouchableOpacity>
              </ImageBackground>
            </View>
          }
        />
      ) : (
        <View style={styles.cardView}>
          <Image source={require('../../assets/icons/photo-camera.png')} style={{ height: 36, width: 36 }} />
          <Text numberOfLines={8} style={styles.descText}>Please move your camera {"\n"} over the QR Code</Text>
          <Image source={require('../../assets/icons/qr-code.png')} style={{ margin: 20 }} />
          <TouchableOpacity onPress={() => setScanning(true)} style={styles.buttonScan}>
            <View style={styles.buttonWrapper}>
              <Text style={{ ...styles.buttonTextStyle, color: '#2196f3' }}>Scan QR Code</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.galleryButton} onPress={handleSelectImage}>
            <Text style={styles.galleryButtonText}>Select Image from Gallery</Text>
          </TouchableOpacity>
        </View>
      )}
      {qrData && (
        <View style={styles.qrDataContainer}>
          <Text style={styles.qrDataText}>QR Code Data: {qrData}</Text>
        </View>
      )}
      <ButtonComponent
        onPress={handleSubmit}
        color={generalColor.other.bluepurple}
        text={getBtnContentByStatus(reservation?.status)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  textTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  cardView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  descText: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
  },
  buttonScan: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#2196f3',
    borderRadius: 5,
  },
  buttonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonTextStyle: {
    fontSize: 16,
    marginLeft: 10,
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

export default QrScan;