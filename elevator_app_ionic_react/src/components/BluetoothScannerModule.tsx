import React,{Component, useState} from 'react';

import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonItem,
    IonIcon,
    IonCardContent,
    IonList,
    IonRefresher,
    IonRefresherContent
  } from "@ionic/react";
import {  NgZone } from '@angular/core';
import {BLE} from '@ionic-native/ble/ngx/index';
import 'symbol-observable'
import { RefresherEventDetail } from '@ionic/core';
import { chevronDownCircleOutline, bluetooth } from 'ionicons/icons';
import ReactDOM from 'react-dom';

let devices = new Array<any>();
const module_title = <IonTitle>Bluetooth Testing</IonTitle>;


class BluetoothScannerModule extends Component  {
    state = { ble:BLE,  ngZone: NgZone}
    constructor(props: any) {
      super(props);
      this.state = { ble:BLE,  ngZone: NgZone}      
    }
    doRefresh(event: CustomEvent<RefresherEventDetail>) {
        console.log('Begin async operation');
        setTimeout(() => {
          console.log('Async operation has ended');
          event.detail.complete();
        }, 2000);
    }
    async Scan(){
      devices = new Array<any>();
      const ble = new BLE();
      ble.scan([],15).subscribe(
        device => {
          console.log('Discovered' + JSON.stringify(device,null,2));
        //this.state.ngZone.run(()=>{
          devices.push(device)
          console.log(device)}
      );
    }

    async onDeviceDiscovered(device: any){
        console.log('Discovered' + JSON.stringify(device,null,2));
        //this.state.ngZone.run(()=>{
          devices.push(device)
          console.log(device)
        //})
      }
    handleChange = (event: any) => {
        const { value, name } = event.target;
        console.log("["+name+"]:"+ value );
        this.setState({ [name]: value });
  
        console.log(this.state);
    };
    render() {
        // Display title
        ReactDOM.render(module_title, document.getElementById('main_title'));

             return (
                 <IonPage>
                     
     
                     <IonContent>
                     <IonToolbar>                     
                        {/*<IonTitle>Bluetooth Testing</IonTitle>*/}
                         <IonButton onClick={this.Scan} slot="end">
                             <IonIcon icon={bluetooth} />
                             <p>Scan</p>
                         </IonButton>
                         </IonToolbar>
                         <IonList>
                             <IonCardContent >                            
                               { 
                               devices.map((device,i) =>  {
                               return (                        
                               <IonItem>
                                   {//alert("message :"+device)
                                   }
                                   <ul>
                                     <li>{device.name || 'Unnamed'}</li>
                                     <li>{device.id}</li>
                                     <li>{'RSSI: '+ device.rssi}</li> 
                                   </ul>
                               </IonItem> )}
                           ) }                          
                             </IonCardContent>
                         </IonList>
     
                           <IonRefresher slot="fixed" onIonRefresh={this.doRefresh}>
                             <IonRefresherContent
                               pullingIcon={chevronDownCircleOutline}
                               pullingText="Pull to refresh"
                               refreshingSpinner="circles"
                               refreshingText="Refreshing...">
                             </IonRefresherContent>
                           </IonRefresher>
                       </IonContent>
                 </IonPage>
     
             )
         }

};
export default BluetoothScannerModule;