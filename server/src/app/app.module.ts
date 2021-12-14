import { Module } from '@nestjs/common';
import { QueueModule } from '@team-supercharge/nest-amqp';

import { AppController } from './app.controller';
import { UserModule } from '../modules/user/user.module';
import { AdminModule } from '../modules/admin/admin.module';
import { MessageModule } from '../modules/messages/message.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Key } from './entities/key.entity';
import { Consultation } from './entities/consultation.entity';
import { Message } from './entities/message.entity';
import { PublicAdministration } from './entities/pa.entity';

const rabbit = process.env.RABBIT_HOST || "localhost:5672";
const user = process.env.RABBIT_USER || "bureaudevote";
const pass = process.env.RABBIT_PASSWORD || "bureaudevote";

const DB_PORT = process.env.DB_PORT || 5432;
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_USER = process.env.DB_USER || "bureaudevote";
const DB_PASSWORD = process.env.DB_PASSWORD || "bureaudevote";
const DB_NAME = process.env.DB_NAME || "admin";

@Module({
  imports: [
	QueueModule.forRoot(`amqp://${user}:${pass}@${rabbit}`), 
	UserModule, 
	AdminModule,
	MessageModule,
	TypeOrmModule.forRoot({
      type: `postgres`,
      host: `${DB_HOST}`,
      port: parseInt(`${DB_PORT}`),
      username: `${DB_USER}`,
      password: `${DB_PASSWORD}`,
      database: `${DB_NAME}`,
      entities: [Key,PublicAdministration,Message,Consultation],
      synchronize: true,
    })
	],
  controllers: [AppController],
})
export class AppModule {}
