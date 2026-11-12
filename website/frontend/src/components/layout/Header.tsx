import { Icon } from '../shared/Icon';
import { githubProfile } from '../../content/portfolio';

export function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="wordmark" href="/#about" aria-label="Nima Farhang home">
          <span className="monogram">
            nf<span>.</span>
          </span>
          <span>Nima Farhang</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="/#about">About</a>
          <a href="/#work">My work</a>
          <a
            className="nav-github"
            href={githubProfile}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub <Icon name="arrow" />
          </a>
          <a className="btn btn-primary nav-contact" href="/contact.html">
            Contact me
          </a>
        </nav>
      </div>
    </header>
  );
}
