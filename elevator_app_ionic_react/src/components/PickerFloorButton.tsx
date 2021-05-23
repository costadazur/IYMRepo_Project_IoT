import React from "react";
import { PickerColumn } from "@ionic/core";
import { IonPicker } from "@ionic/react";

/**
 * the component has three properties that are defined in this 
 * interface since we are using typescript
 */
interface _Props {
  isOpen : boolean
  onSave : Function
  onCancel : Function
}

const PickerFloorButton: React.FC<_Props> = ({onSave, onCancel, isOpen}) => {
const DayColumn = {
  name: "Day",
  options: [
    { text: "Monday", value: "Monday" },
    { text: "Tuesday", value: "Tuesday" },
    { text: "Wednesday", value: "Wednesday" },
    { text: "Thursday", value: "Thursday" },
    { text: "Friday", value: "Friday" }
  ]
} as PickerColumn;

const SessionTimeColumn = {
  name: "SessionTime",
  options: [
    { text: "Morning 8a - 12p", value: "Morning" },
    { text: "Afteroon 1p - 5p", value: "Afteroon" }
  ]
} as PickerColumn;
return (
  <div>
    <IonPicker
      isOpen={isOpen}
      columns={[DayColumn, SessionTimeColumn]}
      buttons={[
        {
          text: "Cancel",
          role: "cancel",
          handler: value => {
            onCancel()
          }
        },
        {
          text: "Confirm",
          handler: value => {
            onSave(value)
          }
        }
      ]}
    ></IonPicker>
  </div>
);
};

export default PickerFloorButton;