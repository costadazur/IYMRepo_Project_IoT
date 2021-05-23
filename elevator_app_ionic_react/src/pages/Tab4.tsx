import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab4.css';
import ParseGraphQLStorage from '../components/ParseGraphQLStorage';

const Tab4: React.FC = () => {
  return (
    <ParseGraphQLStorage />
  );
};

export default Tab4;
