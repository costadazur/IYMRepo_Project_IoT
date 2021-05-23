import React from 'react';
import {IonRow,IonCol,IonCard,IonCardContent } from '@ionic/react';

const BmiResults: React.FC<{onCalculatedBmi:number|string;}> = props => {

    return (
      <IonRow>
        <IonCol>
          <IonCard>
            <IonCardContent>
              <h2>{props.onCalculatedBmi}</h2>
            </IonCardContent>
          </IonCard>
        </IonCol>
      </IonRow>
    );
}
export default BmiResults;