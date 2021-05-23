import React from 'react';
import '@ionic/react/css/display.css';
import {
    IonButton,
    IonMenu,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardContent,
  } from "@ionic/react";

interface DemoProps {
    /* you can define props type definitions here */
}
  
interface DemoState {
/* you can define state type definitions here */
}

class MenuCollapsable extends React.Component<DemoProps, DemoState> {
    //closeAll:any;
    //toggleFirst:any;
    refs:any;

    constructor(props: DemoProps) {
        super(props);
    }
    
    closeAll = () => {
        this.refs.run1.instance.hide();
        this.refs.run2.instance.hide();
        this.refs.run3.instance.hide();
    }
    toggleFirst = () => {
        this.refs.run1.instance.toggle();
    }
    
    render() {
        return (
            <div>

                <IonMenu>
                    <div className="mbsc-btn-group-block">
                        <IonButton onClick={this.toggleFirst}>Toggle first card</IonButton>
                        <IonButton onClick={this.closeAll}>Close all cards</IonButton>
                    </div>
                </IonMenu>
            
                <IonCard 
                    ref={this.refs.run1}
                >
                    <IonCardHeader>
                        <div>
                            <IonCardSubtitle className="mbsc-bold mbsc-txt-s">27/07/2018</IonCardSubtitle>
                            <div className="mbsc-bold">FRIDAY AFTERNOON RUN</div>
                            <div className="mbsc-grid mbsc-margin mbsc-txt-muted mbsc-bold mbsc-txt-s">
                                <div className="mbsc-row mbsc-no-padding">
                                    <div className="mbsc-col">5.43km</div>
                                    <div className="mbsc-col">5'44"/km</div>
                                    <div className="mbsc-col">30:45</div>
                                </div>
                            </div>
                        </div>
                    </IonCardHeader>
                    <IonCardContent className="mbsc-no-padding">
                        <img src="https://img.mobiscroll.com/demos/run-1.png" alt='' />
                        <div className="mbsc-btn-group-block">
                            <button className="mbsc-btn-primary">View details</button>
                            <button className="mbsc-btn-secondary">Share your run</button>
                        </div>
                    </IonCardContent>
                </IonCard>
                
                <IonCard  
                    ref={this.refs.run2}
                >
                    <IonCardHeader>
                        <div>
                            <IonCardSubtitle className="mbsc-bold mbsc-txt-s">30/07/2018</IonCardSubtitle>
                            <div className="mbsc-bold">MONDAY AFTERNOON RUN</div>
                            <div className="mbsc-grid mbsc-margin mbsc-txt-muted mbsc-bold mbsc-txt-s">
                                <div className="mbsc-row mbsc-no-padding">
                                    <div className="mbsc-col">4.28km</div>
                                    <div className="mbsc-col">4'12"/km</div>
                                    <div className="mbsc-col">26:41</div>
                                </div>
                            </div>
                        </div>
                    </IonCardHeader>
                    <IonCardContent className="mbsc-no-padding">
                        <img src="https://img.mobiscroll.com/demos/run-2.png" alt=''/>
                        <div className="mbsc-btn-group-block">
                            <button className="mbsc-btn-primary">View details</button>
                            <button className="mbsc-btn-secondary">Share your run</button>
                        </div>
                    </IonCardContent>
                </IonCard>
                
                <IonCard 
                    ref={this.refs.run3}
                >
                    <IonCardHeader>
                        <div>
                            <IonCardSubtitle className="mbsc-bold mbsc-txt-s">01/08/2018</IonCardSubtitle>
                            <div className="mbsc-bold">WEDNESDAY AFTERNOON RUN</div>
                            <div className="mbsc-grid mbsc-margin mbsc-txt-muted mbsc-bold mbsc-txt-s">
                                <div className="mbsc-row mbsc-no-padding">
                                    <div className="mbsc-col">7.02km</div>
                                    <div className="mbsc-col">3'59"/km</div>
                                    <div className="mbsc-col">37:41</div>
                                </div>
                            </div>
                        </div>
                    </IonCardHeader>
                    <IonCardContent className="mbsc-no-padding">
                        <img src="https://img.mobiscroll.com/demos/run-3.png" alt=''/>
                        <div className="mbsc-btn-group-block">
                            <button className="mbsc-btn-primary">View details</button>
                            <button className="mbsc-btn-secondary">Share your run</button>
                        </div>
                    </IonCardContent>
                </IonCard>

            </div>

);
}    
}
