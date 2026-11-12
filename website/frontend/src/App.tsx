import { Icon } from './components/Icon';
import { MainContent } from './components/MainContent';
import { githubProfile } from './content/portfolio';

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

      <MainContent />

      <footer className="site-footer container"><a className="footer-name" href="#about">Nima Farhang<span>.</span></a><p>Personal projects. Practical ideas. Shared openly.</p><a href="#about">Back to top <span aria-hidden="true">↑</span></a></footer>
    </>
  );
}
