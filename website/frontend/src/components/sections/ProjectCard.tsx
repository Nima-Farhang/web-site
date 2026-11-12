import type { Project } from '../../content/portfolio';
import { githubProfile } from '../../content/portfolio';
import { Icon } from '../shared/Icon';

export function ProjectCard({
  project,
  index
}: {
  project: Project;
  index: number;
}) {
  return (
    <article className="project-card">
      <div className="project-topline">
        <span className="project-icon">
          <Icon name={project.icon} />
        </span>
        <span className="project-number">0{index + 1}</span>
      </div>
      <p className="eyebrow project-category">{project.category}</p>
      <h3>{project.name}</h3>
      <p className="project-description">{project.description}</p>
      <ul
        className="technology-list"
        aria-label={`${project.name} technologies`}
      >
        {project.technologies.map((technology) => (
          <li key={technology}>{technology}</li>
        ))}
      </ul>
      <a
        className="repository-link"
        href={`${githubProfile}/${project.repository}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Explore ${project.name} on GitHub (opens in a new tab)`}
      >
        Explore repository <Icon name="arrow" />
      </a>
    </article>
  );
}
