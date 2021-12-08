import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Key {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pubKey: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ default: true })
  isActive: boolean;
}