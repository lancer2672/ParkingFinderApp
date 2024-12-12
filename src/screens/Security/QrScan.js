import React, { Component, Fragment } from 'react';
import { TouchableOpacity, Text, Linking, View, Image, ImageBackground, BackHandler, Pressable } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import styles from './scanStyle'
import { goBack } from '@src/navigation/NavigationController';
import Material from 'react-native-vector-icons/MaterialIcons';
class QrScan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scan: false,
      ScanResult: false,
      result: null,
      qrData: null,
      name: '',
      address: '',
      duration: '',
      checkinTime: '',
      checkoutTime: ''
    };
  }
  onSuccess = (e) => {
    const check = e.data.substring(0, 4);
    console.log('scanned data' + e.data);
    const qrData = JSON.parse(e.data);
    const currentTime = new Date();
    const checkoutTime = new Date(currentTime.getTime() + qrData.duration * 60 * 60 * 1000); 
    this.setState({
      result: e,
      scan: false,
      ScanResult: true,
      qrData: e.data,
      name: qrData.parkingslot.name,
      address: qrData.parkingslot.address,
      duration: qrData.duration,
      checkinTime: qrData.checkinTime,
      checkoutTime: checkoutTime.toISOString()
    })
    if (check === 'http') {
      Linking.openURL(e.data).catch(err => console.error('An error occured', err));
    } else {
      this.setState({
        result: e,
        scan: false,
        ScanResult: true,
        qrData: e.data,
        name: qrData.parkingslot.name,
        address: qrData.parkingslot.address,
        duration: qrData.duration,
        checkinTime: qrData.checkinTime,
        checkoutTime: checkoutTime.toISOString()
      })
    }
  }
  activeQR = () => {
    this.setState({ scan: true })
  }
  scanAgain = () => {
    this.setState({ scan: true, ScanResult: false })
  }
  render() {
    const { scan, ScanResult, result, name, address, duration, checkinTime, checkoutTime } = this.state;
    return (
      <View style={styles.scrollViewStyle}>

        <Fragment>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => BackHandler.exitApp()}>
              {/* <Image source={require('./assets/back.png')} style={{height: 36, width: 36}}></Image> */}
            </TouchableOpacity>
            <Pressable onPress={() => goBack()}>
              <Material name="arrow-back" size={30} />
            </Pressable>
            <Text style={styles.textTitle}>Scan QR Code</Text>
          </View>
          {!scan && !ScanResult &&
            <View style={styles.cardView} >
              <Image source={require('../../assets/icons/photo-camera.png')} style={{ height: 36, width: 36 }}></Image>
              <Text numberOfLines={8} style={styles.descText}>Please move your camera {"\n"} over the QR Code</Text>
              <Image source={require('../../assets/icons/qr-code.png')} style={{ margin: 20 }}></Image>
              <TouchableOpacity onPress={this.activeQR} style={styles.buttonScan}>
                <View style={styles.buttonWrapper}>
                  {/* <Image source={require('../../assets/icons/photo-camera.png')} style={{height: 36, width: 36}}></Image> */}
                  <Text style={{ ...styles.buttonTextStyle, color: '#2196f3' }}>Scan QR Code</Text>
                </View>
              </TouchableOpacity>
            </View>
          }
          {ScanResult &&
              <Fragment>
              <Text style={styles.textTitle1}>Result</Text>
              
              <View style={ScanResult ? styles.scanCardView : styles.cardView}>
              <Image source={require('../../assets/icons/done.png')} style={styles.doneIcon} />
                  <Text style={styles.resultText}><Text style={styles.boldText}>Name:</Text> {name}</Text>
                  <Text style={styles.resultText}><Text style={styles.boldText}>Address:</Text> {address}</Text>
                  <Text style={styles.resultText}><Text style={styles.boldText}>Duration:</Text> {duration} hours</Text>
                  <Text style={styles.resultText}><Text style={styles.boldText}>Check-in Time:</Text> {checkinTime}</Text>
                  <Text style={styles.resultText}><Text style={styles.boldText}>Check-out Time:</Text> {checkoutTime}</Text>
                 
                  <TouchableOpacity onPress={this.scanAgain} style={styles.buttonScan}>
                      <View style={styles.buttonWrapper}>
                          <Image source={require('../../assets/icons/photo-camera.png')} style={{ height: 36, width: 36 }}></Image>
                          <Text style={{ ...styles.buttonTextStyle, color: '#2196f3' }}>Click to scan again</Text>
                      </View>
                  </TouchableOpacity>
              </View>
          </Fragment>
          }
          {scan &&
            <QRCodeScanner
              reactivate={true}
              showMarker={true}
              ref={(node) => { this.scanner = node }}
              onRead={this.onSuccess}
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
          }
        </Fragment>
      </View>
    );
  }
}
export default QrScan;
