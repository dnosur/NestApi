import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { DbService } from 'db/DbService';

@Module({
  controllers: [UsersController],
  providers: [DbService],
})
export class UsersModule {}
