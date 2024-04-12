import { Module, forwardRef } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { Appointment } from './entities/appointment.entity';
import { Doctor } from '../doctor/entities/doctor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from '../patient/entities/patient.entity';
import { AppointmentRepository } from './appointment.repository';

@Module({
  controllers: [AppointmentController],
  providers: [AppointmentService, AppointmentRepository],
  imports: [TypeOrmModule.forFeature([Appointment]) , forwardRef(() => Patient) , forwardRef(() => Doctor)]
})
export class AppointmentModule {}
