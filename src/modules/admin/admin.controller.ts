import { Body, Controller, Post, Get, Query } from '@nestjs/common';
import { QueueService } from '@team-supercharge/nest-amqp';
import { AdminDto } from 'libs/core/src/dto/admin.dto';
import { Key } from 'libs/core/src/entities/key.entity';
import { getConnection, getRepository } from "typeorm";

const openpgp = require("openpgp");

@Controller('admin')
export class AdminController {


	constructor(private readonly queueService: QueueService) { }

	@Post()
	public async rotateKey(@Body() body: AdminDto): Promise<string> {
		console.log(body)
		const keys = await this.generate(body)
		await getConnection()
			.createQueryBuilder()
			.insert()
			.into(Key)
			.values({
				name: body.name,
				email: body.email,
				is_active: true,
				pub_key: keys[1],
				private_key: keys[0]
			})
			.execute();
		return "OK";
	}
	
	@Get()
	public async getKey(@Query() query): Promise<Key[]> {
		console.log(query)
		const keys = await getRepository(Key)
    	.createQueryBuilder("key")
        .where("key.name = :name", query)
    	.getMany();
		return keys;
	}



	private async generate(admin) {
		const { privateKeyArmored, publicKeyArmored } = await openpgp.generateKey({
			userIds: [{ name: admin["name"], email: admin["email"] }],
			curve: "ed25519",
			passphrase: admin["passphrase"],
		});
		
		return [privateKeyArmored,publicKeyArmored ];
	}
}
