// components/VNPayModal.js
import {useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Nhớ cài package này
import {WebView} from 'react-native-webview';

const VNPayModal = ({
  visible,
  onClose,
  paymentUrl,
  onPaymentSuccess,
  onPaymentFailure,
}) => {
  const webViewRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  // Xử lý khi webview load xong
  const handleLoadEnd = () => {
    setIsLoading(false);
  };

  // Xử lý lỗi webview
  const handleError = () => {
    Alert.alert('Lỗi', 'Có lỗi xảy ra khi kết nối tới cổng thanh toán', [
      {
        text: 'Thử lại',
        onPress: () => webViewRef.current?.reload(),
      },
      {
        text: 'Hủy',
        onPress: () => onClose(),
      },
    ]);
  };

  // Xử lý URL navigation
  const handleNavigationStateChange = navState => {
    // Kiểm tra URL callback từ VNPay
    if (
      navState.url.includes('payment-success') ||
      navState.url.includes('vnp_ResponseCode=00')
    ) {
      onPaymentSuccess?.();
      onClose();
    } else if (
      navState.url.includes('payment-failed') ||
      navState.url.includes('vnp_ResponseCode=')
    ) {
      onPaymentFailure?.();
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Icon name="close" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Thanh toán VNPay</Text>
          <View style={styles.rightHeader} />
        </View>

        {/* WebView */}
        <WebView
          ref={webViewRef}
          source={{uri: paymentUrl}}
          onLoadEnd={handleLoadEnd}
          onError={handleError}
          onNavigationStateChange={handleNavigationStateChange}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          scalesPageToFit={true}
          style={styles.webview}
        />

        {/* Loading indicator */}
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={styles.loadingText}>Đang kết nối...</Text>
          </View>
        )}
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  closeButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  rightHeader: {
    width: 40, // Cân bằng với closeButton
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
});

export default VNPayModal;
