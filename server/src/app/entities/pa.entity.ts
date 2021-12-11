import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Key } from './key.entity';

@Entity()
export class PublicAdministration {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  cap: string;

  @OneToOne(() => Key)
  @JoinColumn()
  key: Key;

}