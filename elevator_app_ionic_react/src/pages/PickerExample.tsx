import React,{Component, useState} from 'react';
import {pickerController, PickerOptions, PickerColumn, PickerColumnOption} from '@ionic/core';
import {  IonContent, IonButton, IonInput, IonToast, IonTitle, IonListHeader, IonList, IonItem, IonPicker, IonRefresher, IonRefresherContent, IonPage } from '@ionic/react';
import Header from '../components/Header';
import { CONFIG } from '../constants';
import ReactDOM from 'react-dom';
import { IonicAuth } from 'ionic-appauth';
import PickerFloorButton from '../components/PickerFloorButton';



type Props = { props: {
    match: any
} };
type State = { singleColumnPicker: boolean, isRefreshing: boolean, showLoading: boolean, isLoaded: boolean, articleBody: string, description: String, title: String, toastState: boolean}; //tags: Array<string>, error: any, value: any,
const module_title = <IonTitle>Lift Selection</IonTitle>;

// async function openPicker(numColumns = 1, numOptions = 5, columnOptions = defaultColumnOptions){
//     const picker = await pickerController.create({
//       columns: this.getColumns(numColumns, numOptions, columnOptions),
//       buttons: [
//         {
//           text: 'Cancel',
//           role: 'cancel'
//         },
//         {
//           text: 'Confirm',
//           handler: (value) => {
//             console.log(`Got Value ${value}`);
//           }
//         }
//       ]
//     });




    // await picker.present();
/*     function openPicker(){
        const ionPicker = IonPicker;

    } */


class PickerExample extends Component<Props,State>    {

     fruitsCol = {
        name: 'Fruits',
        options: [
          { text: 'Banana', value: 'ban' },
          { text: 'Apple', value: 'app' },
          { text: 'Guava', value: 'gua' },
          { text: 'Mango', value: 'man' },
        ],
      } as PickerColumn;
       vegsCol = {
        name: 'Vegetables',
        options: [
          { text: 'Cabbage', value: 'cab' },
          { text: 'Carrot', value: 'car' },
          { text: 'Potato', value: 'pot' },
          { text: 'Pumpkin', value: 'pum' },
          { text: 'Garlic', value: 'gar' },
        ],
      } as PickerColumn;
       cerealsCol = {
        name: 'Cereals',
        options: [
          { text: 'Corn', value: 'cor' },
          { text: 'Rice', value: 'ric' },
          { text: 'Wheat', value: 'whe' },
          { text: 'Barley', value: 'bar' },
        ],
      } as PickerColumn;
      

    //ionRefresherRef: React.RefObject<HTMLIonRefresherElement>
    constructor(props: any) {
        super(props);

        
        this.state = {
          //error: null,
          isLoaded: false, 
          isRefreshing: false,
          showLoading: false,                  
          //value: JSON.parse(""),
          articleBody: '',
          description: '',
          //tags: [],
          title: '',
          toastState: false,
          singleColumnPicker:false

        };
       
        //this.ionRefresherRef = React.createRef<HTMLIonRefresherElement>();
    }

    setSingleColumnPicker(arg0:boolean):boolean {
        this.setState((state) => ({ 'singleColumnPicker': arg0 }));
        return arg0;
    }

    getSingleColumnPicker():boolean {
        return this.state.singleColumnPicker
    }

    setCommonDefaultColumnOptions():PickerColumnOption[]  {
        let defaultColumnOptions: PickerColumnOption[] = [];
    
        defaultColumnOptions.push({text: "Dog", value:'Dog'});
        defaultColumnOptions.push({text: "Cat", value:'Cat'});
        defaultColumnOptions.push({text: "Bird", value:'Bird'});
        defaultColumnOptions.push({text: "Chinchilla", value:'Chinchilla'});
        defaultColumnOptions.push({text: "Lizard", value:'Lizard'});

        return defaultColumnOptions;

    }


    
    getColumnOptions(columnIndex: any, numOptions: any, columnOptions: any[]) {
        let options:PickerColumnOption[] = [];
        for (let i = 0; i < numOptions; i++) {
            let item ={}
            options.push({
            text: columnOptions[columnIndex][i % numOptions],
            value: i
            })
        }
    
        return options;
    }

    getColumns(numColumns: number, numOptions: number, columnOptions: PickerColumnOption[]) {
            let columns:PickerColumn[] = [];
            for (let i = 0; i < numColumns; i++) {
              columns.push({
                name: `col-${i}`,
                options: this.getColumnOptions(i, numOptions, columnOptions)
              });
            }
      
            return columns;
    }

    async openPicker(event: React.MouseEvent<HTMLIonButtonElement, MouseEvent>, numColumns = 1, numOptions = 5, columnOptions:PickerColumnOption[] = this.setCommonDefaultColumnOptions()){
        const picker = await pickerController.create({
          columns: this.getColumns(numColumns, numOptions, columnOptions),
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel'
            },
            {
              text: 'Confirm',
              handler: (value) => {
                console.log(`Got Value ${value}`);
              }
            }
          ]
        });
  
        await picker.present().then(result => {return ""});
      }

      async onDeviceDiscovered(device: any){
        console.log('Discovered' + JSON.stringify(device,null,2));
        //this.state.ngZone.run(()=>{
          //devices.push(device)
          console.log(device)
        //})
      }
      
/*       setController():Controller{
        <Controller
        as={
          <IonSelect placeholder="Select One">
            <IonSelectOption value="FEMALE">Female</IonSelectOption>
            <IonSelectOption value="MALE">Male</IonSelectOption>
          </IonSelect>
        }
        control={control}
        onChangeName="onIonChange"
        onChange={([selected]) => {
          console.log(selected.detail.value);
          return selected.detail.value;
        }}
        name="gender"
        rules={{ required: true }}
      /> 


      }*/

    doRefresh = () => {

        /* setTimeout(() => {
          this.setState(() => ({ 'isRefreshing': true }));
          if (this.ionRefresherRef.current) {
            this.ionRefresherRef.current.complete();
          }
        }, 500); */
      }
    
      /* setIsRefreshing(refreshing: boolean) {
        this.setState(() => ({ 'isRefreshing': refreshing }));
      }

      handleBodyChange = (articleBody: any) => {
        this.setState({ articleBody });
      };
 
      titleChange = (event: CustomEvent) => {
        
        this.setState({ title: event.detail.value });

      }
      descriptionChange = (event: CustomEvent) => {
       
        this.setState({ description : event.detail.value });
          
      } */
     /*  tagsChange = (event: any) => {
          
         let tags =  (event.target as HTMLInputElement).value.split(',');
        this.setState({ tags: tags });
          
      } */
/*       submitArticle = (tag: any) =>{ 
         
          let articleData = {
            "article": { 
                "title": this.state.title,
                "description": this.state.description,
                "body": this.state.articleBody,
                "tagList": this.state.tags
            }
          }        
        fetch(CONFIG.API_ENDPOINT+"articles", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Token "+ localStorage.getItem("token") ,
            },
            body: JSON.stringify(articleData)

        })
        .then(res => res.json())
        .then(
          (result) => {
                  
              this.setState({
                toastState: true,
                title: "",
                description: "",
                articleBody: "",
                tags: []
              })       

          },
    
          (error) => {
           console.error(error);
          }
        )
      } */
    render(){
        //const [singleColumnPicker, setSingleColumnPicker] = useState(false);
        //const [multiColumnPicker, setMultiColumnPicker] = useState(false);
        // Display title
       ReactDOM.render(module_title, document.getElementById('main_title'));
        return(
            <IonPage>
            
    <IonContent padding-top> 
        {/* <IonListHeader color="primary"></IonListHeader>*/}
    
    <IonList color="primary">
        {
         
                   <IonItem>
                       <IonButton onClick={() => {
                  this.setSingleColumnPicker(true);
            }} expand="block">Show Single Column Picker</IonButton>
                      {/* <IonButton expand="block" onClick={alert("")}>Show Single Column Picker</IonButton> */}
                   </IonItem>
        

        }
    </IonList>
    <IonPicker
        isOpen={this.state.singleColumnPicker}
        columns={[this.fruitsCol]}
        buttons={[
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              this.setSingleColumnPicker(false);
            },
          },
          {
            text: 'Confirm',
            handler: ({ Fruits }: any) => {
              this.setSingleColumnPicker(false);
              console.log('Selected fruit', Fruits.text);
              console.log('Value of selected fruit', Fruits.text);
            },
          },
        ]}
      ></IonPicker>

    </IonContent>

    </IonPage>
        )
    }


}
  
export default PickerExample;