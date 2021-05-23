// https://stackoverflow.com/questions/63680712/react-native-reading-data-from-bluetooth-thermometer
import React, { ReactNode, useState, useEffect, ReactElement, FunctionComponent } from "react";
import axios from 'axios';
import { Floor, ElevatorCar, CarProperties, initialiseFloor, Customer, initialiseCustomer } from "../components/ElevatorJSONObject";
import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonTitle, IonButton, IonItem, IonLabel, IonList } from "@ionic/react";
import FloorItem from "../components/FloorItem";
import { getConfData } from '../data/dataApi';
import {FetchDataElevatorUnit} from '../data/StaticElevatorLayoutData';
import ReactDOM from "react-dom";
import { useParams, useLocation } from "react-router-dom";
import { JsxElement } from "typescript";
import { render } from "@testing-library/react";
import { alarm } from "ionicons/icons";
import {BLE} from '@ionic-native/ble/ngx/index';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx'

//import StaticFloors from '../data/StaticFloors'

// https://medium.com/maxime-heckel/asynchronous-rendering-with-react-c323cda68f41

const module_title = <IonTitle>Floor Selection</IonTitle>;
let devices = new Array<any>();

interface StateProps {
    floors: Floor;
    selectedLift: string;
    //speakerSessions: { [key: string]: Session[] };
  };

 // MyCompFragment: FunctionComponent = () => {this.selectionPanel};
   //class MyComponent extends React.Component<Props, {}> {
  // function selectionPanel(elevatorCarData:ElevatorCar, ):JSX.Element {
  //   var element:JSX.Element = React.createElement("object");

  //    var floorIterator = 0;
  //    this.listOfFloors = elevatorCarData.carProperties.listOfFloors.split(',').map(String);
  //    this.numberOfFloors = this.listOfFloors.length;
  //    this.currentFloor = elevatorCarData.carProperties.currentFloor
  //    this.floorsSelected = elevatorCarData.carProperties.floorsSelected.split(',').map(String)
  //    this.limitAccess = elevatorCarData.carProperties.limitAccess.split(',').map(String)

     
     
  //     render() => { 
  //       return {
  //      this.listOfFloors.forEach(element => {
  //        floorIterator++;
  //        if (floorIterator % 2==1) {
  //          /* eslint-disable no-unused-expressions */
  //        <IonRow>          
  //             <IonCol >
  //             <IonButton id={"btn"+element}  color="secondary">{element}</IonButton> 
  //             </IonCol>        
  //        </IonRow>
 
  //        } else {
  //          /* eslint-disable no-unused-expressions */
  //          <IonCol>
  //             <IonButton id={"btn"+element}  color="secondary">{element}</IonButton> 
  //          </IonCol>
  //        }
  //      }
  //      )
  //     }
  //     };
    

 
  //  }
   

//class FloorSelectionPage extends React.Component<{}, {selectedLift: string, customerData:Customer},{selectedLift: string, customerData:Customer} >  {
class FloorSelectionPage extends React.Component<{selectedLiftInp: string, customerData:Customer}> {
   state = {
     selectedLift: this.props.selectedLiftInp,
     customerData:this.props.customerData,
     ble:BLE,
   };
   numberOfFloors: number;  //calculated from listOfFloors/layout
   currentFloor: string;
   floorsSelected: string[];
   limitAccess: string[];
   listOfFloors: string[];
   localNotifications: LocalNotifications = new LocalNotifications;
  
  constructor(props: Readonly<{selectedLiftInp: string, customerData:Customer}>) {
    super(props);
    //alert(JSON.stringify(props).split("selectedLiftInp:"));
    var split_str:string[] = JSON.stringify(props).split("selectedLiftInp\":\"");// split(",");
    split_str = split_str[1].split("\"");
    //alert("my split:'"+split_str[0]+"'");
    //split_str.map( element => {
     // alert("element :"+ element);

      //alert("values: "+ props["selectedLiftInp"] )
    //});

   
    //alert("my props"+props);
    

    this.numberOfFloors = 0; //calculated from listOfFloors/layout
    this.currentFloor = "";
    this.floorsSelected = ["",];
    this.limitAccess = ["",];
    this.listOfFloors = ["",];


    this.state = {
      // split_str[0]
      selectedLift: split_str[0],
      customerData:initialiseCustomer(),
      ble:BLE,
    };

    //const [selectedLift, setSelectedLift] = useState<String>(this.state.selectedLift);
    //const [customerData, setCustomer] = useState<Customer>(initialiseCustomer());
  }
  
  async Scan(){
    //devices = new Array<any>();
    const ble = new BLE();
    ble.scan([],15).subscribe(
      device => {
        console.log('Discovered' + JSON.stringify(device,null,2));
        alert('Discovered' + JSON.stringify(device,null,2))
      //this.state.ngZone.run(()=>{        
        devices.push(device)
        console.log(device)
        this.setState(devices)}
    );
    return devices;
  }

 sendSelectFloorReq(ec:ElevatorCar, selectedFloor:String, selectedLift:String):any {
     alert("sendSelectFloorReq was sent :"+selectedFloor+", from unit:" +selectedLift)
//Bluetoothscannermodule
     this.Scan().then(ret => alert("RET is:"+ret+", devices ... "+devices + "devices details: "+devices.length+", ... "+JSON.stringify(devices))

      
     
     ).then(ret =>           // Schedule a single notification
      this.localNotifications.schedule({
        id: 1,
        text: "List of devices and details : "+JSON.stringify(devices),
      }));

    
  }
  //function changeSelectedLift() {
    //alert("!!!!!!!!!!!!!!" + (""));
    //return this.state.selectedLift;
    //this.setState({selectedLift: selectedLift.value})
  //} 
     //state = {
    //     floors:initialiseFloor(),
    //     selectedElevator:"",
    //     loading: true
    // };const [customerData, setCustomer] = useState<Customer>(initialiseCustomer());

    
   // floors: Floor = initialiseFloor();
   //loop element
 
   setElevatorCarDataState(ec:ElevatorCar) {
    this.listOfFloors = ec.carProperties.listOfFloors.split(",")
    this.limitAccess = ec.carProperties.limitAccess.split(",")
    this.currentFloor = ec.carProperties.currentFloor
    this.floorsSelected = ec.carProperties.floorsSelected.split(",")
   }
       
    render() {
        // Display title
        ReactDOM.render(module_title, document.getElementById('main_title'));
        //const [selectedLift, setSelectedLift] = useState<String>(this.state.selectedLift);
        //const [customerData, setCustomer] = useState<Customer>(initialiseCustomer());
        //const LoadData = () => {
    
         // alert("this.state.selection"+this.state.selectedLift)
          
          // if (this.state.selectedLift!=null) {
         
      //  }    
      //  } catch(err) {
      //    console.log(err)
      //  }    
      // const [customerData, setCustomer] = useState<Customer>(initialiseCustomer());
       
       //useEffect(() => { 
        //alert(get())
        axios.get( 'http://silli.genera.fi/lift_layout.json',     //'http://localhost:3000/lift_layout.json', 
          { withCredentials: false,
            headers: {
              'Access-Control-Allow-Origin' : '*',
              'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
              'Access-Control-Allow-Headers' : 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Access-Control-Request-Headers',
              'Content-Type': 'application/json;charset=UTF-8',
            }
          }).then(res  => {
        //fetch('http://localhost:8000/lift_layout.json').then(res  => {

            console.log(JSON.stringify(res))
            //remove if check for dynamic loading
            if(this.state.customerData.customerBuildings[0].building_id=="") {
              this.setState({customerData :res.data.customer as unknown as Customer })
              //setCustomer(res.data.customer as unknown as Customer)
            }          
        }
          )
          .catch(err => {
          console.log(err)
        })
     // })
    
      return (
    
        <IonPage id="elevator-details">
          <IonContent className="ion-padding" fullscreen={true}>
              <IonGrid fixed>
                  {
                  this.state.customerData.customerBuildings.map((buildingsData, key) => ( 
                    buildingsData.buildingZones.map((buildingsZoneData, bzKey) => ( 
                      buildingsZoneData.zoneFloors.map((floorData, floorKey) => (
                        floorData.elevators.map((elevatorCarData, elevatorKey) => ( 
                        <>                        
                         { elevatorCarData.carId===this.state.selectedLift?        
                           <IonRow>
                             <IonList lines="none">
                              <IonItem detail={false} key={"bz"+bzKey}>
                                  <IonLabel>
                                    <h3>{buildingsData.building_description}</h3>
                                  </IonLabel>
                              </IonItem>
                              {this.setElevatorCarDataState(elevatorCarData)}
                              <IonList lines="full">
                                <IonLabel>
                                  <h2>{floorData.name}</h2> {/* Kamppi lobby main */}
                                </IonLabel>    
                                   

                                  <IonGrid  id={"section"+elevatorCarData.carId}>   
                                   
                                   {this.listOfFloors.map( (element, ind) => { 
                                      element = element.trim()
                                      var displayElement = element
                                      if(element.length==1) {
                                        displayElement = displayElement+"  "
                                      } else if(element.length==2) {
                                        displayElement = displayElement+" "
                                      }
                                      var isDisabled=false
                                      var selectedColour="secondary"
                                      var isSelectedCol = IonButton.propTypes?.fill
                                      //alert("for element:"+element.trim()+", limitaccess : "+this.limitAccess+ ", "+String(this.limitAccess.indexOf(element.trim())));
                                      if (this.limitAccess.indexOf(element)>=0){
                                        isDisabled=true
                                        selectedColour="dark"
                                      }
                                      //alert("for element:"+element+", floorselected : "+this.floorsSelected+ String(this.floorsSelected.indexOf(element)));
                                      if (this.floorsSelected.indexOf(element)>=0){
                                        selectedColour="success"
                                        isDisabled=true
                                       }
                                      if (this.currentFloor==element){
                                        selectedColour="warning"
                                      }

                                      if (Number(ind % 2)==0) {        
                                        /* eslint-disable no-unused-expressions */
                                      return(
                                             <>
                                             <IonRow id={"elementrow" + ind}></IonRow>                                             
                                               <IonCol >                                               
                                                 <IonButton  size="large" id={"btn" + element}  color={selectedColour} disabled={isDisabled} onClick={()=>{this.sendSelectFloorReq(elevatorCarData,element, this.state.selectedLift)}} ><IonLabel>{element}</IonLabel></IonButton>
                                               </IonCol>
                                             </>        
                                             
                                      )
                              
                                      } else {
                                        /* eslint-disable no-unused-expressions */
                                        return(
                                            <>
                                            <IonCol >                                              
                                              <IonButton size="large" id={"btn"+element}  color={selectedColour} disabled={isDisabled} onClick={()=>{this.sendSelectFloorReq(elevatorCarData,element, this.state.selectedLift)}}><IonLabel>{element}</IonLabel></IonButton> 
                                            </IonCol>
                                            </>
                                        )
                                      }
                                      
                                   }
                                   
                                   )}
                                    

                                  </IonGrid>  


                              </IonList>
                            </IonList>
                           </IonRow>
                         :"" }  
                        </>
                        ))
                      ))
                    )) 
                  ))}
               
             </IonGrid>
           </IonContent>
        </IonPage>
    );

                                 
                      
        
    }
}

export default FloorSelectionPage;



