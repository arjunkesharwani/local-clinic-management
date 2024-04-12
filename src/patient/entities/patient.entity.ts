import { Appointment } from '../../appointment/entities/appointment.entity';
import { baseEntity } from '../../utility/base-entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Patient extends baseEntity {
  @Column()
  name: string;

  @Column()
  dateOfBirth: Date;

  @Column()
  contactDetails: string;

  @OneToMany(() => Appointment, (appointment) => appointment.patientId)
  appointments: Appointment[];
}
