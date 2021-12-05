import { Module } from '@nestjs/common';
import { QueueModule } from '@team-supercharge/nest-amqp';
import { AdminController } from './admin.controller';

@Module({
  controllers: [AdminController],
  imports: [QueueModule.forFeature()],
})
export class AdminModule {}
