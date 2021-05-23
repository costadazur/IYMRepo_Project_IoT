import React from 'react';
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    getPlatforms
  } from "@ionic/react";

//import { Platform} from 'react-native';
//import { BleManager } from 'react-native-ble-plx;
//import { BluetoothLE } from '@ionic-native/bluetooth-le/ngx';

import { BLE } from '@ionic-native/ble';
import { render } from '@testing-library/react';
import { isNullOrUndefined } from 'util';

class BLEManagerPage extends React.Component  {

    constructor(bluetoothle: any, plt:any) {//: BluetoothLE  : Platform

        super(bluetoothle,plt)
        //this.plt?.ready().then((readySource: any) => {
        //((readySource: any) => {
       
          console.log('Platform ready from', "readySource");
       
          bluetoothle.initialize().forEach((ble: { status: any; }) => {
            console.log('ble', ble.status) // logs 'enabled'
         // });
       
         });
       }

plt= getPlatforms();
bluetoothle = BLE;

    openScanner = async () => {
      const data = await BLE.startScan([]).subscribe(device => {
           console.log(JSON.stringify(device));
         });
      console.log(`BluetoothLE data: ${data.toString}`);
    };

      // ASCII only
   stringToBytes(iString:string):ArrayBufferLike {
    var array = new Uint8Array(iString.length);
    for (var i = 0, l = iString.length; i < l; i++) {
        array[i] = iString.charCodeAt(i);
     }
     return array.buffer;
 }

 // ASCII only
//   bytesToString(buffer:ArrayBufferLike) {
//     var value = new Uint8Array(buffer).buffer;
//      return String.fromCharCode.apply(null, value);
//  }

  // ASCII only
  bytesToString2(buffer:any) {
    var value = new Uint8Array(buffer).buffer;
    return value.slice.toString();
    // return String.fromCharCode.apply(null, value);
 }
 
  scanAndConnect(this: any) {
    this.manager.startDeviceScan(null,
                                 null, (error:any, device:any) => {
      this.info("Scanning...")
      console.log(device)

      if (error) {
        this.error(error.message)
        return
      }

      if (device.name === 'TI BLE Sensor Tag' || device.name === 'SensorTag') {
        this.info("Connecting to TI Sensor")
        this.manager.stopDeviceScan()
        device.connect()
          .then((device: { discoverAllServicesAndCharacteristics: () => any; }) => {
            this.info("Discovering services and characteristics")
            return device.discoverAllServicesAndCharacteristics()
          })
          .then((device: any) => {
            this.info("Setting notifications")
            return this.setupNotifications(device)
          })
          .then(() => {
            this.info("Listening...")
          }, (error:any) => {
            this.error(error.message)
          })
      }
    });
  }



 render () {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonButton onClick={this.openScanner}>Scan for devices</IonButton>
        </IonContent>
      </IonPage>
    );
    }
  };

  export default BLEManagerPage;