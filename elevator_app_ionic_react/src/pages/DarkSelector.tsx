//https://dev.to/ibrahimawadhamid/ionic-react-manual-dark-mode-switch-3aad

import React from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonIcon, IonLabel, IonToggle} from "@ionic/react";
import { moon } from "ionicons/icons";
import ExploreContainer from "../components/ExploreContainer";
import "../theme/home.css";

const DarkSelector: React.FC = () => {
    const toggleDarkModeHandler = () => {
        document.body.classList.toggle("dark");
      };

      return (
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Blank</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList className="ion-margin-top">
              <IonItem>
                <IonIcon
                  slot="start" icon={moon} className="component-icon component-icon-dark" />
                <IonLabel>Dark Mode</IonLabel>
                <IonToggle slot="end" name="darkMode" onIonChange={toggleDarkModeHandler} />
              </IonItem>
            </IonList>
            <ExploreContainer name="" />
          </IonContent>
        </IonPage>
      );
    };
    
    export default DarkSelector;
    