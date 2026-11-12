import { Icon } from '../shared/Icon';
import { githubProfile } from '../../content/portfolio';

export function ClosingSection() {
  return (
    <section className="closing-section" aria-labelledby="closing-heading">
      <div className="container closing-inner">
        <div>
          <p className="eyebrow">Keep exploring</p>
          <h2 id="closing-heading">The best introduction is the work.</h2>
          <p>
            Take a look around the repositories. Start with a README, then
            follow the code.
          </p>
        </div>
        <a
          className="btn btn-outline-primary"
          href={githubProfile}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon name="github" /> Visit my GitHub <Icon name="arrow" />
        </a>
      </div>
    </section>
  );
}
