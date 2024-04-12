import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { Doctor } from './entities/doctor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from '../appointment/entities/appointment.entity';
import { DoctorRepository } from './doctor.repository';
import { AppointmentService } from 'src/appointment/appointment.service';
import { AppointmentRepository } from 'src/appointment/appointment.repository';

@Module({
  controllers: [DoctorController],
  providers: [DoctorService, DoctorRepository, AppointmentService, AppointmentRepository],
  imports: [TypeOrmModule.forFeature([Doctor, Appointment])],
})
export class DoctorModule {}
