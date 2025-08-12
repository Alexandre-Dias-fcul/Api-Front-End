import { participant } from './participant';
export interface appointmentWithParticipants {
    id: number
    title: string;
    description: string;
    date: Date;
    hourStart: string;
    hourEnd: string;
    status: number;
    participants: participant[];
}