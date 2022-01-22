import { Entity, Index, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Key } from './key.entity';
import { Commune } from './communes.entity';

@Entity()
export class PublicAdministration {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => Commune)
  @JoinColumn()
  commune: Commune;

  @OneToOne(() => Key)
  @JoinColumn()
  key: Key;

}