import { entityLink } from "./entitylink"

export interface userAll {
    id: number,
    name: {
        firstName: string,
        middleNames: string[],
        lastName: string
    }
    dateOfBirth: Date | null,
    gender: string,
    photoFileName: string,
    isActive: boolean,
    entityLink?: entityLink
}