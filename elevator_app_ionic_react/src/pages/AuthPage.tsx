//https://codequs.com/p/SkP2Dyjsf/build-a-react-native-app-and-authenticate-with-oauth-2-0
//https://github.com/wi3land/ionic-appauth-capacitor-demo
//https://github.com/openid/AppAuth-JS#readme
//https://github.com/FormidableLabs/react-native-app-auth/tree/main/Example


import React, { useState, useCallback} from "react";
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
  isPlatform,
} from "@ionic/react";
import Keycloak from 'keycloak-js'; //must match server http://silli.genera.fi:4433/auth/js/keycloak.js

//import { authorize, refresh, revoke } from 'react-native-app-auth';

import {authorize, prefetchConfiguration,refresh, revoke, AuthConfiguration, AuthorizeResult} from 'react-native-app-auth';
import * as importReactNativeApp from 'react-native-app-auth';
//import { AuthorizationServiceConfiguration } from "@openid/appauth";
import { Provider } from "@angular/core";
import { isNullOrUndefined } from "util";
import ReactDOM from "react-dom";
import App from "../App";



class AuthPage extends React.Component  {

    state = {
        hasLoggedInOnce: false,
        idToken: '',
        accessToken: '',
        accessTokenExpirationDate: '',
        tokenToRevoke: '',
        refreshToken: '',
    }


      //http://silli.genera.fi:4433/auth/realms/master
    initOptions = {
        url: 'http://silli.genera.fi:4433/auth', 
        realm: 'master', 
        clientId: 'mobileapp', 
        onLoad: 'login-required'}
   // let keycloak:Keycloak.KeycloakInstance = Keycloak(this.initOptions);
    //keycloak.init();
    
    

    // react-native-app-auth base config

    config = {
        auth0: {

            issuer: 'http://silli.genera.fi:4433/auth/realms/master',
            clientId: 'mobileapp',
            redirectUrl: 'http://localhost:3000/authPage',
            scopes: ['openid', 'profile', 'email', 'offline_access'],
            additionalParameters: {},
        }
    };
    temp: Provider = [];
    defaultAuthState = {
        hasLoggedInOnce: false,
        provider: this.temp,
        accessToken: '',
        accessTokenExpirationDate: '',
        refreshToken: ''
    };

     async authorisedRec():Promise<Keycloak.KeycloakInstance> {
        //alert("authorisedRec is called");
        let initOptions = {
            url: 'http://silli.genera.fi:4433/auth', 
            realm: 'master',
            enableLogging: true,
            clientId: 'mobileapp',
            redirectUrl: isPlatform('capacitor') ? 'com.appauth.demo://callback' : window.location.origin + '/loginredirect', //'http://localhost:3000/home',
            end_session_redirect_url: isPlatform('capacitor') ?  'com.appauth.demo://endSession' : window.location.origin + '/endredirect',
            nLoad: 'login-required'}
        localStorage.setItem("isLogin", String(false));
        let keycloak:Keycloak.KeycloakInstance = Keycloak(initOptions);
        keycloak.init({ onLoad: 'login-required' }).success((auth) => {
          //  alert("Auth value:"+auth)
            if (!auth) {
                alert("Window reload");
              //window.location.reload();
              ReactDOM.render(<App />, document.getElementById('root'));
            } else {
          //      alert("Authenticated");
              console.log("Authenticated");
            }
          //  alert("After Auth value:"+auth);
            //alert("Value of keycloak value:"+JSON.stringify(keycloak));
            this.state.accessToken = isNullOrUndefined(( keycloak).token)?'':( keycloak).token+'';
            this.state.accessTokenExpirationDate = isNullOrUndefined(( keycloak).idTokenParsed?.exp)?'':( keycloak).idTokenParsed?.exp+'';
            this.state.hasLoggedInOnce = true;
            this.state.refreshToken = isNullOrUndefined(( keycloak).refreshToken)?'':( keycloak).refreshToken+'';
            ReactDOM.render(<App />, document.getElementById('root'));
            localStorage.setItem("isLogin", String(true));
            localStorage.setItem("react-token", keycloak.token!);
            localStorage.setItem("react-refresh-token", keycloak.refreshToken!);
            sessionStorage.setItem('authentication', keycloak.token!);
            sessionStorage.setItem('refreshToken', keycloak.refreshToken!);
            //alert("Setting timeout");
            //to regenerate token on expiry
            setTimeout(() => {
                keycloak.updateToken(70).success((refreshed) => {
                    if (refreshed) {
                        //alert('Token refreshed' + refreshed);
                        console.debug('Token refreshed' + refreshed);
                    } else {
                        const tokenParsed = keycloak.tokenParsed?.exp == undefined?0:keycloak.tokenParsed?.exp;
                        const timeskew =keycloak.timeSkew== undefined?0:keycloak.timeSkew;
                            //alert('Token not refreshed, valid for '
                            //    + Math.round(tokenParsed + timeskew - new Date().getTime() / 1000) + ' seconds');
                            console.warn('Token not refreshed, valid for '
                                + Math.round(tokenParsed + timeskew - new Date().getTime() / 1000) + ' seconds');
                    }
                }).error((error) => {
                    //alert('Failed to refresh token : '+ error);
                    console.error('Failed to refresh token : '+ error);
                });     
            }, 60000)
        }).error((error) => {
            //alert("Authenticated Failed : "+error);
            console.error("Authenticated Failed : "+error);
        });
       return keycloak;
    }

    
    refresh = async () => {
        try {
          await refresh(this.config.auth0, this.state ).then(result => {
          this.setState({
            accessToken: result.accessToken || this.state.accessToken,
            accessTokenExpirationDate: result.accessTokenExpirationDate || this.state.accessTokenExpirationDate,
            refreshToken: result.refreshToken || this.state.refreshToken
          });

        });
    } catch(err) {
        console.log('Error', err);
    }
    };

    revoke = async () => {
        try {
          await revoke(this.config.auth0, this.state ).then(result => {
          this.setState({
            accessToken: '',
            accessTokenExpirationDate: '',
            refreshToken: '',
          });

        });
    } catch(err) {
        console.log('Error', err);
    }
    };

    authenticate = async (provider: any) => {
          try {           
            const keycloak = await this.authorisedRec();


          } catch (error) {
            alert('Failed to log in' + error.message);
            console.log(error)
          }
    } 

    old_authenticate = async () => {
    console.log("Before authorise : clientId: "+ this.config.auth0.clientId+", issuer: "+this.config.auth0.issuer+", redirectUrl: "+this.config.auth0.redirectUrl+", "+this.config.auth0.scopes);
    try{
      await authorize(this.config.auth0).then(result => {
          this.setState({
            hasLoggedInOnce: true,
            idToken: result.idToken,
            accessToken: result.accessToken,
            accessTokenExpirationDate: result.accessTokenExpirationDate,
            refreshToken: result.refreshToken,
          });

      });
    } catch(err) {
        console.log('Error', err);
    }
    };

    render() {
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Login Keycloak</IonTitle>
                    </IonToolbar>
                </IonHeader>
                {!!this.state.accessToken? (
                    <IonContent>
                        <IonItem>
                            <IonLabel>accessToken</IonLabel>
                            <IonInput>{this.state.accessToken}</IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel>accessTokenExpirationDate</IonLabel>
                            <IonInput>{this.state.accessTokenExpirationDate}</IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel>refreshToken</IonLabel>
                            <IonInput>{this.state.refreshToken}</IonInput>
                        </IonItem>
                    </IonContent>
                ): (
                    <IonTitle>{this.state.hasLoggedInOnce ? 'Goodbye' : 'Hello, stranger.'+ !this.state.accessToken=== ''  }</IonTitle>
                )}
                {this.state.accessToken === '' ?

                    <IonButton onClick={() =>this.authenticate('auth0')} id="Authorize" color="success">Authorize</IonButton>
                :<IonLabel></IonLabel>}
                {this.state.refreshToken !== '' ?<IonButton onClick={this.refresh} id="Refresh" color="success">Refresh</IonButton>:<IonLabel></IonLabel>}
                {this.state.accessToken !== '' ?<IonButton onClick={this.revoke} id="Revoke" color="success">Revoke</IonButton>:<IonLabel></IonLabel>}
            </IonPage>
        )
    }

          
};

/* auth = authorize({
    issuer: 'https://{yourOktaDomain}.com/oauth2/default',
    clientId: '{clientId}',
    redirectUrl: 'com.{yourReversedOktaDomain}:/callback'
}) */
/* {!!this.state.accessToken?  (
    <IonButton onClick={this.authenticate} id="Authorize" color="#017CC0">Authorize</IonButton>
):(<IonLabel></IonLabel>)}
{!!this.state.refreshToken? ( <IonButton onClick={this.refresh} id="Refresh" color="#24C2CB">Refresh</IonButton>):(<IonLabel></IonLabel>)}
{!!this.state.accessToken? (<IonButton onClick={this.revoke} id="Revoke" color="#EF525B">Revoke</IonButton>):(<IonLabel></IonLabel>)} */

/*     keycloak.init({initOptions.onLoad}).success((auth: any) => {

        if (!auth) {
            window.location.reload();
        } else {
            console.info("Authenticated");
        }
    }); */
//}

export default AuthPage;




