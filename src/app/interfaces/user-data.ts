import { Role } from "./role";

export interface UserData{
    monogram: string;
    profilePicture: string;
}

export interface UserProfileData{
    firstName: string;
    lastName: string;
    email: string;
    jobTitle: string;
    age: number;
    currentSalary: string;
    expectedSalary: string;
    county: string;
    zipcode: string;
    city: string;
    address: string;
    Profile: Profile;
    Role: Role;
}

export interface Profile{
    phone: string;
    profilePicture: string;
    cvPath: string;
}