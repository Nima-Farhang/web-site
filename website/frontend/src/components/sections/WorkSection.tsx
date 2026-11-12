import { Icon } from '../shared/Icon';
import { ProjectCard } from './ProjectCard';
import { githubProfile, projects } from '../../content/portfolio';

export function WorkSection() {
  return (
    <section
      className="work-section container"
      id="work"
      aria-labelledby="work-heading"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">
            <span className="teal-line" /> Selected work
          </p>
          <h2 id="work-heading">A look inside my projects.</h2>
        </div>
        <p>
          Small introductions here.
          <br />
          The details, decisions, and code on GitHub.
        </p>
      </div>
      <div className="project-grid">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.repository}
            project={project}
            index={index}
          />
        ))}
        <aside className="portfolio-note">
          <Icon name="code" />
          <p className="eyebrow">Always a work in progress</p>
          <h3>
            Built to share.
            <br />
            Documented to explore.
          </h3>
          <p>
            These are sample projects and practical explorations. Each
            repository tells its own story—from the architecture to the
            tradeoffs.
          </p>
          <a href={githubProfile} target="_blank" rel="noopener noreferrer">
            See all public repositories <Icon name="arrow" />
          </a>
        </aside>
      </div>
    </section>
  );
}
