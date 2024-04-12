import { Appointment } from '../../appointment/entities/appointment.entity';
import { baseEntity } from '../../utility/base-entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Doctor extends baseEntity {
  @Column()
  name: string;

  @Column()
  department: string;

  @Column()
  contactDetails: string;

  @Column({ type: 'jsonb' })
  availability: { day: string, startTime: string, endTime: string }[]

  @OneToMany(() => Appointment, (appointment) => appointment.doctorId)
  appointments: Appointment[];
}
