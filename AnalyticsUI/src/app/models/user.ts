export interface User {
    uid: number;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    jobTitle: string;
    active: number;
    lastApp: number;
    lastPID: number;
    loginCount: number;
    lastLogin: Date;
    prevLogin: Date;
    isMHIUser: number;
    displayHeight: number;
    macroManagerQuickAccessPageID: number;
    architect340BQuickAccessPageID: number;
    gatewayQuickAccessPageID: number;
    dateAdded: Date;
    profileUpdated: Date;
}
