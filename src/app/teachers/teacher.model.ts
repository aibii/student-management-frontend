export interface Teacher {
    id?: number;
    firstName: string;
    lastName: string;
    dateOfBirth: string; // or you can use 'Date' type, but it depends on how the date is being sent from the backend.
    address: string;
    phoneNumber: string;
}