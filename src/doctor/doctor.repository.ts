import { Injectable } from '@nestjs/common';
import { connectDb } from '../connection/dataSource';
import { Doctor } from './entities/doctor.entity';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Appointment,
  status,
} from 'src/appointment/entities/appointment.entity';
import { AppointmentRepository } from 'src/appointment/appointment.repository';

const repo = connectDb.getRepository(Doctor);
@Injectable()
export class DoctorRepository {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: AppointmentRepository,
  ) {}

  async create(data: CreateDoctorDto) {
    return await repo.save(data);
  }

  async findOne(id: string) {
    return await repo.findOne({ where: { id } });
  }

  async update(id: string, data: UpdateDoctorDto) {
    await repo.update({ id: id }, data);
    return await repo.findOne({ where: { id } });
  }

  async remove(id: string) {
    return await repo.softDelete(id);
  }

  async findAll(): Promise<Doctor[]> {
    return await repo.find();
  }
}
