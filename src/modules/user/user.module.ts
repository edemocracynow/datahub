import { Module } from '@nestjs/common';
import { QueueModule } from '@team-supercharge/nest-amqp';

import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  imports: [QueueModule.forFeature()],
})
export class UserModule {}
