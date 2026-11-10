export type Project = {
  name: string;
  repository: string;
  category: string;
  description: string;
  technologies: readonly string[];
  icon: 'layers' | 'database' | 'code' | 'workflow' | 'spark';
};

// Summaries describe the public READMEs, rather than planned features as shipped work.
export const projects: readonly Project[] = [
  {
    name: 'Data Product Demo',
    repository: 'Data-Product-Demo',
    category: 'Data products',
    description: 'An end-to-end data product blueprint bringing Snowflake, dbt, and Streamlit together. Infrastructure, layered analytics, and dashboards live in one repository, with Terraform and GitHub Actions for repeatable delivery.',
    technologies: ['Snowflake', 'dbt', 'Streamlit', 'Terraform'],
    icon: 'database',
  },
  {
    name: 'Data Platform Demo',
    repository: 'Data-Platform-Demo',
    category: 'Cloud foundations',
    description: 'A reusable AWS foundation for data products. Shared infrastructure, storage, security guardrails, logging, and lakehouse conventions are separated from the product workloads that use them.',
    technologies: ['AWS', 'Terraform', 'IAM', 'GitHub Actions'],
    icon: 'layers',
  },
  {
    name: 'Full-Stack WebApp Demo',
    repository: 'Full-Stack-WebApp-Demo',
    category: 'Web applications',
    description: 'A practical React and Django REST application demonstrating frontend and backend communication, registration, and address capture. Docker Compose brings the application and Postgres/PostGIS together for local development.',
    technologies: ['React', 'Django', 'Postgres', 'Docker'],
    icon: 'code',
  },
  {
    name: 'dbt Platform Framework',
    repository: 'dbt-Platform-Framework',
    category: 'Analytics engineering',
    description: 'A shared dbt utilities layer alongside an example data product. Reusable macros, environment-aware naming, query tagging, audit metadata, and custom tests show how standards can become part of everyday analytics work.',
    technologies: ['dbt', 'Snowflake', 'SQL', 'CI'],
    icon: 'workflow',
  },
  {
    name: 'EngineerOS Demo',
    repository: 'EngineerOS-Demo',
    category: 'AI-assisted engineering',
    description: 'A runnable demonstration of a controlled coding-agent workflow: understand the code, clarify a requirement, prepare an isolated proposal, validate, review, and hand off. A fictional sample project keeps the reasoning and human checkpoints visible.',
    technologies: ['Python', 'SQLite', 'Coding agents', 'Engineering workflows'],
    icon: 'spark',
  },
];

export const githubProfile = 'https://github.com/Nima-Farhang';
