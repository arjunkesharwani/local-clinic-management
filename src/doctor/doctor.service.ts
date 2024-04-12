import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { DoctorRepository } from './doctor.repository';
import { Doctor } from './entities/doctor.entity'; // Import Doctor entity
import {
  Appointment,
  status,
} from 'src/appointment/entities/appointment.entity';
import { AppointmentRepository } from 'src/appointment/appointment.repository';
import { AppointmentService } from 'src/appointment/appointment.service';

@Injectable()
export class DoctorService {
  constructor(
    private doctorsRepo: DoctorRepository,
    private appointmentService: AppointmentService,
  ) {}

  async create(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    try {
      return await this.doctorsRepo.create(createDoctorDto);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(id: string): Promise<Doctor | undefined> {
    const doctor = await this.doctorsRepo.findOne(id);
    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }
    return doctor;
  }

  async update(
    id: string,
    updateDoctorDto: UpdateDoctorDto,
  ): Promise<Doctor | undefined> {
    try {
      const updatedDoctor = await this.doctorsRepo.update(id, updateDoctorDto);
      if (!updatedDoctor) {
        throw new NotFoundException('Doctor not found');
      }
      return updatedDoctor;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const deletedDoctor = await this.doctorsRepo.remove(id);
      if (!deletedDoctor) {
        throw new NotFoundException('Doctor not found');
      }
      return deletedDoctor;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(): Promise<Doctor[]> {
    try {
      return await this.doctorsRepo.findAll();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getDayOfWeekFromDate(date) {
    const daysOfWeek = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ];
    let dayOfWeek = date.getDay();
    dayOfWeek = (dayOfWeek + 6) % 7;
    return daysOfWeek[dayOfWeek];
  }

  async getSlots(startTime: string, endTime: string) {
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);

    const startTotalMinutes = startHour * 60 + startMinute;
    const endTotalMinutes = endHour * 60 + endMinute;

    //it can be dynamic
    const duration = 30;

    const timeSlots = [];

    // Iterate through time range and generate time slots
    let currentTotalMinutes = startTotalMinutes;
    while (currentTotalMinutes < endTotalMinutes) {
      const startHour = Math.floor(currentTotalMinutes / 60);
      const startMinute = currentTotalMinutes % 60;
      const endTotalMinutes = currentTotalMinutes + duration;
      const endHour = Math.floor(endTotalMinutes / 60);
      const endMinute = endTotalMinutes % 60;

      const slot = [
        `${startHour.toString().padStart(2, '0')}:${startMinute.toString().padStart(2, '0')}`,
        `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`,
      ];

      timeSlots.push(slot);

      currentTotalMinutes += duration;
    }

    return timeSlots;
  }

  async getAvailableSlots(allSlotsOfDay, unavailableSlots) {
    return allSlotsOfDay.filter((slot) => {
      return !unavailableSlots.some((unavailableSlot) => {
        return (
          (slot[0] >= unavailableSlot[0] && slot[0] < unavailableSlot[1]) ||
          (slot[1] > unavailableSlot[0] && slot[1] <= unavailableSlot[1]) ||
          (slot[0] < unavailableSlot[0] && slot[1] > unavailableSlot[1])
        );
      });
    });
  }

  async findAvailableTimeSlots(doctorId: string, date: Date) {
    try {
      const appointmentDate = new Date(date);
      const currentTimestamp = Date.now();
      appointmentDate.setTime(currentTimestamp);
      const currentDate = new Date();
      console.log('currentDate', currentDate);
      console.log('appointmentDate', appointmentDate);
      if (appointmentDate < currentDate) {
        throw new BadRequestException(
          'Slots cannot be booked for previous day',
        );
      }
      const doctor = await this.doctorsRepo.findOne(doctorId);
      if (!doctor) {
        throw new NotFoundException('Doctor does not exist');
      }
      const { availability } = doctor;
      const weekDay = await this.getDayOfWeekFromDate(new Date(date));
      const daySlot = availability.find((slots) => slots.day === weekDay);
      if (!daySlot) {
        throw new BadRequestException(`No available time for ${weekDay}`);
      }
      const { startTime, endTime } = daySlot;
      const allSlotsOFDay = await this.getSlots(startTime, endTime);
      const scheduledSlots =
        await this.appointmentService.getAppointmentsByDoctorAndDate(
          doctorId,
          date,
          status.SCHEDULED,
        );
      const unavailableSlots = scheduledSlots.map(
        (appointment) => appointment.bookedSlot,
      );
      const availableTimeSlots = await this.getAvailableSlots(
        allSlotsOFDay,
        unavailableSlots,
      );
      return { availableTimeSlots };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
