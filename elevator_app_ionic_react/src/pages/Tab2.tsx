import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';
import QRScanPage from './QRScanPage';

const Tab2: React.FC = () => {
  return (
    <QRScanPage/>
  );
};

export default Tab2;
