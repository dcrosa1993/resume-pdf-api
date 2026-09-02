import { CreateResumeDto } from '../dto/create-resume.dto.js';

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function renderList(items?: string[]): string {
  if (!items?.length) {
    return '';
  }

  return `
    <ul class="bullet-list">
      ${items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
    </ul>
  `;
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
        .join('<span class="separator">|</span>')}
    </div>

    ${
      links.length
        ? `
          <div class="links">
            ${links.join('<span class="separator">|</span>')}
          </div>
        `
        : ''
    }
  `;
}

function renderExperience(resume: CreateResumeDto): string {
  if (!resume.experience?.length) {
    return '';
  }

  return `
    <section>
      <h2>Professional Experience</h2>

      ${resume.experience
        .map(
          (item: any) => `
            <article class="experience-item">
              <div class="item-header">
                <div class="primary-info">
                  <h3>${escapeHtml(item.position)}</h3>

                  <div class="company">
                    ${escapeHtml(item.company)}
                    ${item.location ? `, ${escapeHtml(item.location)}` : ''}
                  </div>
                </div>

                <div class="date">
                  ${escapeHtml(item.startDate)}
                  -
                  ${escapeHtml(item.endDate ?? 'Present')}
                </div>
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

              ${renderList(item.achievements)}

              ${
                item.technologies?.length
                  ? `
                    <div class="technologies">
                      <strong>Technologies:</strong>
                      ${item.technologies
                        .map((technology: any) => escapeHtml(technology))
                        .join(', ')}
                    </div>
                  `
                  : ''
              }
            </article>
          `,
        )
        .join('')}
    </section>
  `;
}

function renderSkills(resume: CreateResumeDto): string {
  const technical = resume.skills?.technical ?? [];
  const soft = resume.skills?.soft ?? [];

  if (!technical.length && !soft.length) {
    return '';
  }

  return `
    <section>
      <h2>Skills</h2>

      ${
        technical.length
          ? `
            <div class="skill-line">
              <strong>Technical:</strong>
              ${technical.map((skill: any) => escapeHtml(skill)).join(', ')}
            </div>
          `
          : ''
      }

      ${
        soft.length
          ? `
            <div class="skill-line">
              <strong>Soft:</strong>
              ${soft.map((skill: any) => escapeHtml(skill)).join(', ')}
            </div>
          `
          : ''
      }
    </section>
  `;
}

function renderProjects(resume: CreateResumeDto): string {
  if (!resume.projects?.length) {
    return '';
  }

  return `
    <section>
      <h2>Projects</h2>

      ${resume.projects
        .map(
          (project: any) => `
            <article class="project-item">
              <div class="project-header">
                <h3>${escapeHtml(project.name)}</h3>

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

              <p class="description">
                ${escapeHtml(project.description)}
              </p>

              ${
                project.technologies?.length
                  ? `
                    <div class="technologies">
                      <strong>Technologies:</strong>
                      ${project.technologies
                        .map((technology: any) => escapeHtml(technology))
                        .join(', ')}
                    </div>
                  `
                  : ''
              }
            </article>
          `,
        )
        .join('')}
    </section>
  `;
}

function renderEducation(resume: CreateResumeDto): string {
  if (!resume.education?.length) {
    return '';
  }

  return `
    <section>
      <h2>Education</h2>

      ${resume.education
        .map(
          (item: any) => `
            <article class="education-item">
              <div class="item-header">
                <div class="primary-info">
                  <h3>${escapeHtml(item.degree)}</h3>

                  <div class="company">
                    ${escapeHtml(item.institution)}
                    ${
                      item.fieldOfStudy
                        ? `, ${escapeHtml(item.fieldOfStudy)}`
                        : ''
                    }
                    ${item.location ? `, ${escapeHtml(item.location)}` : ''}
                  </div>
                </div>

                <div class="date">
                  ${escapeHtml(item.startDate)}
                  -
                  ${escapeHtml(item.endDate)}
                </div>
              </div>
            </article>
          `,
        )
        .join('')}
    </section>
  `;
}

function renderCertifications(resume: CreateResumeDto): string {
  if (!resume.certifications?.length) {
    return '';
  }

  return `
    <section>
      <h2>Certifications</h2>

      ${resume.certifications
        .map(
          (item: any) => `
            <article class="certification-item">
              <div class="item-header">
                <div class="primary-info">
                  <h3>${escapeHtml(item.name)}</h3>

                  <div class="company">
                    ${escapeHtml(item.issuer)}
                  </div>
                </div>

                ${
                  item.date
                    ? `
                      <div class="date">
                        ${escapeHtml(item.date)}
                      </div>
                    `
                    : ''
                }
              </div>

              ${
                item.url
                  ? `
                    <a
                      class="verification-url"
                      href="${escapeHtml(item.url)}"
                    >
                      ${escapeHtml(item.url)}
                    </a>
                  `
                  : ''
              }
            </article>
          `,
        )
        .join('')}
    </section>
  `;
}

function renderLanguages(resume: CreateResumeDto): string {
  if (!resume.languages?.length) {
    return '';
  }

  return `
    <section>
      <h2>Languages</h2>

      <div class="languages">
        ${resume.languages
          .map(
            (language: any) => `
              <span class="language">
                <strong>${escapeHtml(language.name)}</strong>
                <span>(${escapeHtml(language.level)})</span>
              </span>
            `,
          )
          .join(', ')}
      </div>
    </section>
  `;
}

export function buildCompactResumeHtml(resume: CreateResumeDto): string {
  const fullName = `${resume.personal.firstName} ${resume.personal.lastName}`;

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />

        <style>
          @page {
            size: Letter;
            margin: 0.4in 0.48in;
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
            color: #202020;
            font-size: 9.5pt;
            line-height: 1.3;
          }

          .resume {
            width: 100%;
          }

          header {
            text-align: center;
            margin-bottom: 13px;
            padding-bottom: 10px;
            border-bottom: 1px solid #333;
          }

          h1 {
            margin: 0;
            font-size: 23pt;
            line-height: 1.05;
            font-weight: 700;
            color: #111;
          }

          .job-title {
            margin-top: 3px;
            font-size: 11pt;
            font-weight: 600;
          }

          .contact,
          .links {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 5px;
            margin-top: 5px;
            font-size: 8.7pt;
          }

          .links {
            margin-top: 2px;
          }

          .separator {
            color: #777;
          }

          a {
            color: inherit;
            text-decoration: none;
          }

          section {
            margin-bottom: 11px;
          }

          h2 {
            margin: 0 0 6px;
            padding-bottom: 2px;
            border-bottom: 1px solid #888;
            font-size: 9.5pt;
            line-height: 1.2;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.9px;
          }

          h3 {
            margin: 0;
            font-size: 9.7pt;
            line-height: 1.2;
            font-weight: 700;
          }

          .summary {
            margin: 0;
          }

          .item-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 12px;
          }

          .primary-info {
            min-width: 0;
          }

          .company {
            margin-top: 1px;
            font-size: 8.9pt;
            font-weight: 600;
          }

          .date {
            flex-shrink: 0;
            white-space: nowrap;
            font-size: 8.6pt;
          }

          .experience-item,
          .project-item,
          .education-item,
          .certification-item {
            margin-bottom: 8px;
          }

          .description {
            margin: 3px 0 3px;
          }

          .bullet-list {
            margin: 3px 0 0;
            padding-left: 15px;
          }

          .bullet-list li {
            margin-bottom: 1px;
          }

          .technologies {
            margin-top: 3px;
            font-size: 8.6pt;
          }

          .skill-line {
            margin-bottom: 3px;
          }

          .project-header {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            gap: 12px;
          }

          .project-url,
          .verification-url {
            font-size: 8.4pt;
            overflow-wrap: anywhere;
          }

          .languages {
            line-height: 1.45;
          }

          .language {
            white-space: nowrap;
          }

          @media print {
            section,
            .experience-item,
            .project-item,
            .education-item,
            .certification-item {
              break-inside: avoid;
            }
          }
        </style>
      </head>

      <body>
        <main class="resume">

          <header>
            <h1>${escapeHtml(fullName)}</h1>

            <div class="job-title">
              ${escapeHtml(resume.personal.jobTitle)}
            </div>

            ${renderContactInfo(resume)}
          </header>

          ${
            resume.summary
              ? `
                <section>
                  <h2>Professional Summary</h2>

                  <p class="summary">
                    ${escapeHtml(resume.summary)}
                  </p>
                </section>
              `
              : ''
          }

          ${renderExperience(resume)}
          ${renderSkills(resume)}
          ${renderProjects(resume)}
          ${renderEducation(resume)}
          ${renderCertifications(resume)}
          ${renderLanguages(resume)}

        </main>
      </body>
    </html>
  `;
}
