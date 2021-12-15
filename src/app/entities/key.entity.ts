import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';


@Entity()
export class Key {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pub_key: string;
  
  @Exclude({ toPlainOnly: true })
  @Column()
  private_key: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ default: true })
  is_active: boolean;
}