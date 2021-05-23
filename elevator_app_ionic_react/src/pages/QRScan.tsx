//https://itnext.io/building-an-ionic-application-using-react-61dc60c59e7b
//https://enappd.com/blog/how-to-make-ionic-apps-in-react-using-capacitor/26/
import React from "react";
import {
  useIonViewWillEnter,
  useIonViewWillLeave,
  useIonViewDidEnter,
  useIonViewDidLeave,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
} from "@ionic/react";
//import { QRScanner, QRScannerStatus } from "@ionic-native/qr-scanner/ngx";
import { BarcodeScanner, BarcodeScanResult } from "@ionic-native/barcode-scanner";
import { render } from "@testing-library/react";

declare let window: any; // Don't forget this part!

//constructor(private qrScanner: QRScanner) { }

const QRScanPage: React.FC = (props) => {

  const openScanner = async () => {
    const data = await BarcodeScanner.scan();
    console.log(`Barcode data: ${data.text}`);
  };

  useIonViewWillEnter(() => {
    console.log("ionViewWillEnter event fired");
  });

  useIonViewWillLeave(() => {
    console.log("ionViewWillLeave event fired");
  });

  useIonViewDidEnter(() => {
    console.log("ionViewDidEnter event fired");
    //prepare();
    //showCamera();
  });

  useIonViewDidLeave(() => {
    console.log("ionViewDidLeave event fired");
    hideCamera();
  });

  // Optionally request the permission early
  /*
  function prepare () {

    qrScanner
      .scan()
      .then((status: BarcodeScanResult) => {
        if (status.text != null) {
          console.log("Not "+status.text);
        } else if (status.cancelled) {
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
          console.log(
            "camera permission was permanently denied, grant the permission"
          );
        } else {
          console.log(
            "permission was denied, but not permanently. You can ask for permission again at a later time."
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
*/
  // Run this function.
  function showCamera() {
    //qrScanner.scan();
    //this.domElement.classList.add('has-camera');

    // const scanSub = qrScanner.scan().subscribe((text: string) => {
    //   scanSub.unsubscribe();
    //   onScan(text);
    // });
  };

  const hideCamera = () => {
    //qrScanner.scan().;
    //document.domElement.classList.remove('has-camera');
  };

  const onScan = (text: string) => {
    hideCamera();
    console.log("Scanned:", text);
  };

/*   render(this) {
      showCamera();
  }; */

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
  <IonTitle>QRScanPage</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent> 
      <IonButton onClick={openScanner}>Scan barcode</IonButton>
      </IonContent>
    </IonPage>
  );
};
export default QRScanPage;
