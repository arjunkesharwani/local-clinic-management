/* eslint-disable prettier/prettier */
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  export class baseEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @CreateDateColumn({
      type: 'time with time zone',
    })
    created_at: Date;
    @UpdateDateColumn({
      type: 'time with time zone',
    })
    updated_at: Date;
    @DeleteDateColumn()
    deletedAt?: Date;
  }
  