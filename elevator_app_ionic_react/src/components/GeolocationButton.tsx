import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { IonButton, IonLoading, IonToast, IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

interface LocationError {
    showError: boolean;
    message?: string;
}
const module_title = <IonTitle>Geolocation (GPS)</IonTitle>;

const GeolocationButton: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<LocationError>({ showError: false });
    const [position, setPosition] = useState<Geoposition>();

    const getLocation = async () => {
        setLoading(true);

        try {
            const position = await Geolocation.getCurrentPosition();
            setPosition(position);
            setLoading(false);
            setError({ showError: false });
        } catch (e) {
            setError({ showError: true, message: e.message });
            setLoading(false);
        }
    }

    // Display title
    ReactDOM.render(module_title, document.getElementById('main_title'));
    
    return (
        <IonPage>
        {/*<IonHeader>
            <IonToolbar>
                <IonTitle>GeolocationButton</IonTitle>
            </IonToolbar>
        </IonHeader>*/}
        <IonContent>
            <IonLoading
                isOpen={loading}
                onDidDismiss={() => setLoading(false)}
                message={'Getting Location...'}
            />
            <IonToast
                isOpen={error.showError}
                onDidDismiss={() => setError({ message: "", showError: false })}
                message={error.message}
                duration={3000}
            />
            <IonButton color="primary" onClick={getLocation}>{position ? `${position.coords.latitude} ${position.coords.longitude}` : "Get Location"}</IonButton>
            </IonContent>
            </IonPage>
    );
};

export default GeolocationButton;