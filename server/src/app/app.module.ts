import { Module } from '@nestjs/common';
import { QueueModule } from '@team-supercharge/nest-amqp';

import { AppController } from './app.controller';
import { UserModule } from '../modules/user/user.module';
import { AdminModule } from '../modules/admin/admin.module';

const rabbit = process.env.RABBIT_HOST || "localhost:5672";
const user = process.env.RABBIT_USER || "bureaudevote";
const pass = process.env.RABBIT_PASSWORD || "bureaudevote";

@Module({
  imports: [QueueModule.forRoot(`amqp://${user}:${pass}@${rabbit}`), UserModule, AdminModule],
  controllers: [AppController],
})
export class AppModule {}
