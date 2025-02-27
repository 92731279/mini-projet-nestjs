import { IsString, IsEmail, IsArray, IsBoolean, IsOptional, IsInt, ValidateIf } from 'class-validator';


export class CreateCandidateDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsArray()
  @IsString({ each: true }) // Chaque élément doit être une chaîne
  skills: string[];

  @IsString()
  status: string;

  @IsBoolean()
  recruited: boolean;

  @ValidateIf((o) => o.recruited === true) // Valide seulement si recruited est true
  @IsOptional()
  @IsInt()
  recruitmentYear?: number;
}
