import React from 'react';
import { Floor, ElevatorCar } from './ElevatorJSONObject';
import { IonCard, IonCardHeader, IonItem, IonLabel, IonAvatar, IonCardContent, IonList, IonButton } from '@ionic/react';


interface FloorItemProps {
    floor: ElevatorCar;
    //sessions: Session[];
  }
  
  const FloorItem: React.FC<FloorItemProps> = ({ floor}) => {
    return (
      <>
        <IonCard className="speaker-card">
          <IonCardHeader>
           {/* <IonItem button detail={false} lines="none" className="speaker-item" routerLink={`/tabs/speakers/${speaker.id}`}>
              <IonAvatar slot="start">                  
                <img src={process.env.PUBLIC_URL + speaker.profilePic} alt="Speaker profile pic" />
              </IonAvatar>
              <IonLabel>
                 <h2>{speaker.name}</h2> */}
                {/* <p>{speaker.title}</p> */}
              {/* </IonLabel>
            </IonItem> */}
          </IonCardHeader>
  
          <IonCardContent>
            <IonList lines="none">
              {/* {sessions.map(session => (
                <IonItem detail={false} routerLink={`/tabs/speakers/sessions/${session.id}`} key={session.name}>
                  <IonLabel>
                    <h3>{session.name}</h3>
                  </IonLabel>
                </IonItem>
              ))} */}
              <IonItem detail={false} routerLink={`/tabs/speakers/${floor.carId}`}>
                <IonLabel>
            <h3>About {floor.carProperties.currentFloor}/{floor.carProperties.listOfFloors.length}</h3>
                </IonLabel>
              </IonItem>
            <IonButton color="secondary">{floor.carId}</IonButton>
            </IonList>
          </IonCardContent>
        </IonCard>
      </>
    );
  };
  
  export default FloorItem;