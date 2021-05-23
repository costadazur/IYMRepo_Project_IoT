export interface Customer {
  customer_id: string;
  customer_description: string;
  customerBuildings: Building[];
}

export interface Building {
  building_id: string;
  building_description: string;
  buildingZones: BuildingZone[];
}

export interface BuildingZone {
  zoneInBuilding_id: string;
  zoneInBuilding_description: string;
  zoneFloors: Floor[];
}

export interface Floor {
    location_id: string;
    name: string;
    icon: string;
    about: string;
    liftId: string;
    building: string;
    restricted: boolean;
    elevators: ElevatorCar[];
  }

  
export interface ElevatorCar {
    carId: string;
    carProperties: CarProperties;
    icon: string;
    about: string;
    restricted: boolean;
  }

export interface CarProperties {
    currentFloor: string;
    listOfFloors: string;
    floorsSelected: string;
    limitAccess: string;
  }

//   export interface Floor {
//     location_id: number;
//     name: string;
//     icon: string;
//     about: string;
//     liftId: string;
//     locationZones: string;
//     building: string;
//     restricted: boolean;
//   }
export function initialiseCustomer():Customer {
   

  var buildZone:BuildingZone = {
    zoneInBuilding_id: "",
    zoneInBuilding_description: "",
    zoneFloors: [initialiseFloor()]
  }


  var build:Building = {
    building_id: "",
    building_description: "",
    buildingZones: [buildZone]
  }


  var cust:Customer = {
    customer_id: "",
    customer_description: "",
    customerBuildings: [build]
  }
  return cust;
}

export function initialiseFloor():Floor  {

  var cp:CarProperties = {
    currentFloor:"",
    listOfFloors:"",
    floorsSelected:"",
    limitAccess:""
  }

  var ec:ElevatorCar = {
    carId:"0",
    icon:"",
    about:"",
    restricted:false,
    carProperties:cp
  }


  var floor:Floor = {    
    location_id:"0",
    name:"",
    icon:"",
    about:"",
    liftId:"",
    building:"",
    restricted:false,
    elevators: [ec]
  }
  return floor;
}