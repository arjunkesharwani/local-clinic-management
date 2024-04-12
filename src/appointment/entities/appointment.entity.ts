import { Doctor } from '../../doctor/entities/doctor.entity';
import { Patient } from '../../patient/entities/patient.entity';
import { baseEntity } from '../../utility/base-entity';
import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';

export enum status {
  SCHEDULED = 'SCHEDULED',
  CANCELED = 'CANCELED',
  COMPLETED = 'COMPLETED',
}

@Entity()
export class Appointment extends baseEntity {
  @Column()
  preferredDate: Date;

  @Column({ default: 'SCHEDULED' })
  status: status;

  @Column({type: 'jsonb'})
  bookedSlot: string[];

  @ManyToOne(() => Patient, (patient) => patient.appointments)
  @JoinColumn({ name: 'patientId' })
  patientId: Patient;

  @ManyToOne(() => Doctor, (doctor) => doctor.appointments)
  @JoinColumn({ name: 'doctorId' })
  doctorId: Doctor;
}
