import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinTable, ManyToMany } from 'typeorm';
import { PublicAdministration } from './pa.entity';

@Entity()
export class Consultation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  creationDate: string;

  @ManyToMany(() => PublicAdministration)
  @JoinTable()
  publicAdministrations: PublicAdministration[];

  @Column({ default: true })
  isActive: boolean;
}