import {Object} from 'parse/react-native';
import Parse from 'parse';

class UserEntity extends Parse.Object {
    email: string ;
    firstName: string;
    lastName: string;
    deviceType: string;
    contactNumber: string;
    tenant: string;
    rolesAssigned: string;
    userRegDate: string;
    lastSignInDate: string;
    activeStatus: string;


    // Instance properties go in an initialize method
    constructor(attrs:Map<string, string>) {
        super("UserEntity");
        this.email = attrs.get("email")!;
        this.firstName = attrs.get("firstName")!;
        this.lastName = attrs.get("lastName")!;
        this.deviceType = attrs.get("deviceType")!;
        this.contactNumber = attrs.get("contactNumber")!;
        this.tenant = attrs.get("tenant")!;
        this.rolesAssigned = attrs.get("rolesAssigned")!;
        this.userRegDate = attrs.get("userRegDate")!;
        this.lastSignInDate = attrs.get("lastSignInDate")!;
        this.activeStatus = attrs.get("activeStatus")!;
    }
    getObject() {
        return this;
    }
}
export default UserEntity;