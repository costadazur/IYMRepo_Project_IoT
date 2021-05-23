import { Plugins } from '@capacitor/core';
//import { Schedule, Session } from '../models/Schedule';
import { Floor } from '../components/ElevatorJSONObject';
import { alarm } from 'ionicons/icons';
//import { Location } from '../models/Location';
import {promises as fs} from "fs";
import * as dataImp from './../res/lift_layout.json';
import FloorItem from '../components/FloorItem';

const { Storage } = Plugins;

const dataUrl = './../res/lift_layout.json';

//const locationsUrl = '/assets/data/locations.json';

const HAS_LOGGED_IN = 'hasLoggedIn';
//const HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
const USERNAME = 'username';

export const getConfData = async () => {
  const fsval = fs;
  //const fs = require('fs');

 // try {
  //   const pathOfDir = (await fsval.opendir("./")).path;
  //   console.log("data pathOfDir : "+pathOfDir);
  //   if (fsval.readFile(dataUrl)) {
  //     console.log("data file exists : "+dataUrl);
  //   }
  // } catch(err) {
  //   console.log("data file does not exists : "+dataUrl+ ", ");//+(await fs.readdir("./")).toString());
  //   console.error(err)
  // }

  // const response2  = await fetch(dataUrl);
  // const Res2 = await response2;
  // const jsonRes2 = Res2.json()
  // console.log(jsonRes2);


  const response = await Promise.all([
    fetch(dataUrl)]);//,

    //fetch(locationsUrl)]);
    const responseData = response as unknown as Floor[];
    responseData.map((data, key) => {

       // alert( key + data.about + " , " +data.building + " ," + data.liftId + ", " + data.icon);
      
    })
   

  //const responseData = await response[0];//.json();
  console.log("the response: " +JSON.stringify(response));
 //// const responseDataJson:any = responseData.json();
  //const schedule = responseData.schedule[0] as Schedule;
  //const sessions = parseSessions(schedule);
  console.log("the JSON response: " +JSON.stringify(responseData));
  const floorsArray:Floor[] = responseData
  //const floorsArray:Floor[] = responseData.floors as unknown as Floor[];
  console.log("getConfData called :" +JSON.stringify(floorsArray)); 
  const floors:Floor = floorsArray[0];  //HARDconst locations = await response[1].json() as Location[];
//   const allTracks = sessions
//     .reduce((all, session) => all.concat(session.tracks), [] as string[])
//     .filter((trackName, index, array) => array.indexOf(trackName) === index)
//     .sort();
console.log("getConfData data floors called :"+ floors);
  const data = {
    // schedule,
    // sessions,
    // locations,
    floors,
    // allTracks,
    // filteredTracks: [...allTracks]
  }
  return data;

}

export const getUserData = async () => {
  const response = await Promise.all([
    Storage.get({ key: HAS_LOGGED_IN }),
    //Storage.get({ key: HAS_SEEN_TUTORIAL }),
    Storage.get({ key: USERNAME })]);
  const isLoggedin = await response[0].value === 'true';
  //const hasSeenTutorial = await response[1].value === 'true';
  const username = await response[1].value || undefined;
  const data = {
    isLoggedin,
    //hasSeenTutorial,
    username
  }
  return data;
}

export const setIsLoggedInData = async (isLoggedIn: boolean) => {
  await Storage.set({ key: HAS_LOGGED_IN, value: JSON.stringify(isLoggedIn) });
}

// export const setHasSeenTutorialData = async (hasSeenTutorial: boolean) => {
//   await Storage.set({ key: HAS_SEEN_TUTORIAL, value: JSON.stringify(hasSeenTutorial) });
// }

export const setUsernameData = async (username?: string) => {
  if (!username) {
    await Storage.remove({ key: USERNAME });
  } else {
    await Storage.set({ key: USERNAME, value: username });
  }
}

/* function parseSessions(schedule: Schedule) {
  const sessions: Session[] = [];
  schedule.groups.forEach(g => {
    g.sessions.forEach(s => sessions.push(s))
  });
  return sessions;
} */
