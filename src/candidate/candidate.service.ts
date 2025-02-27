import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Candidate } from './candidate.entity';
import { CreateCandidateDto } from './candidate.dto';
@Injectable() //  ligne hedhi nktboha bch na3rfou li l CandidateService hiya khedma f NestJs
export class CandidateService {
  constructor(
    @InjectRepository(Candidate) // lena bch narbet lrepository bl candidate entity 
    private readonly candidateRepository: Repository<Candidate>, // te5dem b typeOrm w repo bch tet3amel maa DB
  ) {}
/*async create(candidate: Partial<Candidate>): Promise<{ message: string; warnings?: string[]; data: Candidate }> {
  const warnings = [];

  // Validation et correction
  if (candidate.recruited === false && candidate.recruitmentYear) {
    warnings.push("Since 'recruited' is false, 'recruitmentYear' has been reset to null.");
    candidate.recruitmentYear = null; // Correction automatique
  }

  try {
    const newCandidate = await this.candidateRepository.save(candidate);
    return {
      message: 'Candidate created successfully',
      warnings: warnings.length > 0 ? warnings : undefined,
      data: newCandidate,
    };
  } catch (error) {
    console.error('Error creating candidate:', error);
    throw new BadRequestException('Error creating candidate', error.message);
  }
}*/


// la methode create aamlneha bch naamlou creation taa candidat jdyd
async create(candidate: Partial<Candidate>): Promise<{ message: string; warnings?: string[]; data: Candidate }> {
  const warnings = [];//var bch nstocki fih l warnings s'il existe des prob

  // Validation du champs recruited et correction si le dernier contient la valeur false 
  if (candidate.recruited === false && candidate.recruitmentYear) {
    warnings.push("Since 'recruited' is false, 'recruitmentYear' has been reset to null."); // msg affiché bch n indiquiw li raw champs false 
    candidate.recruitmentYear = null; // Correction automatique yaany ki tbda recruted l valeau teeha false automatiquement l year tekhou null 
  }

  try {
    const newCandidate = await this.candidateRepository.save(candidate); //stockage des donnée fl BD 
    return {
      message: 'Candidate created successfully', //affichage d'un msg de succès bch nwari li l candidat c bon stocké fl DB 
      warnings: warnings.length > 0 ? warnings : undefined, //warning kn fama mochkla
      data: newCandidate, // retourne le candidat li aamalnelou creation
    };
  } catch (error) {
    console.error('Error creating candidate:', error); // affichage d'un msg d'err kn fama mochkl
    throw new BadRequestException('Error creating candidate', error.message);
  }
}
  
  //find all traja3li liste des candidats li msajlin fl DB 
  async findAll(): Promise<{ message: string; data: Candidate[] }> {
    try {
      const candidates = await this.candidateRepository.find();
      return { message: 'Candidates retrieved successfully', data: candidates }; // ces deux lignes montrent le succès de la requete (liste + msg de succès)
    } catch (error) {
      console.error('Error retrieving candidates:', error);
      throw new BadRequestException('Error retrieving candidates', error.message); // w si fama prob yaatyna except
    }
  }

  
//findOne traja3 un seul candidat 
  async findOne(id: number): Promise<Candidate> {
    const candidate = await this.candidateRepository.findOne({ where: { id } }); // aamlna houni recherche par id 
    if (!candidate) {
      throw new BadRequestException(`Candidate with ID ${id} not found`); // ki mayal9ach l candidat bl id li nlawjou aalih yraja3 msg d'err
    }
    return candidate; // fl cas de succès yraja3li l candidat d'id demandé
  }

  //la methode update nesta3mloha bch naaml màj ll données de candidat au cas de besoin
  async update(id: number, candidate: CreateCandidateDto): Promise<{ message: string }> {
    const existingCandidate = await this.findOne(id); //  awel haja nthabtou ken mawjoud wela 
  
    if (!existingCandidate) {
      throw new BadRequestException(`Candidate with ID ${id} not found`); // msg not found ki mayal9ahch
    }
  
    // Validation conditionnelle pour recruitmentYear kima aamlna fl methode create 
    if (candidate.recruited === false) {
      candidate.recruitmentYear = null;
    }
  
    // lena bch naamlou combinaison bin les données l9dom w les données li badelnehom 
    await this.candidateRepository.save({ ...existingCandidate, ...candidate });
  
    return { message: 'Candidate updated successfully' }; // le condidat sera afffiché avec les données m-à-j
  }
  

  async remove(id: number): Promise<{ message: string }> {
    const candidate = await this.findOne(id);  //ylawj aalih bl id
    if (!candidate) {
      throw new BadRequestException(`Candidate with ID ${id} not found`); // msg d'err wa9t mayl9ach l candidat d'id demandé
    }

    await this.candidateRepository.delete(id);
    return { message: 'Candidate deleted successfully' }; //msg y9oul li c bon l candidat tfaskh m DB
  }
}

