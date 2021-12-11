import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Key {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pub_key: string;

  @Column()
  private_key: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ default: true })
  is_active: boolean;
}