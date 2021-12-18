import { Expose } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

@Expose()
export class UserDto {
  @IsString()
  public readonly token: string;

  @IsString()
  public readonly pub_key: string;

  constructor(userData: UserDto) {
    Object.assign(this, userData);
  }
}
