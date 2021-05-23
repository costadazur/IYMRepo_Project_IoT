//https://github.com/rusel1989/react-native-bluetooth-serial/blob/master/BluetoothSerialExample/src/App.js
//https://github.com/IcaroRios/react-native-bluetooth/blob/master/App.js

import React from 'react';
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonToast,
    IonLabel,
  } from "@ionic/react";
  import {
    Platform,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    View,
    ActivityIndicator,
    Image
  } from 'react-native';
  import { Buffer } from 'buffer'

//import { Platform} from 'react-native';
//import { BleManager } from 'react-native-ble-plx;
//import { BluetoothLE } from '@ionic-native/bluetooth-le/ngx';

import BluetoothSerial from 'react-native-bluetooth-serial';
import { BLE } from '@ionic-native/ble';
import { isNullOrUndefined } from 'util';
global.Buffer = Buffer
var TimerMixin = require('react-timer-mixin');
var _ = require('lodash');
const iconv = require('iconv-lite');

class BLEManagerPage extends React.Component  {

    constructor(props) {

        super(props)
        this.state = {
          received: '',
          isEnabled: false,
          discovering: false,
          devices: [],
          unpairedDevices: [],
        }
        this.bluetooth = new BluetoothSerial();
      }

      componentWillMount() {

        Promise.all([
          BluetoothSerial.isEnabled(),
          BluetoothSerial.list()
        ])
          .then((values) => {
            const [isEnabled, devices] = values
            this.setState({ isEnabled, devices })
          })

          if(isNullOrUndefined(this.bluetooth)) {
            this.bluetooth = new BluetoothSerial();
          }
          //BluetoothSerial.on('bluetoothEnabled', () => IonToast.showShortBottom('Bluetooth enabled'))
          this.bluetooth.on('bluetoothEnabled', () => IonToast.showShortBottom('Bluetooth enabled'))
          this.bluetooth.on('bluetoothDisabled', () => IonToast.showShortBottom('Bluetooth disabled'))
          this.bluetooth.on('error', (err) => console.log(`Error: ${err.message}`))
          this.bluetooth.on('connectionLost', () => {
            if (this.state.device) {
              IonToast.showShortBottom(`Connection to device ${this.state.device.name} has been lost`)
            }
            this.setState({ connected: false })
          })
        }

         /**
           * [android]
           * request enable of bluetooth from user
           */
          requestEnable () {
            BluetoothSerial.requestEnable()
            .then((res) => this.setState({ isEnabled: true }))
            .catch((err) => IonToast.showShortBottom(err.message))
          }

        /**
   * [android]
   * enable bluetooth on device
   */
  enable () {
    BluetoothSerial.enable()
    .then((res) => this.setState({ isEnabled: true }))
    .catch((err) => IonToast.showShortBottom(err.message))
  }

/**
   * [android]
   * disable bluetooth on device
   */
  disable () {
    BluetoothSerial.disable()
    .then((res) => this.setState({ isEnabled: false }))
    .catch((err) => IonToast.showShortBottom(err.message))
  }

  /**
   * [android]
   * toggle bluetooth
   */
  toggleBluetooth (value) {
    if (value === true) {
      this.enable()
    } else {
      this.disable()
    }
  }

  /**
   * [android]
   * Discover unpaired devices, works only in android
   */
  discoverUnpaired () {
    if (this.state.discovering) {
      return false
    } else {
      this.setState({ discovering: true })
      BluetoothSerial.discoverUnpairedDevices()
      .then((unpairedDevices) => {
        this.setState({ unpairedDevices, discovering: false })
      })
      .catch((err) => IonToast.showShortBottom(err.message))
    }
  }

  /**
   * [android]
   * Discover unpaired devices, works only in android
   */
  cancelDiscovery () {
    if (this.state.discovering) {
      BluetoothSerial.cancelDiscovery()
      .then(() => {
        this.setState({ discovering: false })
      })
      .catch((err) => IonToast.showShortBottom(err.message))
    }
  }

  /**
   * [android]
   * Pair device
   */
  pairDevice (device) {
    BluetoothSerial.pairDevice(device.id)
    .then((paired) => {
      if (paired) {
        IonToast.showShortBottom(`Device ${device.name} paired successfully`)
        const devices = this.state.devices
        devices.push(device)
        this.setState({ devices, unpairedDevices: this.state.unpairedDevices.filter((d) => d.id !== device.id) })
      } else {
        IonToast.showShortBottom(`Device ${device.name} pairing failed`)
      }
    })
    .catch((err) => IonToast.showShortBottom(err.message))
  }

  /**
   * Connect to bluetooth device by id
   * @param  {Object} device
   */
  connect (device) {
    this.setState({ connecting: true })
    BluetoothSerial.connect(device.id)
    .then((res) => {
      IonToast.showShortBottom(`Connected to device ${device.name}`)
      this.setState({ device, connected: true, connecting: false })
    })
    .catch((err) => IonToast.showShortBottom(err.message))
  }

  /**
   * Disconnect from bluetooth device
   */
  disconnect () {
    BluetoothSerial.disconnect()
    .then(() => this.setState({ connected: false }))
    .catch((err) => IonToast.showShortBottom(err.message))
  }

  /**
   * Toggle connection when we have active device
   * @param  {Boolean} value
   */
  toggleConnect (value) {
    if (value === true && this.state.device) {
      this.connect(this.state.device)
    } else {
      this.disconnect()
    }
  }

  /**
   * Write message to device
   * @param  {String} message
   */
  write (message) {
    if (!this.state.connected) {
      IonToast.showShortBottom('You must connect to device first')
    }

    BluetoothSerial.write(message)
    .then((res) => {
      IonToast.showShortBottom('Successfuly wrote to device')
      this.setState({ connected: true })
    })
    .catch((err) => IonToast.showShortBottom(err.message))
  }

  onDevicePress (device) {
    if (this.state.section === 0) {
      this.connect(device)
    } else {
      this.pairDevice(device)
    }
  }

  writePackets (message, packetSize = 64) {
    const toWrite = iconv.encode(message, 'cp852')
    const writePromises = []
    const packetCount = Math.ceil(toWrite.length / packetSize)

    for (var i = 0; i < packetCount; i++) {
      const packet = new Buffer(packetSize)
      packet.fill(' ')
      toWrite.copy(packet, 0, i * packetSize, (i + 1) * packetSize)
      writePromises.push(BluetoothSerial.write(packet))
    }

    Promise.all(writePromises)
    .then((result) => {
    })
  }



 render () {
  const activeTabStyle = { borderBottomWidth: 6, borderColor: '#009688' }
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Bluetooth Serial Example</IonTitle>
          </IonToolbar>
          </IonHeader>
        <IonContent>
          {Platform.OS === 'android'
          ? (
            <View style={styles.enableInfoWrapper}>
              <IonLabel style={{ fontSize: 12, color: '#FFFFFF' }}>
                {this.state.isEnabled ? 'disable' : 'enable'}
              </IonLabel>
              <Switch
                onValueChange={this.toggleBluetooth.bind(this)}
                value={this.state.isEnabled} />
            </View>
          ) : null}

{Platform.OS === 'android'
        ? (
          <View style={[styles.topBar, { justifyContent: 'center', paddingHorizontal: 0 }]}>
            <TouchableOpacity style={[styles.tab, this.state.section === 0 && activeTabStyle]} onPress={() => this.setState({ section: 0 })}>
              <IonLabel style={{ fontSize: 14, color: '#FFFFFF' }}>PAIRED DEVICES</IonLabel>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.tab, this.state.section === 1 && activeTabStyle]} onPress={() => this.setState({ section: 1 })}>
              <IonLabel style={{ fontSize: 14, color: '#FFFFFF' }}>UNPAIRED DEVICES</IonLabel>
            </TouchableOpacity>
          </View>
        ) : null}
        {this.state.discovering && this.state.section === 1
        ? (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator
              style={{ marginBottom: 15 }}
              size={60} />
            <IonButton
              textStyle={{ color: '#FFFFFF' }}
              style={styles.buttonRaised}
              title='Cancel Discovery'
              onPress={() => this.cancelDiscovery()} />
          </View>
        ) : (
          <DeviceList
            showConnectedIcon={this.state.section === 0}
            connectedId={this.state.device && this.state.device.id}
            devices={this.state.section === 0 ? this.state.devices : this.state.unpairedDevices}
            onDevicePress={(device) => this.onDevicePress(device)} />
        )}


        <View style={{ alignSelf: 'flex-end', height: 52 }}>
          <ScrollView
            horizontal
            contentContainerStyle={styles.fixedFooter}>
            {Platform.OS === 'android' && this.state.section === 1
            ? (
              <IonButton
                title={this.state.discovering ? '... Discovering' : 'Discover devices'}
                onPress={this.discoverUnpaired.bind(this)} />
            ) : null}
            {Platform.OS === 'android' && !this.state.isEnabled
            ? (
              <IonButton
                title='Request enable'
                onPress={() => this.requestEnable()} />
            ) : null}
          </ScrollView>
        </View>

        </IonContent>
      </IonPage>
    );
    }
      }



      const styles = StyleSheet.create({
        container: {
          flex: 0.9,
          backgroundColor: '#F5FCFF'
        },
        topBar: { 
          height: 56, 
          paddingHorizontal: 16,
          flexDirection: 'row', 
          justifyContent: 'space-between', 
          alignItems: 'center' ,
          elevation: 6,
          backgroundColor: '#7B1FA2'
        },
        heading: {
          fontWeight: 'bold',
          fontSize: 16,
          alignSelf: 'center',
          color: '#FFFFFF'
        },
        enableInfoWrapper: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        },
        tab: { 
          alignItems: 'center', 
          flex: 0.5, 
          height: 56, 
          justifyContent: 'center', 
          borderBottomWidth: 6, 
          borderColor: 'transparent' 
        },
        connectionInfoWrapper: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 25
        },
        connectionInfo: {
          fontWeight: 'bold',
          alignSelf: 'center',
          fontSize: 18,
          marginVertical: 10,
          color: '#238923'
        },
        listContainer: {
          borderColor: '#ccc',
          borderTopWidth: 0.5
        },
        listItem: {
          flex: 1,
          height: 48,
          paddingHorizontal: 16,
          borderColor: '#ccc',
          borderBottomWidth: 0.5,
          justifyContent: 'center'
        },
        fixedFooter: {
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          borderTopWidth: 1,
          borderTopColor: '#ddd'
        },
        button: {
          height: 36,
          margin: 5,
          paddingHorizontal: 16,
          alignItems: 'center',
          justifyContent: 'center'
        },
        buttonText: {
          color: '#7B1FA2',
          fontWeight: 'bold',
          fontSize: 14
        },
        buttonRaised: {
          backgroundColor: '#7B1FA2',
          borderRadius: 2,
          elevation: 2
        }
      })
  export default BLEManagerPage;

  const DeviceList = ({ devices, connectedId, showConnectedIcon, onDevicePress }) =>
  <ScrollView style={styles.container}>
    <View style={styles.listContainer}>
      {devices.map((device, i) => {
        return (
          <TouchableHighlight
            underlayColor='#DDDDDD'
            key={`${device.id}_${i}`}
            style={styles.listItem} onPress={() => onDevicePress(device)}>
            <View style={{ flexDirection: 'row' }}>
              {showConnectedIcon
              ? (
                <View style={{ width: 48, height: 48, opacity: 0.4 }}>
                  {connectedId === device.id
                  ? (
                    <Image style={{ resizeMode: 'contain', width: 24, height: 24, flex: 1 }} source={require('../images/ic_done_black_24dp.png')} />
                  ) : null}
                </View>
              ) : null}
              <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold' }}>{device.name}</Text>
                <Text>{`<${device.id}>`}</Text>
              </View>
            </View>
          </TouchableHighlight>
        )
      })}
    </View>
  </ScrollView>

/* 
  <IonPage>
  <IonHeader>
    <IonToolbar>
      <IonTitle>Bluetooth Serial Example</IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent>
    <IonButton onClick={this.openScanner}>Scan for devices</IonButton>
  </IonContent>
</IonPage> */