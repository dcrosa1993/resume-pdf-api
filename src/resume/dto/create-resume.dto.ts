import { Type } from 'class-transformer';
import { ResumeTemplate } from '../templates/template.types.js';
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PersonalInfoDto {
  @ApiProperty({
    example: 'John',
    description: 'Candidate first name',
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Candidate last name',
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    example: 'Senior Software Engineer',
    description: 'Professional title shown below the candidate name',
  })
  @IsString()
  jobTitle: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Candidate email address',
  })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({
    example: '+1 555 123 4567',
    description: 'Candidate phone number',
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({
    example: 'Miami, FL',
    description: 'Candidate city and state/country',
  })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional({
    example: 'https://www.linkedin.com/in/johndoe',
    description: 'LinkedIn profile URL',
  })
  @IsOptional()
  @IsUrl()
  linkedin?: string;

  @ApiPropertyOptional({
    example: 'https://github.com/johndoe',
    description: 'GitHub profile URL',
  })
  @IsOptional()
  @IsUrl()
  github?: string;

  @ApiPropertyOptional({
    example: 'https://johndoe.dev',
    description: 'Personal website URL',
  })
  @IsOptional()
  @IsUrl()
  website?: string;
}

export class ExperienceDto {
  @ApiProperty({
    example: 'Example Inc.',
    description: 'Company or organization name',
  })
  @IsString()
  company: string;

  @ApiProperty({
    example: 'Senior Software Engineer',
    description: 'Job position or role',
  })
  @IsString()
  position: string;

  @ApiPropertyOptional({
    example: 'Remote',
    description: 'Job location',
  })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({
    example: '2022-01',
    description: 'Employment start date. Recommended format: YYYY-MM',
  })
  @IsString()
  startDate: string;

  @ApiPropertyOptional({
    example: 'Present',
    description:
      'Employment end date. Use "Present" for the current position. Recommended format: YYYY-MM',
  })
  @IsOptional()
  @IsString()
  endDate?: string;

  @ApiPropertyOptional({
    example:
      'Developed and maintained enterprise web applications used by thousands of users.',
    description: 'General description of the position',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: [
      'Reduced API response time by 35%',
      'Led migration from AngularJS to Angular',
      'Implemented CI/CD pipelines using GitHub Actions',
    ],
    description: 'Specific achievements and responsibilities',
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  achievements: string[];

  @ApiPropertyOptional({
    example: ['Angular', 'TypeScript', 'Node.js', 'PostgreSQL'],
    description: 'Technologies and tools used in this position',
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  technologies?: string[];
}

export class EducationDto {
  @ApiProperty({
    example: 'University of Example',
    description: 'Educational institution',
  })
  @IsString()
  institution: string;

  @ApiProperty({
    example: 'Bachelor of Computer Science',
    description: 'Degree or qualification obtained',
  })
  @IsString()
  degree: string;

  @ApiPropertyOptional({
    example: 'Computer Science',
    description: 'Field of study or specialization',
  })
  @IsOptional()
  @IsString()
  fieldOfStudy?: string;

  @ApiPropertyOptional({
    example: 'Miami, FL',
    description: 'Institution location',
  })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional({
    example: '2013',
    description: 'Education start date',
  })
  @IsOptional()
  @IsString()
  startDate?: string;

  @ApiPropertyOptional({
    example: '2017',
    description: 'Education end date',
  })
  @IsOptional()
  @IsString()
  endDate?: string;
}

export class SkillsDto {
  @ApiProperty({
    example: [
      'TypeScript',
      'JavaScript',
      'Angular',
      'React',
      'Node.js',
      'NestJS',
      'PostgreSQL',
      'Docker',
    ],
    description: 'Technical skills, technologies, frameworks and tools',
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  technical: string[];

  @ApiPropertyOptional({
    example: ['Leadership', 'Problem Solving', 'Communication'],
    description: 'Soft skills',
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  soft?: string[];
}

export class CertificationDto {
  @ApiProperty({
    example: 'AWS Certified Developer - Associate',
    description: 'Certification name',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Amazon Web Services',
    description: 'Certification issuer',
  })
  @IsString()
  issuer: string;

  @ApiPropertyOptional({
    example: '2025',
    description: 'Certification date',
  })
  @IsOptional()
  @IsString()
  date?: string;

  @ApiPropertyOptional({
    example: 'https://www.credly.com/badges/example',
    description: 'URL where the certification can be verified',
  })
  @IsOptional()
  @IsUrl()
  url?: string;
}

export class LanguageDto {
  @ApiProperty({
    example: 'English',
    description: 'Language name',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Professional',
    description: 'Language proficiency level',
  })
  @IsString()
  level: string;
}

export class ProjectDto {
  @ApiProperty({
    example: 'Inventory Management System',
    description: 'Project name',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example:
      'A web-based inventory management platform for managing products, warehouses and stock movements.',
    description: 'Project description',
  })
  @IsString()
  description: string;

  @ApiPropertyOptional({
    example: ['Angular', 'NestJS', 'PostgreSQL', 'Docker'],
    description: 'Technologies used in the project',
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  technologies?: string[];

  @ApiPropertyOptional({
    example: 'https://github.com/johndoe/inventory-management',
    description: 'Project URL',
  })
  @IsOptional()
  @IsUrl()
  url?: string;
}

export class CreateResumeDto {
  @ApiPropertyOptional({
    enum: ResumeTemplate,
    enumName: 'ResumeTemplate',
    default: ResumeTemplate.CLASSIC,
    description: 'Resume visual template.',
  })
  @IsOptional()
  @IsEnum(ResumeTemplate)
  template?: ResumeTemplate = ResumeTemplate.CLASSIC;
  
  @ApiProperty({
    type: PersonalInfoDto,
    description: 'Candidate personal and contact information',
  })
  @ValidateNested()
  @Type(() => PersonalInfoDto)
  personal: PersonalInfoDto;

  @ApiPropertyOptional({
    example:
      'Senior Software Engineer with 8+ years of experience building scalable web applications and APIs.',
    description: 'Professional summary',
  })
  @IsOptional()
  @IsString()
  summary?: string;

  @ApiProperty({
    type: [ExperienceDto],
    description:
      'Professional work experience ordered from most recent to oldest',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExperienceDto)
  experience: ExperienceDto[];

  @ApiPropertyOptional({
    type: [EducationDto],
    description: 'Academic background',
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EducationDto)
  education?: EducationDto[];

  @ApiProperty({
    type: SkillsDto,
    description: 'Candidate skills',
  })
  @ValidateNested()
  @Type(() => SkillsDto)
  skills: SkillsDto;

  @ApiPropertyOptional({
    type: [CertificationDto],
    description: 'Professional certifications',
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CertificationDto)
  certifications?: CertificationDto[];

  @ApiPropertyOptional({
    type: [LanguageDto],
    description: 'Languages spoken by the candidate',
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LanguageDto)
  languages?: LanguageDto[];

  @ApiPropertyOptional({
    type: [ProjectDto],
    description: 'Relevant professional or personal projects',
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProjectDto)
  projects?: ProjectDto[];
}
