import {
  IsNotEmpty,
  IsDateString,
  IsUUID,
  IsOptional,
  IsString,
  IsArray,
} from 'class-validator';
import { status } from '../entities/appointment.entity';
import { Type } from 'class-transformer';

export class CreateAppointmentDto {
  @IsDateString()
  @IsNotEmpty()
  preferredDate: Date;

  @IsOptional()
  @IsNotEmpty()
  status?: status;

  @IsNotEmpty()
  @IsArray()
  bookedSlot: string[];

  @IsUUID()
  @IsNotEmpty()
  doctorId: any;

  @IsUUID()
  @IsNotEmpty()
  patientId: any;
}
