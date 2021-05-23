import React from 'react';
import { Redirect, Route, RouteComponentProps } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonSplitPane,
  IonPage, 
  IonVirtualScroll,
  IonButtons,
  IonMenuButton,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList, IonBackButton, IonSlides, IonSegment, IonFab, IonFabButton
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle, star, person } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import Tab4 from './pages/Tab4';
import Tab5 from './pages/Tab5';
import AuthPage from './pages/AuthPage';
import QRScanPage from './pages/QRScanPage';
import ContactPage from './components/Contact';
import MainMenuPage from './components/MainMenu';
import Landing from './pages/Landing';
import DarkSelector from './pages/DarkSelector';
import Home from './pages/Home';
import LoginRedirect from './pages/Redirect';
import EndRedirect from './pages/EndRedirect';
import { AuthService } from './pages/AuthMainPage';
import BLEManagerPage from './components/BLEManagerPage';
import BluetoothSerialExample from './components/BluetoothSerialExample'
import BluetoothScannerModule from './components/BluetoothScannerModule'
import SideMenu from './components/SideMenu'
import SendFeedbackForm from './pages/SendFeedbackForm'
import PickerExample from './pages/PickerExample'
import {IonListExample} from './pages/IonListExample'
import IonGridExample from './pages/IonGridExample'
import LiftSelectionPage from './pages/LiftSelectionPage'
import FloorSelectionPage from './pages/FloorSelectionPage'
import lift_layout from './res/lift_layout.json';


//import Home from './pages/Home';
//import Home from './pages/Login';
//select location / building / zone / lift/ floor

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';


const App: React.FC = () => (

  <IonApp>
    
    <IonReactRouter>
        {/*<IonSplitPane  contentId="main">*/}
        <SideMenu></SideMenu>
        {/*</IonSplitPane>*/}
        <div className="ion-page"  id="main-content">
        <IonHeader>

          <IonToolbar>            
        <IonButtons slot="start">
            <IonMenuButton menu="start"></IonMenuButton>
          </IonButtons>
          <IonTitle id="main_title"/>
          </IonToolbar>
          </IonHeader>
          {/*<IonPage >*/}
          <IonContent class="ion-padding" scrollX={true}>

      <IonTabs >
        <IonRouterOutlet>
        
          <Route path="/tab1" component={Tab1} exact={true} />
          <Route path="/tab2" component={Tab2} exact={true} />
          <Route path="/tab3" component={Tab3} />
          <Route path="/tab4" component={Tab4} />
          <Route path="/tab5" component={Tab5} />
          <Route path="/contactPage" component={ContactPage} />
          <Route path="/qrScanPage" component={QRScanPage} />
          <Route path="/mainMenuPage" component={MainMenuPage} />
          <Route path="/authPage" component={AuthPage} />
          <Route path="/darkSelector" component={DarkSelector} />
          <Route path="/sendFeedbackForm" component={SendFeedbackForm} />
          <Route path="/pickerExample" component={PickerExample} />
          <Route path="/ionListExample" component={IonListExample} />
          <Route path="/ionGridExample" component={IonGridExample} />
          <Route path="/LiftSelectionPage" component={LiftSelectionPage} />
          <Route path="/FloorSelectionPage/:selectedLiftInp" component={FloorSelectionPage} />

          {/* <Route path="/blemanagerpage" component={BLEManagerPage} />
          <Route path="/bluetoothSerialExample" component={BluetoothSerialExample} />*/}
          <Route path="/bluetoothscannermodule" component={BluetoothScannerModule} exact />
          <Route path="/landing" component={Landing} exact />
          <Route path="/loginredirect" component={LoginRedirect} exact />
          <Route path="/endredirect" component={EndRedirect} exact />
          {/* <Route exact path="/" render={() => <Redirect to="/landing" />} /> */}
          {/* <Route exact path="/" render={() => <Redirect to="/bluetoothSerialExample" />} /> */}
          {/* <Route path="/" render={() => <Redirect to="/tab1" />} exact={true} />  */}
          <Route path="/" render={() => <Redirect to="/authPage" />} exact={true} />
        </IonRouterOutlet>

        <IonTabBar slot="bottom" class="ion-tab-button" >
        <IonTabButton tab="tab1" href="/LiftSelectionPage">
            <IonIcon icon={triangle} />
            <IonLabel>LiftSelectionPage</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/tab2">
            <IonIcon icon={ellipse} />
            <IonLabel>QR Scan</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/tab3">
            <IonIcon icon={square} />
            <IonLabel>Tab 3</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab4" href="/tab4">
            <IonIcon icon={triangle} />
            <IonLabel>GraphQL_Parse</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab5" href="/tab5">
            <IonIcon icon={ellipse} />
            <IonLabel>Geolocation</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab6" href="/sendFeedbackForm">
            <IonIcon icon={ellipse} />
            <IonLabel>SendFeedbackForm</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab7" href="/bluetoothscannermodule">
            <IonIcon icon={star} />
            <IonLabel>BLEScan</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab8" href="/pickerExample">
            <IonIcon icon={star} />
            <IonLabel>PickerExample</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab9" href="/ionListExample">
            <IonIcon icon={ellipse} />
            <IonLabel>IonListExample</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab10" href="/ionGridExample">
            <IonIcon icon={triangle} />
            <IonLabel>IonGridExample</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab11" href="/tab1">
            <IonIcon icon={triangle} />
            <IonLabel>BMI Calculator</IonLabel>
          </IonTabButton>
        </IonTabBar></IonTabs >
        <IonFab vertical="top" horizontal="end" edge slot="fixed">
          <IonFabButton href="/LiftSelectionPage" >
          <IonIcon icon={triangle} />
          </IonFabButton>
        </IonFab>

      {/*</IonPage>*/}
      {/*</IonSplitPane>*/}
      </IonContent>
      </div>
    </IonReactRouter>    
    
  </IonApp>

);

export default App;
