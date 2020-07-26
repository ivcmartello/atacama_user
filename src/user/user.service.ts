/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindConditions } from 'typeorm';
import { User } from './user.entity';

const logger = new Logger('User');

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findOne(query: FindConditions<User>) {
    return this.userRepository.findOne(query);
  }

  createUser(user: any) {
    try {
      const userEntity = this.userRepository.create(user);
      const res = this.userRepository.insert(userEntity);

      logger.log('Created');

      return res;
    } catch (error) {
      logger.log(error);
      throw error;
    }
  }
}
