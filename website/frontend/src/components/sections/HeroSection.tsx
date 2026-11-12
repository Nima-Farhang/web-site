import { Icon } from '../shared/Icon';
import { githubProfile } from '../../content/portfolio';

export function HeroSection() {
  return (
    <section
      className="hero container"
      id="about"
      aria-labelledby="intro-heading"
    >
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="teal-line" /> Data. Cloud. Software.
        </p>
        <h1 id="intro-heading">
          Hi, I’m Nima.
          <br />
          <span>
            I turn ideas
            <br />
            into working systems.
          </span>
        </h1>
        <p className="hero-intro">
          I’m Nima Farhang. I explore data engineering, cloud platforms, and
          software through practical projects.
        </p>
        <p className="hero-detail">
          This is where I share what I’m building, the decisions behind it, and
          the code that brings it together.
        </p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#work">
            Explore my work <span aria-hidden="true">↓</span>
          </a>
          <a className="btn btn-primary" href="#architecture">
            How this website is built <span aria-hidden="true">↓</span>
          </a>
          <a
            className="quiet-link"
            href={githubProfile}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="github" /> Find me on GitHub
          </a>
        </div>
      </div>

      <div
        className="system-illustration"
        aria-label="My projects connect cloud foundations, data products, and thoughtful delivery."
      >
        <div className="illustration-heading">
          <span className="status-dot" /> A builder’s perspective{' '}
          <span className="illustration-mark">NF / 01</span>
        </div>
        <div className="illustration-body">
          <p className="illustration-kicker">FROM FOUNDATION TO PRODUCT</p>
          <div className="system-node node-foundation">
            <span className="node-icon">
              <Icon name="layers" />
            </span>
            <div>
              <span className="node-label">01 / FOUNDATION</span>
              <strong>Build the platform.</strong>
              <small>Infrastructure · Cloud · Standards</small>
            </div>
          </div>
          <div className="connector">
            <span />
          </div>
          <div className="system-node node-data">
            <span className="node-icon">
              <Icon name="database" />
            </span>
            <div>
              <span className="node-label">02 / DATA & APPLICATIONS</span>
              <strong>Make it useful.</strong>
              <small>Data products · Analytics · Software</small>
            </div>
          </div>
          <div className="connector">
            <span />
          </div>
          <div className="system-node node-delivery">
            <span className="node-icon">
              <Icon name="workflow" />
            </span>
            <div>
              <span className="node-label">03 / DELIVERY</span>
              <strong>Make it repeatable.</strong>
              <small>Automation · Tests · Documentation</small>
            </div>
          </div>
        </div>
        <div className="illustration-footer">
          <span>Ideas → code → something useful</span>
          <span aria-hidden="true">↗</span>
        </div>
      </div>
    </section>
  );
}
