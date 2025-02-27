import { Controller, Post, Body, Get,Put,Delete ,Param, BadRequestException} from '@nestjs/common';
import { Candidate } from './candidate.entity';
import { CandidateService } from './candidate.service';
import { CreateCandidateDto } from './candidate.dto';

@Controller('candidates')
export class CandidateController {
  constructor(private readonly candidateService: CandidateService) {}

  @Post()
  async create(@Body() createCandidateDto: CreateCandidateDto) {
    const result = await this.candidateService.create(createCandidateDto);
    return result;
  }

  @Get()
  async findAll() {
    const result = await this.candidateService.findAll();
    return result;
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const candidate = await this.candidateService.findOne(id);
    return { message: 'Candidate retrieved successfully', data: candidate };
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() candidate: CreateCandidateDto) {
    const result = await this.candidateService.update(id, candidate);
    return result;
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const result = await this.candidateService.remove(id);
    return result;
  }
}

