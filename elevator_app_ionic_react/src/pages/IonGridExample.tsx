import React,{Component, useState, Props} from 'react';
import { IonList, IonItem, IonLabel, IonInput, IonToggle, IonRadio, IonCheckbox, IonItemSliding, IonItemOption, IonItemOptions, IonContent, IonTitle, IonGrid, IonRow, IonCol, IonPage } from '@ionic/react';
import ReactDOM from 'react-dom';
import { analytics, grid } from 'ionicons/icons';

 const module_title = <IonTitle>Ionic Barcode Scanner</IonTitle>;   
    

class IonGridExample extends Component {
  
  myButtonList:String[] = [];

  constructor(props: any) {
    super(props);
    this.state = { myStr:String}      
  }

  loadButtonFunction():any{
     const addItem = "<IonCol> <IonIcon icon={triangle} /></IonCol>"

     this.myButtonList.push(addItem);
     this.myButtonList.push(addItem);
     this.myButtonList.push(addItem);
     this.myButtonList.push(addItem);
     this.myButtonList.push(addItem);
     this.myButtonList.push(addItem);
     this.myButtonList.push(addItem);

     return this.myButtonList;
  };

  render() {
    return (
    <IonPage>
      <IonContent>
          {/*-- List of Text Items --*/}

        {this.loadButtonFunction()}
        <IonGrid>
          {
            
            this.myButtonList.map((val, index) => {
              return (
                <IonRow key={index} >
                   <IonCol size="6" size-lg offset="3">       
                   </IonCol>
                  {/*val*/}
                </IonRow>
              );

            })
          }
        </IonGrid>

        <IonGrid>
          <IonList>
            <IonItem>
              <IonLabel>Pokémon Green</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Mega Man X</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>The Legend of Zelda</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Pac-Man</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Super Mario World</IonLabel>
            </IonItem>
          </IonList>
        </IonGrid>

        {/*-- List of Input Items --*/}
        <IonList>
          <IonItem>
            <IonLabel>Input</IonLabel>
            <IonInput></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel>Toggle</IonLabel>
            <IonToggle slot="end"></IonToggle>
          </IonItem>
          <IonItem>
            <IonLabel>Radio</IonLabel>
            <IonRadio slot="end"></IonRadio>
          </IonItem>
          <IonItem>
            <IonLabel>Checkbox</IonLabel>
            <IonCheckbox slot="start" />
          </IonItem>
        </IonList>

        {/*-- List of Sliding Items --*/}
        <IonList>
          <IonItemSliding>
            <IonItem>
              <IonLabel>Item</IonLabel>
            </IonItem>
            <IonItemOptions side="end">
              <IonItemOption onClick={() => {}}>Unread</IonItemOption>
            </IonItemOptions>
          </IonItemSliding>

          <IonItemSliding>
            <IonItem>
              <IonLabel>Item</IonLabel>
            </IonItem>
            <IonItemOptions side="end">
              <IonItemOption onClick={() => {}}>Unread</IonItemOption>
            </IonItemOptions>
          </IonItemSliding>
        </IonList>
      </IonContent>
  </IonPage>
    )
      }
};

export default IonGridExample;
