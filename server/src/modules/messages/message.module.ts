import { Module } from '@nestjs/common';
import { QueueModule } from '@team-supercharge/nest-amqp';
import { MessageListener } from './message.listener';

@Module({
	providers: [MessageListener],
	imports: [QueueModule.forFeature()],
})
export class MessageModule { }
