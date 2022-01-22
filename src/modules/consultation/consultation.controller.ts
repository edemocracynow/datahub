import { Body, Controller, Post, Get, Query } from '@nestjs/common';

import { ConsultationDto } from './consultation.dto';
import { Consultation } from 'libs/core/src/entities/consultation.entity';
import { getConnection, getRepository } from "typeorm";
import { Commune } from 'libs/core/src/entities/communes.entity';

@Controller('consultation')
export class ConsultationController {

	@Post()
	public async addConsultation(@Body() body: ConsultationDto): Promise<string> {
		console.log(body)
		await getConnection()
			.createQueryBuilder()
			.insert()
			.into(Consultation)
			.values({
				name: body.name
			})
			.execute();
		return "OK";
	}
	
	@Get()
	public async getPa(@Query() query): Promise<Commune> {
		console.log(query)
		const pa = await getRepository(Commune)
    	.createQueryBuilder("comm")
        .where("comm.postal_code = :postal_code", query)
    	.getOneOrFail();
        console.log(pa)
		return pa;
	}
}
