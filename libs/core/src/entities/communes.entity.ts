import { Entity, Index, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Geometry } from 'geojson';

@Entity({ name: 'insee_code_postal' })
export class Commune {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom_comm: string;

  @Column()
  postal_code: string;

  @Column()
  nom_dept: string;

  @Column({
    type: 'geometry',
    srid: 4326,
    nullable: true,
  })
  wkb_geometry: Geometry;


}