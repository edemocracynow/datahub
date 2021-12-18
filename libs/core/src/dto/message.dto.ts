import { Expose } from 'class-transformer';

@Expose()
export class MessageDto {
	public content: string;

	public id: number;

	getContent() {
		return this.content
	}

	getId() {
		return this.id
	}

}
