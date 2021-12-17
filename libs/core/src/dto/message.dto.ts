import { Expose } from 'class-transformer';

@Expose()
export class MessageDto {
	private content: string;

	private id: number;
	
	getContent(){
		return this.content
	}
	
	getId(){
		return this.id
	}

}
