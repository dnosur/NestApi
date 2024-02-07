import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

import { SequelizeModule } from '@nestjs/sequelize';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { sequelize } from 'db/sequelize.config';
import { User } from 'db/models/user.model';

@Module({
  imports: [
    UsersModule,
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'NestTestDb',
      models: [User],
      autoLoadModels: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
