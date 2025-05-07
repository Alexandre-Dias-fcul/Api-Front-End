export interface agent {
    id: number,
    name: {
        firstName: string,
        middleNames: string[],
        lastName: string
    }
    dateOfBirth: Date,
    gender: string,
    hiredDate: Date,
    dateOfTermination: Date,
    photoFileName: string,
    role: number,
    supervisorId: number | null,
    isActive: boolean
}

