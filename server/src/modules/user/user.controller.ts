import { Body, Controller, Post } from '@nestjs/common';
import { QueueService } from '@team-supercharge/nest-amqp';

import { UserQueue } from './user.queue';
import { UserDto } from './user.dto';

@Controller('admin')
export class UserController {
  constructor(private readonly queueService: QueueService) {}

  @Post()
  public async sendAddUserMessage(@Body() body: UserDto): Promise<string> {
	console.log(body)
    await this.queueService.send<UserDto>(UserQueue.ADD_USER, body);

    return 'Add user event sent';
  }
}
