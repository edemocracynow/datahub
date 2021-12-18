import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';


@Entity()
export class Key {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: true})
  pub_key: string;
  
  @Exclude({ toPlainOnly: true })
  @Column({nullable: true})
  private_key: string;

  @Column({nullable: true})
  name: string;

  @Column({nullable: true})
  email: string;

  @Column({ default: true })
  is_active: boolean;
}