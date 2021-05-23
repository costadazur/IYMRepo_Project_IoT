import React, {useRef, useState} from 'react';
import {IonAlert, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonGrid} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
// eslint-disable-next-line
import {calculatorOutline, refreshOutline } from 'ionicons/icons';
import BmiControls from '../components/BMIControls';
import BMIResults from '../components/BMIResults';
import QRScanPage from './QRScan';
import ReactDOM from 'react-dom';

const module_title = <IonTitle>BMI Calculator</IonTitle>;

const Tab1: React.FC = () => {
  const [calculatedBmi, setCalculatedBmi] = useState<number>();
  const [error, setError] = useState<string>();

  const weightInputRef = useRef<HTMLIonInputElement>(null);
  const heightInputRef = useRef<HTMLIonInputElement>(null);

  const calculateBmiReact = () => { 
    const enteredWeight = weightInputRef.current?.value;
    const enteredHeight = heightInputRef.current!.value;

    if(!enteredHeight || !enteredWeight ||+enteredHeight<0 ||+enteredWeight<0) {
      setError('Please enter valid number.');
      return;
    }


    const bmi = +enteredWeight / (+enteredHeight * +enteredHeight);
    console.log(bmi);
    setCalculatedBmi(bmi)

    if(isNaN(bmi)) {
      alert("NaN please check inputs!");
      return;
    }

  };

  const resetInputsReact = () => { 
    weightInputRef.current!.value = '';
    heightInputRef.current!.value = '';

  };

  const clearError = () => {
    setError('');
  };


  // Display title
  ReactDOM.render(module_title, document.getElementById('main_title'));
  
  return (
    /*<script src="app.js" defer></script> <div className="ion-text-center ion-margin">*/
    <React.Fragment>
    <IonAlert isOpen={!!error} message={error} buttons={[ {text: 'Okay', handler: clearError }]}></IonAlert>
    <IonPage>
      {/*<IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1 - BMI calculator</IonTitle>
        </IonToolbar>
      </IonHeader>*/}
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar color="primary">
            <IonTitle size="large">Tab 1(BMI calculator)</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent class="ion-padding">
          <IonItem>
            <IonLabel position="floating">Your weight</IonLabel>
            <IonInput ref={weightInputRef} id="weight-input"></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Your height</IonLabel>
            <IonInput ref={heightInputRef} id="height-input"></IonInput>
          </IonItem>
          <IonGrid className="ion-text-center ion-margin">
            <BmiControls onCalculate={calculateBmiReact} onReset={resetInputsReact}></BmiControls>
            {/* <IonRow> 
              <IonCol>
             <IonButton onClick={calculateBmiReact} id="calculate-btn"><IonIcon slot="start" icon={calculatorOutline} ></IonIcon>
             Calculate</IonButton>
             </IonCol>
             <IonCol>        
             <IonButton onClick={resetInputsReact}  id="reset-btn"><IonIcon slot="start" icon={refreshOutline} ></IonIcon>
             Reset</IonButton>
             </IonCol>
             </IonRow> */}
             {calculatedBmi ? ( 
               <BMIResults onCalculatedBmi={calculatedBmi}></BMIResults>
             /*<IonRow>
               <IonCol >
                 <IonCard>
                   <IonCardContent>
                    <h2>{calculatedBmi}</h2>
                   </IonCardContent>
                </IonCard>
               </IonCol>
             </IonRow>*/):null}
          </IonGrid>
          <IonGrid>
            <QRScanPage>??????????</QRScanPage>
          </IonGrid>
          
        </IonContent>
        
        <ExploreContainer name="Tab 1 page" />
      </IonContent>
    </IonPage>
    </React.Fragment>
  );
};


//doesnt work body not loaded yet
// const calculateBtn   = document.getElementById("calculate-btn");
// const resetBtn   = document.getElementById("reset-btn");
// console.log(calculateBtn);
// console.log(resetBtn);
// eslint-disable-next-line
const resetInputs = () => {
  const heightInput = document.getElementById('height-input');
  const weightInput = document.getElementById('weight-input');
  (heightInput as HTMLInputElement).value = '';
  (weightInput as HTMLInputElement).value = '';
}


// eslint-disable-next-line
const calculateBmi = () => {


  const calculateBtn   = document.getElementById("calculate-btn");
  const resetBtn   = document.getElementById("reset-btn");
  console.log(calculateBtn);
  console.log(resetBtn);


  const heightInput = document.getElementById('height-input');
  const weightInput = document.getElementById('weight-input');
  const resultArea = document.getElementById('result');

  console.log((heightInput as HTMLInputElement).value);
  console.log((weightInput as HTMLInputElement).value);
  var enteredHeight:number = Number.parseInt((heightInput as HTMLInputElement).value);
  var enteredWeight:number = Number.parseInt((weightInput as HTMLInputElement).value);
  const bmi = enteredWeight / (enteredHeight * enteredHeight);
  console.log(bmi);

  if(isNaN(bmi)) {
    alert("NaN please check inputs!");
    return;
  }

  const resultElement = document.createElement("ion-card");
  resultElement.innerHTML = `
  <ion-card-content>
    <h2>${bmi}</h2>
  </ion-card-content>`;
  

  resultArea?.appendChild(resultElement);



//if(calculateBtn!==null||calculateBtn!==undefined) {
 //  calculateBtn?.addEventListener('click', calculateBmi);
//}

}
export default Tab1;
