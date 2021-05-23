//https://github.com/wi3land/ionic-appauth-capacitor-demo/blob/master/src/app/core/auth.service.ts

import { Requestor, StorageBackend } from '@openid/appauth';
import { IonicAuth, Browser } from 'ionic-appauth';
import { Plugins, AppLaunchUrl } from '@capacitor/core';
import { isPlatform } from '@ionic/react'

const { App } = Plugins;

  export class AuthService extends IonicAuth  {

    constructor(
        requestor: Requestor,
        storage: StorageBackend,
        browser: Browser,
      ) {
        super(browser, storage, requestor);
    
        this.addConfig();
      }

      environment = {
        production: false,
        auth_config: {
          identity_client: 'examplemobile',
          identity_server: 'http://localhost:52652',
          redirect_url: 'com.appauth.demo://callback',
          end_session_redirect_url: 'com.appauth.demo://endSession',
          scopes: 'openid offline_access',
          usePkce: true
        }
      };

      public async startUpAsync() {
        if (isPlatform('capacitor')) {
          App.addListener('appUrlOpen', (data: any) => {
            if (data.url !== undefined) {
              //this.ngZone.run(() => {
                this.handleCallback(data.url);
              //});
            }
          });
        }
    
        super.startUpAsync();
      }

      private addConfig() {
        this.authConfig = this.environment.auth_config;
    
        if (!isPlatform('capacitor')) {
          this.authConfig.redirect_url = window.location.origin + '/implicit/authcallback';
          this.authConfig.end_session_redirect_url = window.location.origin + '/implicit/endsession';
        }
      }

      private handleCallback(callbackUrl: string): void {
        if ((callbackUrl).indexOf(this.authConfig?.redirect_url!) === 0) {
          this.AuthorizationCallBack(callbackUrl);
        }
        if ((callbackUrl).indexOf(this.authConfig?.end_session_redirect_url!) === 0) {
            this.EndSessionCallBack();
        }
      }

  }