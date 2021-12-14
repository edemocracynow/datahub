import { Injectable, Logger } from '@nestjs/common';
import { Listen } from '@team-supercharge/nest-amqp';

import { MessageQueue } from './message.queue';
import { MessageDto } from './message.dto';
import { getConnection, getRepository } from "typeorm";
import { Consultation } from 'src/app/entities/consultation.entity';

@Injectable()
export class MessageListener {
	@Listen(MessageQueue.ADD_MESSAGE, { type: MessageDto, skipValidation: true })
	public async listenForMessage(message: MessageDto): Promise<void> {
		
		var someEncodedString = Buffer.from(JSON.stringify(message), 'utf-8').toString();
		logger.log(`obj: ${someEncodedString}`);
		let data = JSON.parse(someEncodedString['content'])
		var obj=JSON.stringify(data)
		
		
		const consultations = await getRepository(Consultation)
			.createQueryBuilder("c")
			.where("c.id = :id", {id : message.consultation_id})
			.getMany();
		
		if(consultations.length == 0){
			logger.log('no consultations with this id')
		} else{
			const pa = consultations[0].publicAdministrations
		}
	}
}
const logger = new Logger(MessageListener.name);
