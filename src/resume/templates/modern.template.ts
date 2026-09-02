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

function renderExperience(resume: CreateResumeDto): string {
  if (!resume.experience?.length) {
    return '';
  }

  return `
    <section>
      <div class="section-title">Professional Experience</div>

      ${resume.experience
        .map(
          (item: any) => `
            <article class="experience-item">
              <div class="item-heading">
                <div>
                  <h3>${escapeHtml(item.position)}</h3>

                  <div class="company">
                    ${escapeHtml(item.company)}
                    ${item.location ? ` · ${escapeHtml(item.location)}` : ''}
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
                        .map((tech: any) => escapeHtml(tech))
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
  if (!resume.skills?.technical?.length && !resume.skills?.soft?.length) {
    return '';
  }

  return `
    <section>
      <div class="section-title">Skills</div>

      ${
        resume.skills.technical?.length
          ? `
            <div class="skill-group">
              <strong>Technical Skills</strong>
              <div class="skill-text">
                ${resume.skills.technical
                  .map((skill: any) => escapeHtml(skill))
                  .join(' · ')}
              </div>
            </div>
          `
          : ''
      }

      ${
        resume.skills.soft?.length
          ? `
            <div class="skill-group">
              <strong>Soft Skills</strong>
              <div class="skill-text">
                ${resume.skills.soft
                  .map((skill: any) => escapeHtml(skill))
                  .join(' · ')}
              </div>
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
      <div class="section-title">Projects</div>

      ${resume.projects
        .map(
          (project: any) => `
            <article class="project-item">
              <h3>${escapeHtml(project.name)}</h3>

              ${
                project.url
                  ? `
                    <a class="project-url"
                       href="${escapeHtml(project.url)}">
                      ${escapeHtml(project.url)}
                    </a>
                  `
                  : ''
              }

              <p class="description">
                ${escapeHtml(project.description)}
              </p>

              ${
                project.technologies?.length
                  ? `
                    <div class="technologies">
                      <strong>Technologies:</strong>
                      ${project.technologies
                        .map((tech: any) => escapeHtml(tech))
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
      <div class="section-title">Education</div>

      ${resume.education
        .map(
          (item) => `
            <article class="education-item">
              <div class="item-heading">
                <div>
                  <h3>${escapeHtml(item.degree)}</h3>

                  <div class="company">
                    ${escapeHtml(item.institution)}

                    ${
                      item.fieldOfStudy
                        ? ` · ${escapeHtml(item.fieldOfStudy)}`
                        : ''
                    }

                    ${item.location ? ` · ${escapeHtml(item.location)}` : ''}
                  </div>
                </div>

                <div class="date">
                  ${escapeHtml(item.startDate ?? '')}
                  -
                  ${escapeHtml(item.endDate ?? '')}
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
      <div class="section-title">Certifications</div>

      ${resume.certifications
        .map(
          (item) => `
            <article class="certification-item">
              <h3>${escapeHtml(item.name)}</h3>

              <div class="company">
                ${escapeHtml(item.issuer)}

                ${item.date ? ` · ${escapeHtml(item.date)}` : ''}
              </div>

              ${
                item.url
                  ? `
                    <a class="verification-url"
                       href="${escapeHtml(item.url)}">
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
      <div class="section-title">Languages</div>

      <div class="languages">
        ${resume.languages
          .map(
            (language) => `
              <div class="language">
                <strong>${escapeHtml(language.name)}</strong>
                <span>${escapeHtml(language.level)}</span>
              </div>
            `,
          )
          .join('')}
      </div>
    </section>
  `;
}

export function buildModernResumeHtml(resume: CreateResumeDto): string {
  const fullName = `${resume.personal.firstName} ${resume.personal.lastName}`;

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />

        <style>
          @page {
            size: Letter;
            margin: 0.5in 0.6in;
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
            font-size: 10.5pt;
            line-height: 1.45;
          }

          .resume {
            width: 100%;
          }

          header {
            padding-bottom: 16px;
            margin-bottom: 20px;
            border-bottom: 2px solid #1f2937;
          }

          h1 {
            margin: 0;
            font-size: 27pt;
            line-height: 1.1;
            font-weight: 700;
            letter-spacing: -0.5px;
            color: #111827;
          }

          .job-title {
            margin-top: 5px;
            font-size: 12.5pt;
            font-weight: 600;
            color: #4b5563;
          }

          .contact,
          .links {
            display: flex;
            flex-wrap: wrap;
            gap: 7px;
            align-items: center;
            margin-top: 8px;
            font-size: 9.5pt;
          }

          .links {
            margin-top: 4px;
          }

          .contact a,
          .links a,
          a {
            color: inherit;
            text-decoration: none;
          }

          .separator {
            color: #9ca3af;
          }

          section {
            margin-bottom: 18px;
          }

          .section-title {
            margin-bottom: 9px;
            padding-bottom: 4px;
            border-bottom: 1px solid #d1d5db;
            font-size: 10.5pt;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1.2px;
            color: #111827;
          }

          .summary {
            margin: 0;
          }

          .experience-item,
          .education-item,
          .project-item,
          .certification-item {
            margin-bottom: 14px;
          }

          .item-heading {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 18px;
          }

          h3 {
            margin: 0;
            font-size: 10.8pt;
            line-height: 1.25;
            font-weight: 700;
            color: #111827;
          }

          .company {
            margin-top: 2px;
            font-size: 9.8pt;
            font-weight: 600;
            color: #4b5563;
          }

          .date {
            flex-shrink: 0;
            white-space: nowrap;
            font-size: 9pt;
            color: #6b7280;
          }

          .description {
            margin: 6px 0 5px;
          }

          .bullet-list {
            margin: 5px 0 0;
            padding-left: 18px;
          }

          .bullet-list li {
            margin-bottom: 3px;
          }

          .technologies {
            margin-top: 6px;
            font-size: 9.3pt;
            color: #4b5563;
          }

          .skill-group {
            margin-bottom: 7px;
          }

          .skill-group strong {
            display: inline-block;
            margin-right: 5px;
          }

          .skill-text {
            display: inline;
          }

          .project-url,
          .verification-url {
            display: block;
            margin-top: 2px;
            font-size: 9pt;
            overflow-wrap: anywhere;
          }

          .languages {
            display: flex;
            flex-wrap: wrap;
            gap: 18px;
          }

          .language {
            display: flex;
            gap: 5px;
          }

          .language span {
            color: #6b7280;
          }

          @media print {
            .experience-item,
            .education-item,
            .project-item,
            .certification-item {
              break-inside: avoid;
            }

            section {
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
                  <div class="section-title">
                    Professional Summary
                  </div>

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
