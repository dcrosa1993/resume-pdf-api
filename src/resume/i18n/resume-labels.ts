import { ResumeLanguage } from '../enums/resume-language.enum.js';

export interface ResumeLabels {
  summary: string;
  experience: string;
  skills: string;
  projects: string;
  education: string;
  certifications: string;
  languages: string;
  present: string;
}

const labels: Record<ResumeLanguage, ResumeLabels> = {
  [ResumeLanguage.ENGLISH]: {
    summary: 'Professional Summary',
    experience: 'Professional Experience',
    skills: 'Skills',
    projects: 'Projects',
    education: 'Education',
    certifications: 'Certifications',
    languages: 'Languages',
    present: 'Present',
  },

  [ResumeLanguage.SPANISH]: {
    summary: 'Resumen Profesional',
    experience: 'Experiencia Profesional',
    skills: 'Habilidades',
    projects: 'Proyectos',
    education: 'Educación',
    certifications: 'Certificaciones',
    languages: 'Idiomas',
    present: 'Presente',
  },
};

export function getResumeLabels(
  language: ResumeLanguage = ResumeLanguage.ENGLISH,
): ResumeLabels {
  return labels[language] ?? labels[ResumeLanguage.ENGLISH];
}