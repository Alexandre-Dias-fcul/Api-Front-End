import { entityLink } from './entitylink';
export interface staffAll {
    id: number,
    name: {
        firsname: string,
        middleNames: string[],
        lastName: string
    }
    dateOfBirth: Date | null,
    gender: string,
    hiredDate: Date | null,
    dateOfTermination: Date | null,
    photoFileName: string,
    isActive: boolean,
    entityLink?: entityLink
}