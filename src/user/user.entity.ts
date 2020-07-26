/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BeforeInsert,
  Unique,
  Index,
} from 'typeorm';
import { hash } from 'bcrypt';
import { IsEmail, Min } from 'class-validator';
import { UserInterface } from './user.interface';

@Entity('users')
@Unique(['username'])
@Unique(['email'])
export class User implements UserInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column()
  username: string;

  @Column()
  @Min(8)
  password: string;

  @Column()
  name: string;

  @Index()
  @Column()
  @IsEmail()
  email: string;

  @CreateDateColumn()
  created_at: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}
