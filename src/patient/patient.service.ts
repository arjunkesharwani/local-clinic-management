import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PatientRepository } from './patient.repository';

@Injectable()
export class PatientService {
  constructor(private patientsRepo: PatientRepository) {}

  async create(createPatientDto: CreatePatientDto) {
    try {
      return await this.patientsRepo.create(createPatientDto);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(id: string) {
    const patient = await this.patientsRepo.findOne(id);
    if (!patient) {
      throw new NotFoundException('Patient not found');
    }
    return patient;
  }

  async update(id: string, updatePatientDto: UpdatePatientDto) {
    try {
      const updatedPatient = await this.patientsRepo.update(
        id,
        updatePatientDto,
      );
      if (!updatedPatient) {
        throw new NotFoundException('Patient not found');
      }
      return updatedPatient;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const deletedPatient = await this.patientsRepo.remove(id);
      if (!deletedPatient) {
        throw new NotFoundException('Patient not found');
      }
      return {messgae: 'Patients deleted successfully'};
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll() {
    try {
      return await this.patientsRepo.findAll();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
