import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { DbService } from 'db/DbService';

import { User } from 'db/models/user.model';

import * as joi from 'joi';
import { sendAnswer } from 'utilities/utilities';

@Controller('users')
export class UsersController {
  constructor(private readonly database: DbService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    const scheme = joi.object({
      name: joi.string().required(),
      surname: joi.string().required(),
      age: joi.number().required(),
    });

    if (scheme.validate(createUserDto).error) {
      return {
        error: '[POST ERROR]: Data is incorrect!',
        message: 'expected fields [ name*, surname*, age* ]',
      };
    }

    return sendAnswer(this.database.setData(User, createUserDto));
  }

  @Get()
  findAll() {
    return sendAnswer(this.database.getData(User));
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return sendAnswer(this.database.getDataById(User, +id));
  }

  @Get('/find/surname/:surname')
  findBySurname(@Param('surname') surname: string) {
    return sendAnswer(this.database.getDataBy(User, { surname: surname }));
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    const scheme = joi.object({
      name: joi.string().optional(),
      surname: joi.string().optional(),
      age: joi.number().optional(),
    });

    if (scheme.validate(updateUserDto).error) {
      return {
        error: '[POST ERROR]: Data is incorrect!',
        message: 'expected fields [ name*, surname*, age* ]',
      };
    }

    return sendAnswer(this.database.updateData(User, +id, updateUserDto));
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return sendAnswer(this.database.deleteData(User, +id));
  }
}
