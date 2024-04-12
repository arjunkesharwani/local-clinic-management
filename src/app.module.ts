import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientModule } from './patient/patient.module';
import { DoctorModule } from './doctor/doctor.module';
import { AppointmentModule } from './appointment/appointment.module';
import { ConnectionModule } from './connection/connection.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PatientModule, DoctorModule, AppointmentModule , ConnectionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
