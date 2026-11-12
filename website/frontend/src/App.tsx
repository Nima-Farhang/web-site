import { Icon } from './components/Icon';
import { ProjectCard } from './components/ProjectCard';
import { githubProfile, projects } from './content/portfolio';

export function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <div className="container header-inner">
          <a className="wordmark" href="#about" aria-label="Nima Farhang home"><span className="monogram">nf<span>.</span></span><span>Nima Farhang</span></a>
          <nav aria-label="Main navigation">
            <a href="#about">About</a>
            <a href="#work">My work</a>
            <a className="nav-github" href={githubProfile} target="_blank" rel="noopener noreferrer">GitHub <Icon name="arrow" /></a>
          </nav>
        </div>
      </header>

      <main id="main-content">
        <section className="hero container" id="about" aria-labelledby="intro-heading">
          <div className="hero-copy">
            <p className="eyebrow"><span className="teal-line" /> Data. Cloud. Software.</p>
            <h1 id="intro-heading">Hi, I’m Nima.<br /><span>I turn ideas<br />into working systems.</span></h1>
            <p className="hero-intro">I’m Nima Farhang. I explore data engineering, cloud platforms, and software through practical projects.</p>
            <p className="hero-detail">This is where I share what I’m building, the decisions behind it, and the code that brings it together.</p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#work">Explore my work <span aria-hidden="true">↓</span></a>
              <a className="btn btn-outline-primary" href="#contact">Contact me</a>
              <a className="quiet-link" href={githubProfile} target="_blank" rel="noopener noreferrer"><Icon name="github" /> Find me on GitHub</a>
            </div>
          </div>

          <div className="system-illustration" aria-label="My projects connect cloud foundations, data products, and thoughtful delivery.">
            <div className="illustration-heading"><span className="status-dot" /> A builder’s perspective <span className="illustration-mark">NF / 01</span></div>
            <div className="illustration-body">
              <p className="illustration-kicker">FROM FOUNDATION TO PRODUCT</p>
              <div className="system-node node-foundation"><span className="node-icon"><Icon name="layers" /></span><div><span className="node-label">01 / FOUNDATION</span><strong>Build the platform.</strong><small>Infrastructure · Cloud · Standards</small></div></div>
              <div className="connector"><span /></div>
              <div className="system-node node-data"><span className="node-icon"><Icon name="database" /></span><div><span className="node-label">02 / DATA & APPLICATIONS</span><strong>Make it useful.</strong><small>Data products · Analytics · Software</small></div></div>
              <div className="connector"><span /></div>
              <div className="system-node node-delivery"><span className="node-icon"><Icon name="workflow" /></span><div><span className="node-label">03 / DELIVERY</span><strong>Make it repeatable.</strong><small>Automation · Tests · Documentation</small></div></div>
            </div>
            <div className="illustration-footer"><span>Ideas → code → something useful</span><span aria-hidden="true">↗</span></div>
          </div>
        </section>

        <div className="focus-band"><div className="container focus-inner"><p>A few things I like working on</p><ul><li>Data platforms</li><li>Analytics engineering</li><li>Web applications</li><li>AI-assisted delivery</li></ul></div></div>

        <section className="work-section container" id="work" aria-labelledby="work-heading">
          <div className="section-heading"><div><p className="eyebrow"><span className="teal-line" /> Selected work</p><h2 id="work-heading">A look inside my projects.</h2></div><p>Small introductions here.<br />The details, decisions, and code on GitHub.</p></div>
          <div className="project-grid">
            {projects.map((project, index) => <ProjectCard key={project.repository} project={project} index={index} />)}
            <aside className="portfolio-note"><Icon name="code" /><p className="eyebrow">Always a work in progress</p><h3>Built to share.<br />Documented to explore.</h3><p>These are sample projects and practical explorations. Each repository tells its own story—from the architecture to the tradeoffs.</p><a href={githubProfile} target="_blank" rel="noopener noreferrer">See all public repositories <Icon name="arrow" /></a></aside>
          </div>
        </section>

        <section className="closing-section" aria-labelledby="closing-heading"><div className="container closing-inner"><div><p className="eyebrow">Keep exploring</p><h2 id="closing-heading">The best introduction is the work.</h2><p>Take a look around the repositories. Start with a README, then follow the code.</p></div><a className="btn btn-outline-primary" href={githubProfile} target="_blank" rel="noopener noreferrer"><Icon name="github" /> Visit my GitHub <Icon name="arrow" /></a></div></section>
        <section className="contact-section container" id="contact" aria-labelledby="contact-heading">
          <p className="eyebrow"><span className="teal-line" /> Get in touch</p>
          <h2 id="contact-heading">Contact me</h2>
          <p>Have a question about my work? Send me an email or give me a call.</p>
          <address className="contact-details">
            <a className="btn btn-primary" href="mailto:nima@farhang.io">Email me</a>
            <a href="mailto:nima@farhang.io">nima@farhang.io</a>
            <a href="tel:+64211229743">+64 21 122 9743</a>
          </address>
        </section>
      </main>

      <footer className="site-footer container"><a className="footer-name" href="#about">Nima Farhang<span>.</span></a><p>Personal projects. Practical ideas. Shared openly.</p><a href="#about">Back to top <span aria-hidden="true">↑</span></a></footer>
    </>
  );
}
