import { Injectable } from '@nestjs/common';
import { connectDb } from '../connection/dataSource';
import { Patient } from './entities/patient.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

const repo = connectDb.getRepository(Patient);
@Injectable()
export class PatientRepository {
  constructor() {}

  async create(data: CreatePatientDto) {
    return await repo.save(data);
  }

  async findOne(id: string) {
    return await repo.findOne({ where: { id: id } });
  }

  async update(id: string, data: Partial<UpdatePatientDto>) {
    await repo.update({ id: id }, data);
    return await repo.findOne({ where: { id: id } });
  }

  async remove(id: string) {
    return await repo.softDelete(id);
  }

  async findAll(): Promise<Patient[]> {
    return await repo.find();
  }
}
