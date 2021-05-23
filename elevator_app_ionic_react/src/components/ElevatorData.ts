//import {  } from '@ionic/core';
//import { HttpClient } from '@ionic/react';
import 'rxjs/add/operator/map';

const config = {
    URL: "PARSE_SERVER_URL"
}
var elevatorData:JSON;
export class ElevatorData {
   state = {
      elevatorData:JSON = JSON.parse("")
   }
   // constructor(public http: HttpClient) {
   //     console.log('Hello JSONData Provider');
   // }

    //change to bluetooth for demo/local connection
    getLiftData() {
       fetch('http://silli.genera.fi/1337').then(response => response.json()).then(data => this.readLiftData(data));
    }

    async readLiftData(data:any) {
       {elevatorData: JSON.parse(data)}
    }


    //getRemoteData(){
    //    this.http.get('https://www.reddit.com/r/gifs/top/.json?limit=105sort=hot').subscribe((data: any) => {
    //        console.log(data);
    //    });
    //}

}