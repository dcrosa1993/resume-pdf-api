# Resume PDF API

A REST API built with **NestJS** for generating professional, ATS-friendly and AI-readable resumes as PDF documents.

The API receives structured resume data and generates a properly formatted PDF using **Puppeteer**, with multiple visual templates and built-in PDF validation.

> 🚧 **Project status:** Early public release / active development

## Features

* Generate resumes as PDF documents
* ATS-friendly, single-column layouts
* AI-readable semantic HTML structure
* Multiple resume templates
* JSON-based resume input
* Built-in request validation
* PDF text extraction and validation
* Swagger / OpenAPI documentation
* Reusable and extensible template architecture
* Server-side PDF generation with Puppeteer

## Available Templates

| Template  | Description                                                       |
| --------- | ----------------------------------------------------------------- |
| `classic` | Conservative ATS-first resume layout                              |
| `modern`  | Cleaner visual hierarchy with a more contemporary appearance      |
| `compact` | High-density layout designed to fit more content into fewer pages |

The same resume data can be rendered using any available template.

## Architecture

```text
Client
  │
  ▼
REST API
  │
  ▼
ResumeController
  │
  ▼
ResumeService
  │
  ├── PdfService
  │     │
  │     └── Puppeteer
  │     │       └── HTML → PDF
  │     │
  │     └── Template Registry
  │             ├── Classic
  │             ├── Modern
  │             └── Compact
  │
  └── PdfValidationService
          └── PDF text extraction / validation
```

## Tech Stack

* **Node.js**
* **NestJS**
* **TypeScript**
* **Puppeteer**
* **pdf-parse**
* **class-validator**
* **class-transformer**
* **Swagger / OpenAPI**

## API

### Generate Resume PDF

```http
POST /resume/pdf
Content-Type: application/json
Accept: application/pdf
```

Generates a PDF resume from structured JSON data.

### Example Request

```json
{
  "template": "modern",
  "personal": {
    "firstName": "John",
    "lastName": "Doe",
    "jobTitle": "Senior Software Engineer",
    "email": "john.doe@example.com",
    "phone": "+1 555 123 4567",
    "location": "Miami, FL",
    "linkedin": "https://www.linkedin.com/in/johndoe",
    "github": "https://github.com/johndoe",
    "website": "https://johndoe.dev"
  },
  "summary": "Senior Software Engineer with 8+ years of experience building scalable web applications and APIs.",
  "experience": [
    {
      "company": "Example Inc.",
      "position": "Senior Software Engineer",
      "location": "Remote",
      "startDate": "2022-01",
      "endDate": "Present",
      "description": "Developed and maintained enterprise web applications used by thousands of users.",
      "achievements": [
        "Reduced API response time by 35%",
        "Led migration from AngularJS to Angular",
        "Implemented CI/CD pipelines using GitHub Actions"
      ],
      "technologies": [
        "Angular",
        "TypeScript",
        "Node.js",
        "PostgreSQL"
      ]
    }
  ],
  "skills": {
    "technical": [
      "TypeScript",
      "JavaScript",
      "Angular",
      "React",
      "Node.js",
      "NestJS",
      "PostgreSQL",
      "Docker"
    ],
    "soft": [
      "Leadership",
      "Problem Solving",
      "Communication"
    ]
  }
}
```

### Response

The endpoint returns the generated resume as:

```http
Content-Type: application/pdf
Content-Disposition: attachment; filename="resume.pdf"
```

## Validate Generated PDF

```http
POST /resume/pdf/validate
Content-Type: multipart/form-data
```

Upload a generated PDF using the `file` field to inspect whether the document contains extractable text and basic structural information.

Example response:

```json
{
  "text": "John Doe\nSenior Software Engineer...",
  "pageCount": 1
}
```

## Swagger

Interactive API documentation is available at:

```text
http://localhost:3000/docs
```

Swagger provides the OpenAPI definition for the available endpoints and request models.

## Getting Started

### Requirements

* Node.js 20+
* npm

### Installation

```bash
git clone <repository-url>

cd resume-pdf-api

npm install
```

### Puppeteer Browser

Puppeteer requires a compatible browser installation.

```bash
npx puppeteer browsers install chrome
```

### Run the application

Development:

```bash
npm run start:dev
```

The API will be available at:

```text
http://localhost:3000
```

Swagger:

```text
http://localhost:3000/docs
```

## Project Structure

```text
src/
└── resume/
    ├── dto/
    │   └── create-resume.dto.ts
    │
    ├── pdf/
    │   └── pdf.service.ts
    │
    ├── templates/
    │   ├── classic.template.ts
    │   ├── modern.template.ts
    │   ├── compact.template.ts
    │   ├── template.registry.ts
    │   └── template.types.ts
    │
    ├── resume.controller.ts
    ├── resume.service.ts
    └── resume.module.ts
```

## Design Goals

This project is designed around a few principles.

### ATS Compatibility

Resume content is rendered as regular text using semantic HTML instead of relying on images, graphical elements, tables or text embedded inside visual components.

### AI Readability

The generated document preserves a predictable textual hierarchy:

```text
Name
Job Title
Contact Information

Professional Summary

Professional Experience

Skills

Projects

Education

Certifications

Languages
```

This makes the resulting PDF easier for downstream text extraction and document-processing systems to interpret.

### Template Independence

Resume data is separated from visual presentation.

The same `CreateResumeDto` can be rendered through different templates without changing the underlying resume model.

```text
Resume Data
    │
    ├── Classic
    ├── Modern
    └── Compact
```

Adding a new visual template should not require changes to the API contract.

## Current Limitations

This project is currently focused on reliable PDF generation and document structure.

The following capabilities are planned for future versions:

* Additional resume templates
* More advanced PDF structural validation
* Resume quality scoring
* Job description matching
* Keyword analysis
* Resume optimization suggestions
* Authentication and API keys
* Usage limits and rate limiting
* Production deployment
* Public API hosting
* RapidAPI Marketplace integration

## Roadmap

### Phase 1 — Core API

* [x] Resume DTO
* [x] Request validation
* [x] PDF generation
* [x] Swagger documentation
* [x] PDF text extraction
* [x] PDF validation
* [x] Classic template
* [x] Modern template
* [x] Compact template

### Phase 2 — API Productization

* [ ] Production deployment
* [ ] Authentication / API keys
* [ ] Rate limiting
* [ ] Usage tracking
* [ ] API error standardization
* [ ] Better PDF validation
* [ ] OpenAPI production specification

### Phase 3 — Resume Intelligence

* [ ] Job description analysis
* [ ] Keyword extraction
* [ ] Resume/job compatibility analysis
* [ ] Resume improvement suggestions
* [ ] AI-assisted resume generation

### Phase 4 — Marketplace

* [ ] RapidAPI integration
* [ ] Public API listing
* [ ] Usage-based pricing
* [ ] API examples and tutorials

## Why This Project?

Resume generation is often treated as a document-generation problem, but a useful resume API also needs to consider:

* document structure
* machine readability
* consistent rendering
* PDF extraction
* template extensibility
* API usability

This project explores those concerns through a production-oriented REST API architecture.

## License

This project is currently available for public portfolio and development purposes.

A formal open-source license will be added in a future release.
