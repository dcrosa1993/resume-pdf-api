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
  technical: string;
  professional: string;
  professionalBackground: string;
  aboutMe: string;
  experience2: string;
  toolkit: string;
  academicBackground: string;
  communication: string;
  profile: string;
}

const labels: Record<ResumeLanguage, ResumeLabels> = {
  [ResumeLanguage.ENGLISH]: {
    summary: 'Professional Summary',
    experience: 'Professional Experience',
    experience2: 'Experience',
    skills: 'Skills',
    projects: 'Projects',
    education: 'Education',
    certifications: 'Certifications',
    languages: 'Languages',
    present: 'Present',
    technical: 'Technical',
    professional: 'Professional',
    professionalBackground: 'Professional Background',
    aboutMe: 'About Me',
    toolkit: 'Toolkit',
    academicBackground: 'Academic Background',
    communication: 'Communication',
    profile: 'Profile',
  },

  [ResumeLanguage.SPANISH]: {
    summary: 'Resumen Profesional',
    experience: 'Experiencia Profesional',
    experience2: 'Experiencia',
    skills: 'Habilidades',
    projects: 'Proyectos',
    education: 'Educación',
    certifications: 'Certificaciones',
    languages: 'Idiomas',
    present: 'Presente',
    technical: 'Técnico',
    professional: 'Profesional',
    professionalBackground: 'Antecedentes Profesionales',
    aboutMe: 'Sobre Mí',
    toolkit: 'Kit de Herramientas',
    academicBackground: 'Antecedentes Académicos',
    communication: 'Comunicación',
    profile: 'Perfil',
  },
};

export function getResumeLabels(
  language: ResumeLanguage = ResumeLanguage.ENGLISH,
): ResumeLabels {
  return labels[language] ?? labels[ResumeLanguage.ENGLISH];
}