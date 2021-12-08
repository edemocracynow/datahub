import { Body, Controller, Get } from '@nestjs/common';
import { QueueService } from '@team-supercharge/nest-amqp';
import { AdminQueue } from './admin.queue';
import { getConnection } from "typeorm";
import { Key } from 'src/app/entities/key.entity';

const openpgp = require("openpgp");

@Controller('admin')
export class AdminController {


	constructor(private readonly queueService: QueueService) { }

	@Get()
	public async rotateKey(): Promise<string> {
		const pubK = await this.generate()
		await this.queueService.send(AdminQueue.ROTATE_KEY, pubK);
		console.log(pubK);
		await getConnection()
			.createQueryBuilder()
			.insert()
			.into(Key)
			.values({
				name: "PA-antibes",
				email: "PA-antibes@qwqnt.com",
				isActive: true,
				pubKey: pubK
			})
			.execute();
		return pubK;
	}



	private async generate() {
		const { privateKeyArmored, publicKeyArmored } = await openpgp.generateKey({
			userIds: [{ name: "person", email: "person@somebody.com" }],
			curve: "ed25519",
			passphrase: "pass",
		});
		
		return publicKeyArmored;
	}
}
