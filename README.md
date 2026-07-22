# Kamohelo Portfolio

A modern portfolio website for a professional working across customer strategy, digital sales, brand and digital marketing.

## Current structure

```text
assets/
├── documents/
│   ├── case-studies/
│   └── certificates/
└── images/
    ├── background/
    ├── profile/
    └── projects/
        ├── brand-strategy/
        ├── digital-campaign/
        └── marketing-analytics/

css/
└── style.css

data/
├── README.md
└── projects.json

js/
└── main.js

projects/
├── brand-strategy/
├── digital-campaign/
└── marketing-analytics/

index.html
```

## What is already implemented

- Responsive portfolio website
- Mobile navigation
- Scroll reveal animations
- Interactive project case-study modal
- Customer strategy, marketing and growth positioning
- Learning/certification section
- Contact section
- Organised project folders
- Project documentation and deliverable guidance
- Structured project data in `data/projects.json`
- Replaceable visual placeholders

## Personalisation still required

Replace the existing placeholder information in `index.html` with:

- Final professional name and title
- About section
- Real work experience
- Education details
- Real certifications
- Professional email address
- LinkedIn URL
- Profile image
- Final project images and completed case studies

The website structure and project framework are already prepared for this.

## Run locally

From the project folder:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Deployment

This project can be deployed through GitHub Pages, Netlify, Vercel or another static hosting provider.
