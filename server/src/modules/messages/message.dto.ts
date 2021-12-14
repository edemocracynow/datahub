import { Expose } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

@Expose()
export class MessageDto {
//  @IsString()
  public readonly message_content: string;

//  @IsInt()
  public readonly consultation_id: string;

  constructor(data: MessageDto) {
    Object.assign(this, data);
  }
}
