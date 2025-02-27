import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Candidate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  
  @Column({ type: 'json', nullable: true }) // Garder JSON pour représenter un tableau
  skills: string[];
  
  @Column()
  status: string;

  @Column({ default: false })
  recruited: boolean;

  @Column({ nullable: true }) // Permet null pour ce champ
  recruitmentYear: number;
}



