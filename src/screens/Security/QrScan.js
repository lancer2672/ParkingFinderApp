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
  ImageBackground,
  LayoutAnimation,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { showMessage } from 'react-native-flash-message';
import QRCodeScanner from 'react-native-qrcode-scanner';

const QrScan = () => {
  const navigation = useNavigation();
  const [scanning, setScanning] = useState(false);
  const [qrData, setQrData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reservation, setReservation] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleBarCodeRead = e => {
    setScanning(false);
    const parsedData = JSON.parse(e.data);
    console.log('Parsed data:', parsedData);
    
    setQrData(parsedData);
    setModalVisible(true);
    fetchResById(parsedData.id);
  };

  const isInValidResStatus = status => {
    return status === RES_STATUS.CANCELLED || status === RES_STATUS.CHECKED_OUT;
  };

  const fetchResById = async id => {
    console.log("ID", id);
    if (!id) {
      return;
    }
    setLoading(true);
    try {
      const res = await reservationAPI.getByID(id);
      console.log('Fetched reservation:', res);
      if (isInValidResStatus(res.status)) {
        showMessage({
          message: 'Lỗi! Chỗ đã bị hủy hoặc người dùng đã checkout trước đó',
          type: 'error',
        });
        return;
      }
      setReservation(res);
    } catch (error) {
      console.error('Error fetching:', error);
      showMessage({
        message: 'Lỗi khi lấy thông tin đặt chỗ',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const getNextStatus = status => {
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
      console.log('Updated reservation:', nextStatus, res);
      if (nextStatus === RES_STATUS.CHECKED_IN || nextStatus === RES_STATUS.CHECKED_OUT) {
        showMessage({
          message: 'Cập nhật trạng thái thành công',
          type: 'success',
        });
        setReservation(prev => ({ ...prev, status: nextStatus }));
      }
    } catch (error) {
      showMessage({
        message: 'Lỗi không xác định',
        type: 'error',
      });
      console.log('Error updating reservation:', error);
    }
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
    if (qrData && qrData.reservation && qrData.reservation?.id) {
      fetchResById(qrData.reservation.id); // Use the scanned QR code data
      console.log('Id park:', qrData.reservation.id);
    }
  }, [qrData]);

  return (
    <View style={styles.container}>
      {loading && (
        <LoadingModal
          visible={loading}
          onClose={() => {
            setLoading(false);
          }}
        />
      )}

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

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Thông tin đặt vé</Text>
            <Text>ID: {reservation?.id}</Text>
            {/* <Text>Parking Lot ID: {reservation?.parkingLotId}</Text> */}
            <Text>Start Time: {new Date(reservation?.startTime).toLocaleString()}</Text>
            <Text>Check Out Time: {reservation?.checkOutTime ? new Date(reservation?.checkOutTime).toLocaleString() : 'N/A'}</Text>
            <Text>Total Price: {reservation?.price}</Text>
            <ButtonComponent
              onPress={handleSubmit}
              color={generalColor.other.bluepurple}
              text={getBtnContentByStatus(reservation?.status)}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  backButton: {
    marginRight: 'auto',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    width:"90%",
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    backgroundColor: '#2196f3',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 20,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default QrScan;