import { Expose } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

@Expose()
export class AdminDto {
  @IsString()
  public readonly name: string;

  @IsString()
  public readonly passphrase: string;

  @IsInt()
  public readonly email: string;

  constructor(adminData: AdminDto) {
    Object.assign(this, adminData);
  }
}
