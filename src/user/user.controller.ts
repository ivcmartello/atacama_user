/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';
import { User } from './user.entity';
import { FindConditions } from 'typeorm';
import { UserDto } from './user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ role: 'user', cmd: 'get' })
  getUser(data: any) {
    const options = {
      where: [{ username: data.username }, { email: data.username }],
    } as FindConditions<User>;

    return this.userService.findOne(options);
  }

  @Post('users')
  create(@Body() userDto: UserDto) {
    return this.userService.createUser(userDto);
  }
}
