import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab5.css';
import GeolocationButton from '../components/GeolocationButton';

const Tab5: React.FC = () => {
  return (
    <GeolocationButton/>      
  );
};

export default Tab5;
