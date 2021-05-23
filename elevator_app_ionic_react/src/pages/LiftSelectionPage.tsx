import React, { ReactNode } from "react";
import { Floor, ElevatorCar, CarProperties, initialiseFloor } from "../components/ElevatorJSONObject";
import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonTitle } from "@ionic/react";
import FloorItem from "../components/FloorItem";
import { getConfData } from '../data/dataApi';
import {FetchLayout} from '../data/StaticElevatorLayoutData';
import ReactDOM from "react-dom";
//import StaticFloors from '../data/StaticFloors'

// https://medium.com/maxime-heckel/asynchronous-rendering-with-react-c323cda68f41

const module_title = <IonTitle>Lift Selection</IonTitle>;

interface StateProps {
    floors: Floor;
    //speakerSessions: { [key: string]: Session[] };
  };
//interface SpeakerListProps extends  StateProps { };

class LiftSelectionPage extends React.Component<StateProps["floors"]> {
    state = {
        floors:initialiseFloor(),
        loading: true
    };

   // floors: Floor = initialiseFloor();
    async loadData() {
        this.setState(this.state.floors= (await getConfData()).floors)
        { //alert("values :"+this.state.floors)
        }
    }
       
    render() {
        // Display title
        ReactDOM.render(module_title, document.getElementById('main_title'));

        //const SpeakerList: React.FC<SpeakerListProps> = ({ StateProps["speakers"] });
        { //alert("before :"+this.state.floors)
    }
 //       this.loadData().then(res =>{ 
            //alert("values :"+JSON.stringify(this.state.floors))
 //   }); 
           // { alert("after :"+this.state.floors)}
            return (
                
                <IonPage id="elevator-list">
                    <IonContent fullscreen={true}>
                      <IonGrid fixed> {/* <IonGrid fixed> */}
                        {/* <IonRow> */}
                          <FetchLayout />
                    
                        

                        {/* this.state.floors.locationZones!.map((elevatorCar: ElevatorCar) => (
                            
                        //     <IonCol size="12" size-md="6" key={elevatorCar.carId}>

                        //     <FloorItem
                        //         key={elevatorCar.carId}
                        //         floor={elevatorCar}
                        //     />
                        //     </IonCol>
                        // )) */}
                    {/* </IonRow>  */}
                    </IonGrid>
                    </IonContent>
                </IonPage>
            );
        
    }
}

export default LiftSelectionPage;


/* class IonGridExample20 extends React.Component {
    render() {
        const users = ["user1", "user2", "user3"];

        return (
          <div className="IonGridExample20">
            <ul>
            {users.map((user,index) =>
                <li key={index}>{user}</li>
            )}
            </ul>
          </div>
        );
    }
} */
