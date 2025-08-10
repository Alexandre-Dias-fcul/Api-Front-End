import { participantWithAppointment } from "./participantWithAppointment"

export interface agentParticipant {
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
    participants?: participantWithAppointment[]
} 