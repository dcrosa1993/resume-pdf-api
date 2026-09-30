import { CreateResumeDto } from '../dto/create-resume.dto.js';
import { ResumeTemplateContext } from './template.types.js';
import { ResumeLanguage } from '../enums/resume-language.enum.js';
import { getResumeLabels } from '../i18n/resume-labels.js';

type ResumeLabels = ReturnType<typeof getResumeLabels>;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function renderContactInfo(resume: CreateResumeDto): string {
  const { personal } = resume;

  const contactItems = [
    personal.email,
    personal.phone,
    personal.location,
  ].filter(Boolean);

  const links = [
    personal.linkedin
      ? `<a href="${escapeHtml(personal.linkedin)}">${escapeHtml(
          personal.linkedin,
        )}</a>`
      : '',
    personal.github
      ? `<a href="${escapeHtml(personal.github)}">${escapeHtml(
          personal.github,
        )}</a>`
      : '',
    personal.website
      ? `<a href="${escapeHtml(personal.website)}">${escapeHtml(
          personal.website,
        )}</a>`
      : '',
  ].filter(Boolean);

  return `
    <div class="contact">
      ${contactItems
        .map((item) => `<span>${escapeHtml(item!)}</span>`)
        .join('<span class="separator">•</span>')}
    </div>

    ${
      links.length
        ? `
          <div class="links">
            ${links.join('<span class="separator">•</span>')}
          </div>
        `
        : ''
    }
  `;
}

function renderProjects(resume: CreateResumeDto): string {
  if (!resume.projects?.length) {
    return '';
  }

  return `
    <section class="section projects-section">
      <div class="section-heading">
        <span class="section-kicker">Selected Work</span>
        <h2>Project Highlights</h2>
      </div>

      <div class="projects">
        ${resume.projects
          .map(
            (project: any) => `
              <article class="project">

                <div class="project-title-row">
                  <h3>
                    ${escapeHtml(project.name)}
                  </h3>

                  ${
                    project.url
                      ? `
                        <a
                          class="project-url"
                          href="${escapeHtml(project.url)}"
                        >
                          ${escapeHtml(project.url)}
                        </a>
                      `
                      : ''
                  }
                </div>

                <p class="project-description">
                  ${escapeHtml(project.description)}
                </p>

                ${
                  project.technologies?.length
                    ? `
                      <div class="project-technologies">
                        ${project.technologies
                          .map(
                            (technology: any) =>
                              `<span class="technology">
                                ${escapeHtml(technology)}
                              </span>`,
                          )
                          .join('')}
                      </div>
                    `
                    : ''
                }

              </article>
            `,
          )
          .join('')}
      </div>
    </section>
  `;
}

function renderExperience(
  resume: CreateResumeDto,
  labels: ResumeLabels,
): string {
  if (!resume.experience?.length) {
    return '';
  }

  return `
    <section class="section">
      <div class="section-heading">
        <span class="section-kicker">
          ${escapeHtml(labels.professionalBackground)}
        </span>

        <h2>${escapeHtml(labels.experience2)}</h2>
      </div>

      <div class="experience">
        ${resume.experience
          .map(
            (item: any) => `
              <article class="experience-item">

                <div class="experience-main">

                  <h3>
                    ${escapeHtml(item.company)}
                  </h3>

                  <div class="position">
                    ${escapeHtml(item.position)}
                    ${item.location ? ` · ${escapeHtml(item.location)}` : ''}
                  </div>

                  ${
                    item.description
                      ? `
                        <p class="description">
                          ${escapeHtml(item.description)}
                        </p>
                      `
                      : ''
                  }

                  ${
                    item.achievements?.length
                      ? `
                        <ul class="achievements">
                          ${item.achievements
                            .map(
                              (achievement: any) =>
                                `<li>
                                  ${escapeHtml(achievement)}
                                </li>`,
                            )
                            .join('')}
                        </ul>
                      `
                      : ''
                  }

                  ${
                    item.technologies?.length
                      ? `
                        <div class="experience-tech">
                          <strong>Technologies:</strong>
                          ${item.technologies
                            .map((technology: any) => escapeHtml(technology))
                            .join(', ')}
                        </div>
                      `
                      : ''
                  }

                </div>

                <div class="experience-date">
                  ${escapeHtml(item.startDate)}
                  —
                  ${escapeHtml(item.endDate ?? labels.present)}
                </div>

              </article>
            `,
          )
          .join('')}
      </div>
    </section>
  `;
}

function renderSkills(
  resume: CreateResumeDto,
  labels: ResumeLabels,
): string {
  const technical = resume.skills?.technical ?? [];

  const soft = resume.skills?.soft ?? [];

  if (!technical.length && !soft.length) {
    return '';
  }

  return `
    <section class="section">
      <div class="section-heading">
        <span class="section-kicker">
          ${escapeHtml(labels.toolkit)}
        </span>

        <h2>${labels.skills}</h2>
      </div>

      <div class="skills">

        ${
          technical.length
            ? `
              <div class="skill-group">
                <div class="skill-label">
                  ${escapeHtml(labels.technical)}
                </div>

                <div class="skill-list">
                  ${technical
                    .map(
                      (skill: any) =>
                        `<span class="skill">
                          ${escapeHtml(skill)}
                        </span>`,
                    )
                    .join('')}
                </div>
              </div>
            `
            : ''
        }

        ${
          soft.length
            ? `
              <div class="skill-group">
                <div class="skill-label">
                  ${escapeHtml(labels.professional)}
                </div>

                <div class="skill-list">
                  ${soft
                    .map(
                      (skill: any) =>
                        `<span class="skill">
                          ${escapeHtml(skill)}
                        </span>`,
                    )
                    .join('')}
                </div>
              </div>
            `
            : ''
        }

      </div>
    </section>
  `;
}

function renderEducation(
  resume: CreateResumeDto,
  labels: ResumeLabels,
): string {
  if (!resume.education?.length) {
    return '';
  }

  return `
    <section class="section">
      <div class="section-heading">
        <span class="section-kicker">
          ${escapeHtml(labels.academicBackground)}
        </span>

        <h2>${labels.education}</h2>
      </div>

      <div class="education">
        ${resume.education
          .map(
            (item: any) => `
              <article class="education-item">

                <div>
                  <h3>
                    ${escapeHtml(item.degree)}
                  </h3>

                  <div class="institution">
                    ${escapeHtml(item.institution)}

                    ${
                      item.fieldOfStudy
                        ? ` · ${escapeHtml(item.fieldOfStudy)}`
                        : ''
                    }

                    ${item.location ? ` · ${escapeHtml(item.location)}` : ''}
                  </div>
                </div>

                <div class="education-date">
                  ${escapeHtml(item.startDate)}
                  —
                  ${escapeHtml(item.endDate)}
                </div>

              </article>
            `,
          )
          .join('')}
      </div>
    </section>
  `;
}

function renderCertifications(
  resume: CreateResumeDto,
  labels: ResumeLabels,
): string {
  if (!resume.certifications?.length) {
    return '';
  }

  return `
    <section class="section">
      <div class="section-heading">
        <span class="section-kicker">
          Credentials
        </span>

        <h2>${labels.certifications}</h2>
      </div>

      <div class="certifications">
        ${resume.certifications
          .map(
            (item: any) => `
              <article class="certification">

                <div>
                  <h3>
                    ${escapeHtml(item.name)}
                  </h3>

                  <div class="issuer">
                    ${escapeHtml(item.issuer)}
                  </div>
                </div>

                ${
                  item.date
                    ? `
                      <div class="certification-date">
                        ${escapeHtml(item.date)}
                      </div>
                    `
                    : ''
                }

              </article>
            `,
          )
          .join('')}
      </div>
    </section>
  `;
}

function renderLanguages(
  resume: CreateResumeDto,
  labels: ResumeLabels,
): string {
  if (!resume.languages?.length) {
    return '';
  }

  return `
    <section class="section">
      <div class="section-heading">
        <span class="section-kicker">
          ${escapeHtml(labels.communication)}
        </span>

        <h2>${labels.languages}</h2>
      </div>

      <div class="languages">
        ${resume.languages
          .map(
            (language: any) => `
              <div class="language">
                <strong>
                  ${escapeHtml(language.name)}
                </strong>

                <span>
                  ${escapeHtml(language.level)}
                </span>
              </div>
            `,
          )
          .join('')}
      </div>
    </section>
  `;
}

export function buildShowcaseResumeHtml(
  resume: CreateResumeDto,
  context: ResumeTemplateContext = {},
): string {
  const labels = getResumeLabels(
    resume.language ?? ResumeLanguage.ENGLISH,
  );

  const fullName = `${resume.personal.firstName} ${resume.personal.lastName}`;

  const profilePhoto = context.photoDataUrl
    ? `
        <img
          class="profile-photo"
          src="${context.photoDataUrl}"
          alt="Profile photo"
        />
      `
    : '';

  return `
    <!DOCTYPE html>

    <html lang="${escapeHtml(resume.language ?? ResumeLanguage.ENGLISH)}">

      <head>
        <meta charset="UTF-8" />

        <style>

          @page {
            size: Letter;
            margin: 0.48in 0.58in;
          }

          * {
            box-sizing: border-box;
          }

          html,
          body {
            margin: 0;
            padding: 0;
          }

          body {
            font-family:
              Arial,
              Helvetica,
              sans-serif;

            color: #1f2937;

            font-size: 10pt;

            line-height: 1.4;

            background: #ffffff;
          }

          .resume {
            width: 100%;
          }

          /* --------------------------------
             Header
          -------------------------------- */

          header {
            display: grid;
            grid-template-columns: 1fr auto;
            gap: 28px;

            padding-bottom: 18px;
            margin-bottom: 20px;

            border-bottom: 2px solid #1f2937;
          }

          .identity {
            min-width: 0;
          }

          .name {
            margin: 0;

            font-size: 28pt;
            line-height: 1.05;

            font-weight: 700;

            letter-spacing: -0.7px;

            color: #111827;
          }

          .job-title {
            margin-top: 5px;

            font-size: 12pt;

            font-weight: 600;

            color: #64748b;
          }

          .contact,
          .links {
            display: flex;
            flex-wrap: wrap;
            align-items: center;

            gap: 6px;

            margin-top: 9px;

            font-size: 8.9pt;
          }

          .links {
            margin-top: 4px;
          }

          .separator {
            color: #94a3b8;
          }

          a {
            color: inherit;
            text-decoration: none;
          }

          .profile-photo {
            width: 86px;
            height: 86px;

            object-fit: cover;

            border-radius: 14px;

            border: 1px solid #cbd5e1;

            background: #f8fafc;
          }

          /* --------------------------------
             General sections
          -------------------------------- */

          .section {
            margin-bottom: 19px;
          }

          .section-heading {
            display: flex;
            align-items: baseline;
            gap: 9px;

            margin-bottom: 9px;
          }

          .section-kicker {
            font-size: 7.5pt;

            font-weight: 700;

            text-transform: uppercase;

            letter-spacing: 1.1px;

            color: #64748b;
          }

          h2 {
            margin: 0;

            font-size: 12pt;

            line-height: 1.2;

            font-weight: 700;

            color: #111827;
          }

          /* --------------------------------
             Summary
          -------------------------------- */

          .summary {
            margin: 0;

            color: #374151;
          }

          /* --------------------------------
             Projects
          -------------------------------- */

          .projects {
            display: block;
          }

          .project {
            position: relative;

            padding-left: 14px;

            margin-bottom: 13px;

            break-inside: avoid;
          }

          .project::before {
            content: '';

            position: absolute;

            left: 0;
            top: 3px;
            bottom: 3px;

            width: 3px;

            border-radius: 2px;

            background: #475569;
          }

          .project:last-child {
            margin-bottom: 0;
          }

          .project-title-row {
            display: flex;

            justify-content: space-between;
            align-items: baseline;

            gap: 14px;
          }

          .project h3 {
            margin: 0;

            font-size: 11.2pt;

            line-height: 1.2;

            color: #111827;
          }

          .project-url {
            flex-shrink: 0;

            font-size: 8.2pt;

            color: #64748b;

            overflow-wrap: anywhere;
          }

          .project-description {
            margin: 4px 0 6px;

            color: #374151;
          }

          .project-technologies {
            display: flex;

            flex-wrap: wrap;

            gap: 5px;
          }

          .technology {
            display: inline-block;

            padding: 2px 7px;

            border: 1px solid #cbd5e1;

            border-radius: 999px;

            font-size: 7.9pt;

            line-height: 1.25;

            color: #475569;

            background: #f8fafc;
          }

          /* --------------------------------
             Experience
          -------------------------------- */

          .experience {
            display: block;
          }

          .experience-item {
            display: grid;

            grid-template-columns: 1fr auto;

            gap: 18px;

            padding-bottom: 11px;

            margin-bottom: 11px;

            border-bottom: 1px solid #e2e8f0;

            break-inside: avoid;
          }

          .experience-item:last-child {
            padding-bottom: 0;
            margin-bottom: 0;

            border-bottom: 0;
          }

          .experience-main {
            min-width: 0;
          }

          .experience-main h3 {
            margin: 0;

            font-size: 10.5pt;

            color: #111827;
          }

          .position {
            margin-top: 2px;

            font-size: 8.9pt;

            font-weight: 600;

            color: #64748b;
          }

          .experience-date,
          .education-date {
            white-space: nowrap;

            font-size: 8.5pt;

            color: #64748b;
          }

          .description {
            margin: 5px 0;
          }

          .achievements {
            margin: 5px 0 0;

            padding-left: 17px;
          }

          .achievements li {
            margin-bottom: 2px;
          }

          .experience-tech {
            margin-top: 5px;

            font-size: 8.4pt;

            color: #64748b;
          }

          /* --------------------------------
             Skills
          -------------------------------- */

          .skill-group {
            margin-bottom: 7px;
          }

          .skill-group:last-child {
            margin-bottom: 0;
          }

          .skill-label {
            margin-bottom: 4px;

            font-size: 8.2pt;

            font-weight: 700;

            text-transform: uppercase;

            letter-spacing: 0.7px;

            color: #64748b;
          }

          .skill-list {
            display: flex;

            flex-wrap: wrap;

            gap: 5px;
          }

          .skill {
            padding: 3px 8px;

            border-radius: 999px;

            background: #f1f5f9;

            font-size: 8.3pt;

            color: #334155;
          }

          /* --------------------------------
             Education
          -------------------------------- */

          .education-item,
          .certification {
            display: grid;

            grid-template-columns: 1fr auto;

            gap: 18px;

            margin-bottom: 9px;

            break-inside: avoid;
          }

          .education-item:last-child,
          .certification:last-child {
            margin-bottom: 0;
          }

          .education-item h3,
          .certification h3 {
            margin: 0;

            font-size: 9.8pt;

            color: #111827;
          }

          .institution,
          .issuer {
            margin-top: 2px;

            font-size: 8.8pt;

            font-weight: 600;

            color: #64748b;
          }

          /* --------------------------------
             Certifications
          -------------------------------- */

          .certification-date {
            white-space: nowrap;

            font-size: 8.4pt;

            color: #64748b;
          }

          /* --------------------------------
             Languages
          -------------------------------- */

          .languages {
            display: flex;

            flex-wrap: wrap;

            gap: 10px 24px;
          }

          .language {
            display: flex;

            gap: 5px;

            font-size: 8.8pt;
          }

          .language span {
            color: #64748b;
          }

          /* --------------------------------
             Print
          -------------------------------- */

          @media print {

            .section,
            .project,
            .experience-item,
            .education-item,
            .certification {
              break-inside: avoid;
            }

            a {
              color: inherit;
            }

          }

        </style>
      </head>

      <body>

        <main class="resume">

          <header>

            <div class="identity">

              <h1 class="name">
                ${escapeHtml(fullName)}
              </h1>

              <div class="job-title">
                ${escapeHtml(resume.personal.jobTitle)}
              </div>

              ${renderContactInfo(resume)}

            </div>

            ${profilePhoto}

          </header>

          ${
            resume.summary
              ? `
                <section class="section">

                  <div class="section-heading">
                    <span class="section-kicker">
                      ${escapeHtml(labels.profile)}
                    </span>

                    <h2>${escapeHtml(labels.aboutMe)}</h2>
                  </div>

                  <p class="summary">
                    ${escapeHtml(resume.summary)}
                  </p>

                </section>
              `
              : ''
          }

          ${renderProjects(resume)}

          ${renderExperience(resume, labels)}

          ${renderSkills(resume, labels)}

          ${renderEducation(resume, labels)}

          ${renderCertifications(resume, labels)}

          ${renderLanguages(resume, labels)}

        </main>

      </body>
    </html>
  `;
}