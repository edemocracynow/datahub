import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinTable, ManyToMany, CreateDateColumn } from 'typeorm';
import { PublicAdministration } from './pa.entity';

@Entity()
export class Consultation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  creation_date: Date;

  @ManyToMany(() => PublicAdministration)
  @JoinTable()
  public_administrations: PublicAdministration[];

  @Column({ default: true })
  is_active: boolean;
}