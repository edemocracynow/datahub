import { Body, Controller, Get } from '@nestjs/common';
import { QueueService } from '@team-supercharge/nest-amqp';
import { AdminQueue } from './admin.queue';

const openpgp = require("openpgp");

@Controller('admin')
export class AdminController {
  
	
  constructor(private readonly queueService: QueueService) {}

  @Get()
  public async rotateKey(): Promise<string> {
	const pubK = await this.generate()
    await this.queueService.send(AdminQueue.ROTATE_KEY, pubK);
    return pubK;
  }



  private	async  generate() {
	  const { privateKeyArmored, publicKeyArmored } = await openpgp.generateKey({
	    userIds: [{ name: "person", email: "person@somebody.com" }],
	    curve: "ed25519",
	    passphrase: "pass",
	  });
	  console.log(publicKeyArmored);
	  return publicKeyArmored;	
	}
}
