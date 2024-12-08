import {useNavigation} from '@react-navigation/native';
import {expandAnimation} from '@src/animation';
import reservationAPI from '@src/api/reservation.api';
import ButtonComponent from '@src/components/Button';
import LoadingModal from '@src/components/LoadingModal/LoadingModal';
import {generalColor} from '@src/theme/color';
import {RES_STATUS} from '@src/utils/constant';
import {useEffect, useState} from 'react';
import {
  Image,
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {showMessage} from 'react-native-flash-message';
import {launchImageLibrary} from 'react-native-image-picker';

const QrScan = () => {
  const navigation = useNavigation();
  const [scanning, setScanning] = useState(false);
  const [qrData, setQrData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reservation, setRervation] = useState();
  const handleBarCodeRead = e => {
    setScanning(false);
    // setQrData(e.data);
    fetchResById(e.data?.reservation?.id);
  };

  const isInValidResStatus = status => {
    return status == RES_STATUS.CANCELLED || status == RES_STATUS.CHECKED_OUT;
  };
  const fetchResById = async id => {
    if (!id) {
      return;
    }
    setLoading(true);
    try {
      let res = await reservationAPI.getByID(id);
      if (isInValidResStatus(res.status)) {
        showMessage({
          message: 'Lỗi! Chỗ đã bị hủy hoặc người dùng đã checkout trước đó',
          type: 'error',
        });
        return;
      }
      setRervation(res);
    } catch (er) {
    } finally {
      setLoading(false);
    }
  };
  const getNextStatus = status => {
    // console.log('sg', status);aaaaaaaaaaa
    if (status != RES_STATUS.PENDING && status != RES_STATUS.CHECKED_IN) {
      return '';
    }

    switch (status) {
      case RES_STATUS.PENDING: {
        return RES_STATUS.CHECKED_IN;
      }
      case RES_STATUS.CHECKED_IN: {
        return RES_STATUS.CHECKED_OUT;
      }
      default:
        return '';
    }
  };
  const handleSubmit = async () => {
    if (!reservation || getNextStatus(reservation.status) == '') {
      return;
    }
    try {
      const nextStatus = getNextStatus(reservation.status);
      const res = await reservationAPI.updateUserReservation({
        reservationId: reservation.id,
        status: nextStatus,
      });
      console.log(' >>>>res', nextStatus, res);
      if (nextStatus == RES_STATUS.CHECKED_IN) {
        showMessage({
          message: 'Cập nhật trạng thái thành công',
          type: 'success',
        });
      }
    } catch (er) {
      showMessage({
        message: 'Lỗi không xác định',
        type: 'error',
      });
      console.log('er', er);
    }
  };
  const handleSelectImage = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0];
        alert(`Selected image: ${selectedImage.uri}`);
      }
    });
  };
  const getBtnContentByStatus = status => {
    switch (status) {
      case RES_STATUS.PENDING: {
        return 'CHECK IN';
      }
      case RES_STATUS.CHECKED_IN: {
        return 'CHECK OUT';
      }
      default: {
        return '';
      }
    }
  };
  useEffect(() => {
    LayoutAnimation.configureNext(expandAnimation);

    //temporary used this
    fetchResById('73');
  }, [scanning]);
  return (
    <View style={styles.container}>
      {
        <LoadingModal
          visible={loading}
          onClose={() => {
            setLoading(false);
          }}></LoadingModal>
      }
      {scanning ? (
        <RNCamera
          style={styles.camera}
          onBarCodeRead={handleBarCodeRead}
          captureAudio={false}
        />
      ) : (
        <View style={styles.placeholder}>
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
        </View>
      )}
      {qrData && (
        <>
          <View style={styles.qrDataContainer}>
            <Text style={styles.qrDataText}>QR Code Data: {qrData}</Text>
          </View>
        </>
      )}
      <ButtonComponent
        onPress={() => {
          console.log('press');
          handleSubmit();
        }}
        color={generalColor.other.bluepurple}
        text={getBtnContentByStatus(reservation?.status)}></ButtonComponent>
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

export default QrScan;
