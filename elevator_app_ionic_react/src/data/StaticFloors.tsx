import React, {useState, useEffect} from "react";
import axios from 'axios';
//import "./../App.css";
import {Floor, initialiseFloor} from '../components/ElevatorJSONObject'
import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonItem, IonLabel, IonButton, IonList } from "@ionic/react";
//import {ElevatorCar}  from '../res/lift_layout.json';
import FloorItem from "../components/FloorItem";
import { error } from "console";
import { AxiosRequestor } from "../pages/AxiosService";
import { Redirect } from "react-router";

export interface IStaticFloorsData {
  floors: Floor[];
}
// const openFloorSelection = (selection:string) => {
function openFloorSelection (floorInp:Floor[], selection:string):any {
  //let url , credentials;     
  if(floorInp  == undefined){
    return;
  } else {
         return <Redirect to="/FloorSelectionPage"  />
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
  
}

export function DataFetching() {
  const [floors, setFloors] = useState<Floor[]>([initialiseFloor()]);
 


  useEffect(() => { 
    axios.get('http://localhost:3000/lift_layout.json', 
      { withCredentials: false,
        headers: {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }
      }).then(res  => {
    //fetch('http://localhost:8000/lift_layout.json').then(res  => {
      console.log(res)
      setFloors(res.data.floors as unknown as Floor[])})
      .catch(err => {
      console.log(err)
    })
  })

  return(
<div>
<IonRow>
   <IonList lines="none" className="ion-align-self-center">
      <IonItem detail={false} key="2">
        <IonLabel>
         <h1>Kamppi Metro - Zone A</h1>
        </IonLabel>
      </IonItem>

      <IonList lines="full">
        <IonLabel >
          <h2>Section A</h2>
        </IonLabel>   
        <IonItem detail={false} key="1l">                     
          <IonButton id="ib1" color="secondary" onClick={openFloorSelection(floors, "lobbyA_01")}>lobbyA_01</IonButton>
          <IonLabel>
            <h3>lobbyA_01</h3>
            <p>Kamppi Metro - Zone A - Lift lobbyA_01</p>
          </IonLabel>
        </IonItem>
        <IonItem detail={false} key="2l">                       
        <IonButton id="ib2" color="secondary">lobbyA_02</IonButton>
        <IonLabel>
            <h3>lobbyA_02</h3>
            <p>Kamppi Metro - Zone A - Lift lobbyA_02</p>
        </IonLabel>
        </IonItem> 
        <IonItem detail={false} key="3l">                  
        <IonButton id="ib3" color="secondary">lobbyA_03</IonButton>
        <IonLabel>
           <h3>lobbyA_03</h3>
           <p>Kamppi Metro - Zone A - Lift lobbyA_03</p>
        </IonLabel>
        </IonItem>     
      </IonList>

      <IonList lines="full">
        <IonLabel >
          <h2>Section B (Carpark)</h2>
        </IonLabel>   
        <IonItem detail={false} key="1c">                     
          <IonButton id="ib1" color="secondary">lobbyB_01</IonButton>
          <IonLabel>
            <h3>lobbyB_01</h3>
          </IonLabel>
        </IonItem>
        <IonItem detail={false} key="2c">                       
        <IonButton id="ib2" color="secondary">lobbyB_02</IonButton>
        <IonLabel>
            <h3>lobbyB_02</h3>
        </IonLabel>
        </IonItem>    
      </IonList>
   </IonList>
</IonRow>

</div>

  )
  return(
    <div>

          { floors.map((data, key) => ( 
            <IonRow>
              <IonList lines="none">
                <IonItem detail={false} key={key}>
                    <IonLabel>
                      <h3>{data.name}</h3>
                    </IonLabel>
                </IonItem>
                {data.elevators.map((elevatorcarsArr, elevatorcarsArrKey) => (
                  <IonList lines="none">
                    <IonItem detail={false} key={elevatorcarsArrKey}>
                      <IonLabel>
                        <h3>{elevatorcarsArr.carId}</h3>
                      </IonLabel>
                    </IonItem>              
                    <IonButton id={key+"_"+elevatorcarsArrKey} color="secondary">{elevatorcarsArr.carId}</IonButton>
                    </IonList>
                  ))
                }
              </IonList>
            </IonRow>
          ))
          }
    </div>
          )
}


interface FloorItemProps {
  floorProp: String;
  //sessions: Session[];
}

const StaticFloors:  React.FC<FloorItemProps> = ({ floorProp }) => {
  return (
<>
            
        
         {/*  {floors.map((data, key) => {
            return (
              <div key={key}>
              <IonItem id={data.location_id}>
                <IonLabel>
            <h3>About {data.locationZones.toString}/{data.liftId}</h3>
                </IonLabel>
              </IonItem>
            <IonButton color="secondary">{data.building}</IonButton>
              
                {data.about +
                  " , " +
                  data.building +
                  " ," +
                  data.liftId +
                  ", " +
                  data.name}
              </div>
            );
          })}   */} 
                   
</>
  );
};
export default StaticFloors;