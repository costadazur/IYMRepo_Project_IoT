import React, {useState, useEffect} from "react";
import axios from 'axios';
//import "./../App.css";
import {Floor, Customer, initialiseCustomer, ElevatorCar} from '../components/ElevatorJSONObject'
import { IonPage, IonContent, IonRow, IonCol, IonItem, IonLabel, IonButton, IonList } from "@ionic/react";
//import {customer}  from '../res/lift_layout.json';
import FloorItem from "../components/FloorItem";
import { error } from "console";
import { AxiosRequestor } from "../pages/AxiosService";
import { Redirect, Route } from "react-router";
import ReactDOM from "react-dom";

export interface IStaticFloorsData {
  customer: Customer;
}
// const openFloorSelection = (selection:string) => {
function openFloorSelection (customerDataInp:Customer|undefined, selection:string):any {
  alert("Button cklicked :"+selection+","+JSON.stringify(customerDataInp));
  //let url , credentials;     
  if(customerDataInp  == undefined){
    return;
  } else {    
         //return <FetchDataElevatorUnit {...selection } />
         //return <Redirect  to={"/FloorSelectionPage/"+selection}  />
         //return <Redirect  to={"/FloorSelectionPage/"} key={selection}  />
        // return <Route path="/FloorSelectionPage" render={() => <Redirect to="/FloorSelectionPage" />}></Route>
        window.open("/FloorSelectionPage/"+selection, "_blank")
         //ReactDOM.render(FetchDataElevatorUnit(selection), document.getElementById('root') )
  }
    //url = CONFIG.API_ENDPOINT + '/users/login';
  //   credentials = {
  //     "user": {
  //       "email": this.state.email,
  //       "password": this.state.password
  //   }
  //   }

  // } else {
  //   url = CONFIG.API_ENDPOINT + '/users';
  //   credentials = {
  //     "user": {
  //       "email": this.state.email,
  //       "password": this.state.password,
  //       "username": this.state.username
  //   }
  //   }
  // <IonButton id={"btn"+elevatorKey} href={"/FloorSelectionPage/"+elevatorCarData.carId} onClick={() => openFloorSelection(customerData, elevatorCarData.carId)} color="secondary">{elevatorCarData.carId}</IonButton>
  
}

export function FetchLayout() {
  const [customerData, setCustomer] = useState<Customer>(initialiseCustomer());
 
  useEffect(() => { 
    axios.get( 'http://silli.genera.fi/lift_layout.json',  //'http://localhost:3000/lift_layout.json', 
      { withCredentials: false,
        headers: {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Access-Control-Allow-Headers' : 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Access-Control-Request-Headers',
        'Content-Type': 'application/json;charset=UTF-8',
        }
      }).then(res  => {        
    // not used fetch('http://localhost:8000/lift_layout.json').then(res  => {
      console.log(res)
      if(customerData.customer_id=="") {
        setCustomer(res.data.customer as unknown as Customer)
      }
    }
      )
      .catch(err => {
      console.log(err)
    })
  })

  return(
    <div key="lift-selection-layout">
          { customerData.customerBuildings.map((buildingsData, key) => ( 
             buildingsData.buildingZones.map((buildingsZoneData, bzKey) => ( 
              <IonRow id={"row"+bzKey}>
                <IonList lines="none" key={JSON.stringify(buildingsZoneData)}>
                  <IonItem detail={false} id={"bz"+bzKey}>
                      <IonLabel id={"lb"+bzKey}>
                        <h3>{buildingsData.building_description}</h3>
                      </IonLabel>
                  </IonItem>
                  {buildingsZoneData.zoneFloors.map((floorData, floorKey) => (
                      <IonList lines="full" key={JSON.stringify(floorData)}>
                        <IonLabel id={"fklabel"+floorKey}>
                          <h2>{floorData.name}</h2>
                        </IonLabel>
                        {floorData.elevators.map((elevatorCarData, elevatorKey) => ( 
                          <>   
                        <IonItem detail={false} id={"ed"+elevatorKey}>                                
                        <IonButton id={"btn"+elevatorKey} href={"/FloorSelectionPage/"+elevatorCarData.carId} color="secondary">{elevatorCarData.carId}</IonButton>      
                        <p slot="end">
                        <IonLabel id={"fklist"+floorKey}>
                            {elevatorCarData.carId}
                          </IonLabel>
                        </p>
                        </IonItem>      
                        </>             
                        ))
                        }
                      </IonList>
                    ))
                  }
                </IonList>
              </IonRow>
             ))
            ))
          }
    </div>
  )
}


interface FloorItemProps {
  floorProp: String;
  //sessions: Session[];
}

export function FetchDataElevatorUnit( selectedElevator:string) {
  const [customerData, setCustomer] = useState<Customer>(initialiseCustomer());
  useEffect(() => { 
    axios.get('http://silli.genera.fi/lift_layout.json', //'http://localhost:3000/lift_layout.json', 
      { withCredentials: false,
        headers: {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }
      }).then(res  => {
    //fetch('http://localhost:8000/lift_layout.json').then(res  => {
      console.log(res)
      if(customerData.customerBuildings[0].building_id=="") {
        setCustomer(res.data.customer as unknown as Customer)
      }
    }
      )
      .catch(err => {
      console.log(err)
    })
  })

  return(
    <div>
          { customerData.customerBuildings.map((buildingsData, key) => ( 
            
             buildingsData.buildingZones.map((buildingsZoneData, bzKey) => ( 
              buildingsZoneData.zoneFloors.map((floorData, floorKey) => (
                floorData.elevators.map((elevatorCarData, elevatorKey) => ( 
              <>
                { elevatorCarData.carId===selectedElevator? 
                   
                <IonRow>
                  <IonList lines="none">
                    <IonItem detail={false} key={"bz"+bzKey}>
                        <IonLabel>
                          <h3>{buildingsData.building_description}</h3>
                        </IonLabel>
                    </IonItem>
                    <IonList lines="full">
                          <IonLabel>
                            <h2>{floorData.name}</h2> {/* Kamppi lobby main */}
                          </IonLabel>    
                            <>   
                          <IonItem detail={false} key={"ed"+elevatorKey}>                                
                          <IonButton id={"btn"+elevatorKey} onClick={openFloorSelection(customerData, elevatorCarData.carId)} color="secondary">{elevatorCarData.carId}</IonButton>      
                          <IonLabel>
                              <h3>{elevatorCarData.carId}</h3>
                            </IonLabel>
                          </IonItem>      
                          </>  
                          </IonList>
                </IonList>
              </IonRow>
                :"" }  
              </>
                    ))
                        ))
                 ))       

            ))
          }
        
    </div>
  )
}