import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Expose()
export class ConsultationDto {
  @IsString()
  public readonly name: string;

  constructor(consultationData: ConsultationDto) {
    Object.assign(this, consultationData);
  }
}
