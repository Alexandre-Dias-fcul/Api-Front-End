import { account } from './account';
import { address } from './address';
import { contact } from './contact';

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
    isActive: boolean

    address: address[],
    contact: contact[],
    account: account,
} 