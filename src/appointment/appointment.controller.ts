import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { status } from './entities/appointment.entity';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  async bookAppointment(@Body() bookAppointmentDto: CreateAppointmentDto) {
    return this.appointmentService.createAppointment(bookAppointmentDto);
  }

  @Get()
  async getAppointmentsByDoctorAndDate(
    @Query('doctorId') doctorId: string,
    @Query('date') date: string,
    @Query('status') status: status,
  ) {
    return this.appointmentService.getAppointmentsByDoctorAndDate(doctorId, new Date(date), status);
  }

  @Put(':id')
  async updateAppointment(@Param('id') id: string, @Body() updateAppointmentDto: UpdateAppointmentDto) {
    return this.appointmentService.update(id, updateAppointmentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.appointmentService.remove(id);
  }
}
