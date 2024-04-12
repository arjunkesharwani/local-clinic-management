import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { AppointmentRepository } from './appointment.repository';
import { Appointment, status } from './entities/appointment.entity';

@Injectable()
export class AppointmentService {
  constructor(private appointmentsRepo: AppointmentRepository) {}

  async createAppointment(
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointment> {
    try {
      return await this.appointmentsRepo.create(createAppointmentDto);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getAppointmentsByDoctorAndDate(
    doctorId: string,
    date: Date,
    status: status
  ): Promise<Appointment[]> {
    try {
      return await this.appointmentsRepo.findAppointmentsByDoctorAndDate(
        doctorId,
        date,
        status
      );
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(
    id: string,
    updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<Appointment> {
    try {
      const updatedAppointment = await this.appointmentsRepo.update(
        id,
        updateAppointmentDto,
      );
      if (!updatedAppointment) {
        throw new NotFoundException('Appointment not found');
      }
      return updatedAppointment;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: string) {
    try {
      return await this.appointmentsRepo.remove(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
