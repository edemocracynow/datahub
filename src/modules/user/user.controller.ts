import { Body, Controller, Post } from '@nestjs/common';

import { UserDto } from './user.dto';
import { Key } from 'libs/core/src/entities/key.entity';
import { getConnection, getRepository } from "typeorm";

@Controller('user')
export class UserController {

	@Post()
	public async registerUser(@Body() body: UserDto): Promise<string> {
		console.log(body)
		await getConnection()
			.createQueryBuilder()
			.insert()
			.into(Key)
			.values({
				name: body.token,
				pub_key: body.pub_key
			})
			.execute();
		return "OK";
	}
}
