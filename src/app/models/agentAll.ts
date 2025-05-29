import e from 'express';
import { account } from './account';
import { address } from './address';
import { contact } from './contact';
import { entitylink } from './entitylink';

export interface agentAll {
    id: number,
    name: {
        firstName: string,
        middleNames: string[],
        lastName: string
    }
    dateOfBirth: Date | null,
    gender: string,
    hiredDate: Date | null,
    dateOfTermination: Date | null,
    photoFileName: string,
    role: number,
    supervisorId: number | null,
    isActive: boolean,
    entityLink: entitylink

} 