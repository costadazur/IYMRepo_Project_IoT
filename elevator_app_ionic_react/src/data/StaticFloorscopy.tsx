import React from "react";
//import "./../App.css";
//import * from '../components/Floor'
import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonItem, IonLabel, IonButton } from "@ionic/react";
import {customer}  from '../res/lift_layout.json';
import FloorItem from "../components/FloorItem";
import { render } from "@testing-library/react";


interface FloorItemProps {
  floorProp: String;
  //sessions: Session[];
}

const StaticFloorscopy:  React.FC<FloorItemProps> = ({ floorProp }) => {
  return (
<>
            
        
          {customer.customerBuildings[0].buildingZones[0].zoneFloors.map((data, key) => {
            return (
              <div key={key}>
              <IonItem id={data.location_id}>
                <IonLabel>
            <h3>About {data.elevators.toString}/{data.liftId}</h3>
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
          })}   
                   
</>
  );
};
export default StaticFloorscopy;