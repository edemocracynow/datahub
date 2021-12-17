import { Injectable, Logger } from '@nestjs/common';
import { Listen } from '@team-supercharge/nest-amqp';

import { MessageQueue } from './message.queue';
import { getConnection, getRepository } from "typeorm";
import { Consultation } from 'libs/core/src/entities/consultation.entity';
import { MessageDto } from 'libs/core/src/dto/message.dto';

@Injectable()
export class MessageListener {
	@Listen(MessageQueue.ADD_MESSAGE, { type: MessageDto})
	public async listenForMessage(message: MessageDto): Promise<void> {
		logger.log(`content: ${JSON.stringify(message)}`);
		let data = JSON.parse(JSON.stringify(message))
		let buffer = Buffer.from(data['content']['data']);
		logger.log(`content: ${buffer}`);
		var str = buffer.toString('utf8')
		logger.log(`str: ${str}`);
//		message = new MessageDto()
//		
//		const consultations = await getRepository(Consultation)
//			.createQueryBuilder("c")
//			.where("c.id = :id", {id : message.consultation_id})
//			.getMany();
//		
//		if(consultations.length == 0){
//			logger.log('no consultations with this id')
//		} else{
//			const pa = consultations[0].publicAdministrations
//		}
	}
}
const logger = new Logger(MessageListener.name);
