import React from 'react';
import {IonRow,IonCol,IonButton,IonIcon } from '@ionic/react';
import {calculatorOutline,refreshOutline} from 'ionicons/icons';

const BmiControls: React.FC<{onCalculate:()=> void; onReset:() => void;}> = props => {

    return (
      <IonRow>
        <IonCol>
          <IonButton onClick={props.onCalculate} id="calculate-btn">
            <IonIcon slot="start" icon={calculatorOutline}></IonIcon>
            Calculate
          </IonButton>
        </IonCol>
        <IonCol>
          <IonButton onClick={props.onReset} id="reset-btn">
            <IonIcon slot="start" icon={refreshOutline}></IonIcon>
            Reset
          </IonButton>
        </IonCol>
      </IonRow>
    );

};
export default BmiControls;