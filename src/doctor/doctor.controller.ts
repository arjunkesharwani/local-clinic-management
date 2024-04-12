import {
  Controller,
  Body,
  Param,
  Delete,
  Put,
  Post,
  Get,
  Query,
} from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { status } from 'src/appointment/entities/appointment.entity';

@Controller('doctors')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  async create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorService.create(createDoctorDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDoctorDto: UpdateDoctorDto,
  ) {
    return this.doctorService.update(id, updateDoctorDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.doctorService.remove(id);
  }

  @Get()
  async findAll() {
    return this.doctorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.doctorService.findOne(id);
  }

  @Get(':doctorId/available-time-slots')
  async getAvailableTimeSlots(
    @Param('doctorId') doctorId: string,
    @Query('date') date: string,
  ) {
    return this.doctorService.findAvailableTimeSlots(doctorId, new Date(date));
  }
}
