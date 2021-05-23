//https://docs.parseplatform.org/js/guide/
// "serverURL": "http://172.28.0.3:1337/parse",
// "appId": "myappID",
// "masterKey": "mymasterKey",
// "appName": "MyDashboard"

// Map Parse Object with format
// email- "abc@example.com", firstName- "FirstName", lastName- "LastName",
// deviceType- "Android/SAMSUNG_A50", contactNumber- 35800000, tenant- "HotelFinland", 
// rolesAssigned- "default,resident,office", userRegDate- 12110313072019, lastSignInDate- 12121213072020,
// activeStatus- true 

import React, { createRef, useState, RefObject } from 'react';
import { setAsyncStorage } from 'parse';

import Parse from 'parse';
//import Parse from 'parse/react-native'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonButton, IonItemOption, IonInput, IonList, IonIcon, IonToast, IonItemOptions, IonItemSliding } from '@ionic/react';
import { alarm } from 'ionicons/icons';
import UserEntity from './UserEntity';
import { attachProps } from '@ionic/react/dist/types/components/utils';
import ReactDOM from 'react-dom';

//import ParseReact from 'parse-react/react-native';

const AsyncStorage = require('react-native').AsyncStorage;
setAsyncStorage(AsyncStorage);
Parse.initialize("myappID","myJsKey","mymasterKey");//, "YOUR_JAVASCRIPT_KEY");
Parse.serverURL = 'http://silli.genera.fi:1337/parse'

Parse.Object.registerSubclass('UserEntity', UserEntity);

type Props = { props?: {
} };
type State = { showToast1: boolean, showHide: boolean};

const module_title = <IonTitle>Parse GraphQL Storage</IonTitle>;

class ParseGraphQLStorage extends React.Component<Props, State>  {
    emailRef: React.RefObject<HTMLIonInputElement>;
    firstNameRef: React.RefObject<HTMLIonInputElement>;
    lastNameRef: React.RefObject<HTMLIonInputElement>;
    deviceTypeRef: React.RefObject<HTMLIonInputElement>;
    contactNumberRef: React.RefObject<HTMLIonInputElement>;
    tenantRef: React.RefObject<HTMLIonInputElement>;
    rolesAssignedType: React.RefObject<HTMLIonInputElement>;
    userRegDateType: React.RefObject<HTMLIonInputElement>;
    lastSignInDateType: React.RefObject<HTMLIonInputElement>;
    userActiveStatusType: React.RefObject<HTMLIonInputElement>;


  
    

    constructor(props:Props) {
        super(props)
       // this.weightInputRef = createRef();
       // this.heightInputRef = createRef();
       this.emailRef= createRef<HTMLIonInputElement>();
       this.firstNameRef= createRef<HTMLIonInputElement>();
       this.lastNameRef=createRef<HTMLIonInputElement>();
       this.deviceTypeRef=createRef<HTMLIonInputElement>();
       this.contactNumberRef=createRef<HTMLIonInputElement>();
       this.tenantRef=createRef<HTMLIonInputElement>();
       this.rolesAssignedType=createRef<HTMLIonInputElement>();
       this.userRegDateType=createRef<HTMLIonInputElement>();
       this.lastSignInDateType=createRef<HTMLIonInputElement>();
       this.userActiveStatusType=createRef<HTMLIonInputElement>();
       this.state  = {
        showToast1: false,
        showHide: false
       };

      }

/*     handleChange = (event: any) => {
        const { value, name } = event.target;
        console.log("["+name+"]:"+ value );
        this.setState({ [name]: value });

        console.log(this.state);
    }; */

    setShowToast1 = (boolVal:boolean) => {
        this.setState({ 'showToast1': boolVal });
    };
    setShowHide = () => {
        if (this.state.showHide ) {
            this.setState({ 'showHide': false });
        } else {
            this.setState({ 'showHide': true });
        }
    };

    createUser() {
        try {
            const exUser = new Map<string,string>([["email","abc@example.com"], ["firstName", "FirstName"], ["lastName", "LastName"],
            ["deviceType", "Android/SAMSUNG_A50"], ["contactNumber", "35800000"], ["tenant", "HotelFinland"], 
            ["rolesAssigned", "default,resident,office"], ["userRegDate", "12110313072019"], ["lastSignInDate", "12121213072020"],
            ["activeStatus", "true"]]);
            try {
                if(this.emailRef===null ||this.emailRef===undefined ||
                    this.emailRef.current?.value===null || 
                    this.emailRef.current?.value===undefined) {                
                    var currUser = new UserEntity(exUser).getObject()!;
                } else { //create based on input
                    const exUserNew = new Map<string,string>([["email",String(this.emailRef.current.value)], ["firstName", String(this.firstNameRef.current?.value)], ["lastName", String(this.lastNameRef.current?.value)],
                    ["deviceType", String(this.deviceTypeRef.current?.value)], ["contactNumber", String(this.contactNumberRef.current?.value)], ["tenant", String(this.tenantRef.current?.value)], 
                    ["rolesAssigned", String(this.rolesAssignedType.current?.value)], ["userRegDate", String(this.userRegDateType.current?.value)], ["lastSignInDate", String(this.lastSignInDateType.current?.value)],
                    ["activeStatus", String(this.userActiveStatusType.current?.value)]]);
                    var currUser = new UserEntity(exUser).getObject()!;
                }
            }catch(error) {
                var currUser = new UserEntity(exUser).getObject()!;
            }

            currUser.save().then((returnVal) => {
                // Execute any logic that should take place after the object is saved.
                alert("current user saved"+returnVal.id);
            }, (error) => {
                // Execute any logic that should take place if the save fails.
                // error is a Parse.Error with an error code and message.
                alert('Failed to create new object, with error code: ' + error.message);
            });
        } catch(error) {
            console.log(error)
        }
    }

    updateCurrentDate() {
        const today = new Date();
        const currentTime = today.getUTCSeconds()+today.getUTCMinutes()+today.getUTCHours()+today.getUTCDate()+today.getUTCMonth()+today.getUTCFullYear()
        let query = new Parse.Query(UserEntity);
        try {
            //if(this["emailRef"]!==undefined){}
            if(this.emailRef===null ||this.emailRef===undefined ||
                this.emailRef.current?.value===null || 
                this.emailRef.current?.value===undefined) {alert("Hey");}
        } catch (error) {
            alert(error);
            return;
            //const [showToast1, setShowToast1]  = useState(true);
            //IonToast.showShortBottom('Successfuly wrote to device')
        }

        query.equalTo("email", this.emailRef.current?.value);
        query.find({
            success:function(retrievedUser:UserEntity) {
                // The object was retrieved successfully.
                console.log("retrieved value :"+retrievedUser.toJSON());
                retrievedUser.lastSignInDate = String(currentTime);
                retrievedUser.save().then((retrievedUser) => {
                }, (error) => {
                    // The object was not updated successfully.
                    // error is a Parse.Error with an error code and message.
                    alert(error);
                });
            }
        });
    }

    deleteUser() {
        try {
            if(this.emailRef.current?.value!==null){}
        } catch (error) {
            console.log("cannot find and delete user by email given ");
            return;
        }
        let query = new Parse.Query(UserEntity);
        query.equalTo("email", this.emailRef.current?.value);
        query.find({
            success:function(retrievedUser:UserEntity) {
            // The object was retrieved successfully.
            console.log("retrieved value :"+retrievedUser.toJSON());
            retrievedUser.destroy().then((retrievedUser) => {

            }, (error) => {
                // The object was not updated successfully.
                // error is a Parse.Error with an error code and message.
                alert(error);
            });
        }
        });
    }

    getUser() {
        try {
            if(this.emailRef.current?.value!==null){}
        } catch (error) {
            console.log("cannot find and delete user by email given ");
            return;
        }
        let query = new Parse.Query(UserEntity);
        query.equalTo("email", this.emailRef.current?.value);
        query.find({
            success:function(retrievedUser:UserEntity) {
            // The object was retrieved successfully.
            console.log("retrieved value :"+retrievedUser.toJSON());
            }
        });
    }

    render() {
              // Display title
              ReactDOM.render(module_title, document.getElementById('main_title'));

        return (
            <IonPage>
                <IonContent>
                <IonList lines="full"  class="ion-page ion-padding">
                {/* <IonItemSliding>
                <IonItemOptions side="start"> */}
                <IonItemOption expandable >
                    <IonItem detail={true}  onClick={this.setShowHide}>
                        <IonLabel position="stacked">Create User</IonLabel> 
                        <IonIcon color="success" item-right name="isGroupShown(i) ? 'arrow-dropdown' : 'arrow-dropright'"></IonIcon>                       
                        <IonInput placeholder="Email" ref={this.emailRef} id="email-input"></IonInput>
                        <IonInput placeholder="First Name" ref={this.firstNameRef} id="firstname-input"></IonInput>
                        <IonInput placeholder="Last Name" ref={this.lastNameRef} id="lastname-input"></IonInput>
                        <IonInput placeholder="Device Type" ref={this.deviceTypeRef} id="devicetype-input"></IonInput>
                        <IonInput placeholder="Contact Number" ref={this.contactNumberRef} id="contactnumber-input"></IonInput>
                        <IonInput placeholder="Tenant (Service Provider)" ref={this.tenantRef} id="tenant-input"></IonInput>
                        <IonInput placeholder="Roles Assigned to user" ref={this.rolesAssignedType} id="rolesassigned-input"></IonInput>
                        <IonInput placeholder="User Registration Date" ref={this.userRegDateType} id="userregdate-input"></IonInput>
                        <IonInput placeholder="Last Sign in Date" ref={this.lastSignInDateType} id="lastsignindate-input"></IonInput>
                        <IonInput placeholder="User Active Status" ref={this.userActiveStatusType} id="useractivestatus-input"></IonInput>

                        <IonButton onClick={this.createUser} id="createUser" color="success">Create User</IonButton>
                    </IonItem>
                    </IonItemOption>
                    {/* </IonItemOptions>
                    </IonItemSliding> */}
                    <IonItem>
                        <IonLabel>Update User Session Info</IonLabel>
                        <IonButton onClick={this.updateCurrentDate} id="updateCurrentDate" color="success">Update User Session Info</IonButton>
                        <IonToast
                            isOpen={this.state.showToast1}
                            onDidDismiss={() => this.setShowToast1(false)}
                            message="Your settings have been saved."
                            duration={200}
                        />
                    </IonItem>
                    <IonItem>
                        <IonLabel>Delete User</IonLabel>
                        <IonInput placeholder="User email" ref={this.emailRef} id="email-input"></IonInput>
                        <IonButton onClick={this.deleteUser} id="deleteUser" color="success">Delete User</IonButton>
                    </IonItem>
                    </IonList>
                </IonContent>
            </IonPage>
        )
    }
    
}
export default ParseGraphQLStorage;