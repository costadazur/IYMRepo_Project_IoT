//https://itnext.io/building-an-ionic-application-using-react-61dc60c59e7b
//https://enappd.com/blog/how-to-make-ionic-apps-in-react-using-capacitor/26/
import React from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonLabel,
  IonItem,
  IonInput,
} from "@ionic/react";
//import { QRScanner, QRScannerStatus } from "@ionic-native/qr-scanner/ngx";
import { BarcodeScanner, BarcodeScannerOptions } from "@ionic-native/barcode-scanner";
import ReactDOM from "react-dom";

const module_title = <IonTitle>Ionic Barcode Scanner</IonTitle>;
//declare let window: any; // Don't forget this part!


class QRScanPage extends React.Component {
  state = {
    encodedText: '',
    encodeData: '',
    textToEncode: ''
  }

  handleChange = (event: any) => {
    const { value, name } = event.target;
    console.log("["+name+"]:"+ value );
    this.setState({ [name]: value });

    console.log(this.state);


  };

  render() {

    const scanCode = async () => {
      const options: BarcodeScannerOptions = {
        preferFrontCamera: false,
        showFlipCameraButton: true,
        showTorchButton: true,
        torchOn: false,
        prompt: 'Place a barcode inside the scan area',
        resultDisplayDuration: 500,
        formats: 'QR_CODE,PDF_417 ',
        orientation: 'landscape',
      };
      await BarcodeScanner.scan(options).then(barcodeData => {
        console.log('Barcode data', barcodeData);
        alert(JSON.stringify(barcodeData));
        this.setState({ encodedData: barcodeData });
        this.setState({ encodedText:barcodeData["text"] });
      }).catch(err => {
          console.log('Error', err);
        });
    };
      
      // alert(JSON.stringify(data));
      // this.setState({ encodedText: data.text })
      // const data = await BarcodeScanner.scan(options);
      // alert(JSON.stringify(data));
      // this.setState({ encodedText: data.text })

      // const data = await BarcodeScanner.scan(options);
      // alert(JSON.stringify(data));
      // this.setState({ encodedText: data.text })


    const generateCode = () => {
      BarcodeScanner.encode(BarcodeScanner.Encode.TEXT_TYPE, this.state.textToEncode)
        .then(data => {
          console.log(data);
          //this.setState({ encodeData: data.encodedData }); //encodedData
          const value = data
          const name = 'encodeData';
          this.setState({ [name]: value });
        }, err => {
          console.log("Error occured : " + err);
        });
    };

// Display title
ReactDOM.render(module_title, document.getElementById('main_title'));

    return (
      <IonPage>        
        <IonContent className="ion-padding">

          <h1>Click Button To Scan</h1>

          <IonButton onClick={scanCode} color="primary">
            Scan
          </IonButton>

          {
            this.state.encodedText ?
              (<div>
                <p>
                  Scanned Code Text : <b></b>
                </p>
                <p>
                  Scanned Code Format : <b></b>
                </p>
              </div>) : ''
          }

          <h1>Enter Value to Create QR code</h1>

          <IonItem>
            <IonLabel>Enter Text To Generate QR CODE</IonLabel>
            <IonInput name='textToEncode' value={this.state.encodeData} placeholder="Enter Input" onIonBlur={this.handleChange} clearInput></IonInput>
          </IonItem>



          <IonButton onClick={generateCode} color="success">
            Create QR
          </IonButton>

        </IonContent>
      </IonPage >
    );
  }

};
export default QRScanPage;
