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
  insee_com: string;

  @Column()
  nom_dept: string;
  
  @Column()
  nom_region: string;
  
  @Column()
  code_reg: string;
  
  @Column()
  code_comm: string;

  @Column()
  code_dept: string;
  
  @Column()
  statut: string;

  @Column({type: 'numeric'})
  population: string;

  @Column({type: 'numeric'})
  superficie: string;

  @Column({
    type: 'geometry',
    srid: 4326,
    nullable: true,
  })
  wkb_geometry: Geometry;


}