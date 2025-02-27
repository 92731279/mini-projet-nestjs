import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CandidateModule } from './candidate/candidate.module';
import { Candidate } from './candidate/candidate.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      /*type: 'mysql',
      host: process.env.TYPEORM_HOST,
      port: +process.env.TYPEORM_PORT,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,*/
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',  // Votre utilisateur MySQL
      password: 'Wided2002@1',      // Votre mot de passe MySQL
      database: 'candiategestion',
      entities: [Candidate],  // Définissez ici vos entités
      synchronize: true,  // Crée ou met à jour la table automatiquement
      logging: true,  // Ajoutez cette ligne pour activer les logs SQL

    }),
    CandidateModule,
  ],
})
export class AppModule {}
