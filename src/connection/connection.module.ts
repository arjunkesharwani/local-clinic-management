/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { datasourceOptions } from '../connection/dataSource';
@Module({
  imports: [TypeOrmModule.forRootAsync({ useFactory: () => (datasourceOptions) })],
})
export class ConnectionModule { }