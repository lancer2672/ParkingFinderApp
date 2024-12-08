import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RNCamera } from "react-native-camera";
import { launchImageLibrary } from "react-native-image-picker";

const QrScan = () => {
  const navigation = useNavigation();
  const [scanning, setScanning] = useState(false);
  const [qrData, setQrData] = useState(null);

  const handleBarCodeRead = (e) => {
    setScanning(false);
    console.log("_>>>",e.data)
    setQrData(e.data);
  };

  const handleSelectImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0];
        alert(`Selected image: ${selectedImage.uri}`);
      }
    });
  };

  return (
    <View style={styles.container}>
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
            onPress={() => setScanning(true)}
          >
            <Image
              source={require("../../assets/icons/photo-camera.png")}
              style={styles.cameraIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.galleryButton}
            onPress={handleSelectImage}
          >
            <Text style={styles.galleryButtonText}>Select Image from Gallery</Text>
          </TouchableOpacity>
        </View>
      )}
      {qrData && (
        <View style={styles.qrDataContainer}>
          <Text style={styles.qrDataText}>QR Code Data: {qrData}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  placeholder: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 10,
    width: 300,
    height: 300,
  },
  placeholderText: {
    fontSize: 18,
    color: "#888",
    marginBottom: 20,
  },
  cameraButton: {
    position: "absolute",
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
    backgroundColor: "#007bff",
    borderRadius: 5,
  },
  galleryButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  qrDataContainer: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
  },
  qrDataText: {
    fontSize: 16,
    color: "#333",
  },
});

export default QrScan;