import { appointment } from "./appointment";

export interface participantWithAppointment {
    id: number;
    role: number;
    appointmentId: number;
    employeeId: number;
    appointment: appointment; // Optional reference to the appointment
}