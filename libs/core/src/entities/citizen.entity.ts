import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Key } from './key.entity';

@Entity()
export class Citizen {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @OneToOne(() => Key)
  @JoinColumn()
  key: Key;

}