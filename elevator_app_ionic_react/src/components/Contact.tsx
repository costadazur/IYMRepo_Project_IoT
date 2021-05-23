import React, { useRef } from 'react';
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
    IonImg,
  } from "@ionic/react";
//import { Platform, View, Text } from 'react-native';
//import { BleManager } from 'react-native-ble-plx;

//import { render } from '@testing-library/react';

class Contact extends React.Component  {

    state = {
        name: '',
        email: '',
        message: '',
    }

    handleChange = (event: any) => {
        const { value, name } = event.target;
        console.log("["+name+"]:"+ value );
        this.setState({ [name]: value });

        console.log(this.state);
    };

    sendMessage = () => {
        const enteredName = this.nameInputRef.current!.value;
        const enteredEmail = this.emailInputRef.current!.value;
        const enteredMessage = this.messageInputRef.current!.value;
        if(!enteredName || !enteredEmail ||!enteredMessage ) {
            this.setState({
                name: '',
                email: '',
                message: '',
                })
            return;
            }
        this.setState({ 'name': enteredName });
        this.setState({ 'email': enteredEmail });
        this.setState({ 'message': enteredMessage });
    }

    nameInputRef = useRef<HTMLIonInputElement>(null);
    emailInputRef = useRef<HTMLIonInputElement>(null);
    messageInputRef = useRef<HTMLIonInputElement>(null);

      render() {
        return (
            <IonPage>
                <IonHeader>
                <IonToolbar>
                    <IonImg src={require('../res/genera_logo_w_smaller.png')} />
                    <IonTitle>Contact Us</IonTitle>
                </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonItem>
                        <IonLabel position="floating">Name</IonLabel>
                        <IonInput name='name' ref={this.nameInputRef} id="name-input"></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Email</IonLabel>
                        <IonInput name='email' ref={this.emailInputRef} id="email-input"></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Message</IonLabel>
                        <IonInput name='message' ref={this.messageInputRef}  id="message-input"></IonInput> 
                    </IonItem>
                    <IonButton onClick={this.sendMessage}>Submit</IonButton>
                </IonContent>
            </IonPage>
        )
          

    }
};





export default Contact;    
/* 
            onIonBlur={this.state.email}
            <View style={styles.container}>
            <View style={styles.logoContainer}>
              <Image resizeMode='contain' style={styles.logo} source={require('../../assets/images/logo.png')} />
            </View>
            <Text style={styles.title}>Contact Us</Text>
            <FormLabel>Name</FormLabel>
            <FormInput value={this.state.name} onChangeText={(text) => this.updateFormInput('name', text)} />
            <FormLabel>Email</FormLabel>
            <FormInput value={this.state.email} onChangeText={(text) => this.updateFormInput('email', text)} />
            <FormLabel>Message</FormLabel>
            <FormInput value={this.state.message} onChangeText={(text) => this.updateFormInput('message', text)} />
              
            <Button
              onPress={this.sendMessage}
              title="Submit"
              large
              backgroundColor="#fe0000"
              buttonStyle={styles.button}
            />
          </View> */
/* const styles = new StyleSheet.({
    title: {
        fontSize: 22,
        marginLeft: 20,
        fontFamily: 'AlegreyaSansSC-Light',
    },
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
    },
    logoContainer: {
        maxHeight: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 170,
        maxHeight: 40
    },
    button: {
        marginTop: 20
    }
}) */