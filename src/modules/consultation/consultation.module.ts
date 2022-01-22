import { Module } from '@nestjs/common';
import { QueueModule } from '@team-supercharge/nest-amqp';

import { ConsultationController } from './consultation.controller';

@Module({
  controllers: [ConsultationController],
  imports: [QueueModule.forFeature()],
})
export class ConsultationModule {}
