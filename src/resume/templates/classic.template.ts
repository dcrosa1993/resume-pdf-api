import { CreateResumeDto } from "../dto/create-resume.dto.js";

function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function renderList(items: string[] = []): string {
  if (!items.length) {
    return '';
  }

  return `
    <ul>
      ${items
        .map((item) => `<li>${escapeHtml(item)}</li>`)
        .join('')}
    </ul>
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
          (item: CreateResumeDto['experience'][0]) => `
            <article class="experience-item">
              <div class="item-header">
                <div>
                  <h3>${escapeHtml(item.position)}</h3>
                  <div class="company">
                    ${escapeHtml(item.company)}
                    ${
                      item.location
                        ? ` · ${escapeHtml(item.location)}`
                        : ''
                    }
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
                  ? `<p>${escapeHtml(item.description)}</p>`
                  : ''
              }

              ${renderList(item.achievements)}

              ${
                item.technologies?.length
                  ? `
                    <div class="technologies">
                      <strong>Technologies:</strong>
                      ${item.technologies.map(escapeHtml).join(', ')}
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
                <div>
                  <h3>${escapeHtml(item.degree)}</h3>

                  <div class="institution">
                    ${escapeHtml(item.institution)}
                    ${
                      item.fieldOfStudy
                        ? ` · ${escapeHtml(item.fieldOfStudy)}`
                        : ''
                    }
                    ${
                      item.location
                        ? ` · ${escapeHtml(item.location)}`
                        : ''
                    }
                  </div>
                </div>

                ${
                  item.startDate || item.endDate
                    ? `
                      <div class="date">
                        ${escapeHtml(item.startDate ?? '')}
                        ${
                          item.startDate || item.endDate
                            ? ' - '
                            : ''
                        }
                        ${escapeHtml(item.endDate ?? '')}
                      </div>
                    `
                    : ''
                }
              </div>
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
            <div class="skill-group">
              <strong>Technical Skills:</strong>
              <span>${technical.map(escapeHtml).join(', ')}</span>
            </div>
          `
          : ''
      }

      ${
        soft.length
          ? `
            <div class="skill-group">
              <strong>Soft Skills:</strong>
              <span>${soft.map(escapeHtml).join(', ')}</span>
            </div>
          `
          : ''
      }
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
            <article class="simple-item">
              <h3>${escapeHtml(item.name)}</h3>

              <div>
                ${escapeHtml(item.issuer)}
                ${
                  item.date
                    ? ` · ${escapeHtml(item.date)}`
                    : ''
                }

                ${
                  item.url
                    ? `
                      ·
                      <a href="${escapeHtml(item.url)}">
                        Verification
                      </a>
                    `
                    : ''
                }
              </div>
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
              <div>
                <strong>${escapeHtml(language.name)}</strong>
                <span> — ${escapeHtml(language.level)}</span>
              </div>
            `,
          )
          .join('')}
      </div>
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
              <h3>
                ${escapeHtml(project.name)}
                ${
                  project.url
                    ? `
                      <a
                        href="${escapeHtml(project.url)}"
                        class="project-link"
                      >
                        ${escapeHtml(project.url)}
                      </a>
                    `
                    : ''
                }
              </h3>

              <p>${escapeHtml(project.description)}</p>

              ${
                project.technologies?.length
                  ? `
                    <div class="technologies">
                      <strong>Technologies:</strong>
                      ${project.technologies
                        .map(escapeHtml)
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

export function buildClassicResumeHtml(
  resume: CreateResumeDto,
): string {
  const fullName = `${resume.personal.firstName} ${resume.personal.lastName}`;

  const contactItems = [
    resume.personal.email,
    resume.personal.phone,
    resume.personal.location,
  ].filter(Boolean);

  const profileLinks = [
    resume.personal.linkedin,
    resume.personal.github,
    resume.personal.website,
  ].filter(Boolean);

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />

        <title>${escapeHtml(fullName)} - Resume</title>

        <style>
          @page {
            size: Letter;
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
            color: #222;
            background: #fff;
            font-size: 10.5pt;
            line-height: 1.45;
          }

          h1,
          h2,
          h3,
          p {
            margin-top: 0;
          }

          a {
            color: inherit;
            text-decoration: underline;
          }

          .resume {
            width: 100%;
          }

          header {
            margin-bottom: 18px;
          }

          h1 {
            margin-bottom: 4px;
            font-size: 24pt;
            line-height: 1.1;
            font-weight: 700;
          }

          .job-title {
            font-size: 13pt;
            font-weight: 600;
            margin-bottom: 9px;
          }

          .contact {
            display: block;
            margin-bottom: 3px;
          }

          .contact-item {
            display: inline;
          }

          .contact-item:not(:last-child)::after {
            content: " | ";
          }

          .links {
            display: block;
          }

          .link-item {
            display: inline;
          }

          .link-item:not(:last-child)::after {
            content: " | ";
          }

          section {
            margin-top: 16px;
            break-inside: auto;
          }

          section h2 {
            font-size: 12pt;
            line-height: 1.2;
            text-transform: uppercase;
            letter-spacing: 0.4px;
            border-bottom: 1px solid #444;
            padding-bottom: 4px;
            margin-bottom: 10px;
          }

          h3 {
            font-size: 10.5pt;
            line-height: 1.2;
            margin-bottom: 3px;
          }

          .item-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 15px;
          }

          .date {
            white-space: nowrap;
            text-align: right;
          }

          .company,
          .institution {
            font-size: 10pt;
          }

          .experience-item,
          .education-item,
          .simple-item,
          .project-item {
            break-inside: avoid;
            margin-bottom: 12px;
          }

          p {
            margin-bottom: 6px;
          }

          ul {
            margin-top: 5px;
            margin-bottom: 7px;
            padding-left: 18px;
          }

          li {
            margin-bottom: 3px;
          }

          .technologies {
            font-size: 9.5pt;
            margin-top: 5px;
          }

          .skill-group {
            margin-bottom: 5px;
          }

          .languages > div {
            margin-bottom: 3px;
          }

          .project-link {
            font-weight: normal;
            margin-left: 5px;
            font-size: 9pt;
          }

          .summary {
            margin-bottom: 0;
          }

          @media print {
            a {
              text-decoration: none;
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

            ${
              contactItems.length
                ? `
                  <div class="contact">
                    ${contactItems
                      .map(
                        (item) => `
                          <span class="contact-item">
                            ${escapeHtml(item)}
                          </span>
                        `,
                      )
                      .join('')}
                  </div>
                `
                : ''
            }

            ${
              profileLinks.length
                ? `
                  <div class="links">
                    ${profileLinks
                      .map(
                        (url) => `
                          <span class="link-item">
                            <a href="${escapeHtml(url)}">
                              ${escapeHtml(url)}
                            </a>
                          </span>
                        `,
                      )
                      .join('')}
                  </div>
                `
                : ''
            }
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