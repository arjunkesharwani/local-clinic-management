import { Injectable } from '@nestjs/common';
import { connectDb } from '../connection/dataSource';
import { Appointment, status } from './entities/appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

const repo = connectDb.getRepository(Appointment);
@Injectable()
export class AppointmentRepository {
  constructor() {}

  async create(data: CreateAppointmentDto) {
    console.log('😁', data);
    return await repo.save(data);
  }

  async findAppointmentsByDoctorAndDate(
    doctorId: string,
    date: Date,
    status: status,
  ): Promise<Appointment[]> {
    return await repo
      .createQueryBuilder('appointment')
      .where('appointment.doctorId = :doctorId', { doctorId })
      .andWhere('appointment.status = :status', { status })
      .andWhere('DATE(appointment.preferredDate) = :date', {
        date: date.toISOString().split('T')[0],
      })
      .getMany();
  }

  async update(id: string, data: UpdateAppointmentDto) {
    await repo.update(id, data);
    return await repo.findOne({ where: { id } });
  }

  async remove(id: string) {
    await repo.softDelete(id);
  }
}
