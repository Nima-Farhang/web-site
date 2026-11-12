import { Icon } from '../shared/Icon';

const websiteRepository = 'https://github.com/Nima-Farhang/web-site';

export function ArchitectureSection() {
  return (
    <section className="architecture-section" id="architecture" aria-labelledby="architecture-heading">
      <div className="container architecture-inner">
        <div className="section-heading">
          <div>
            <p className="eyebrow"><span className="teal-line" /> Behind this website</p>
            <h2 id="architecture-heading">How this website is built.</h2>
          </div>
          <p>A small site. The same care for code, infrastructure, and delivery.</p>
        </div>
        <p className="architecture-intro">
          This portfolio is a custom React and TypeScript website. Its AWS hosting
          is defined with Terraform, and GitHub Actions handles validation and deployment.
        </p>
        <ol className="architecture-flow" aria-label="Website request path">
          <li><span className="architecture-step">01 / Request</span><strong>Visitor</strong><span>Your browser connects over HTTPS.</span></li>
          <li><span className="architecture-step">02 / Delivery</span><strong>Amazon CloudFront</strong><span>Delivers the website through AWS’s content delivery network.</span></li>
          <li><span className="architecture-step">03 / Storage</span><strong>Private Amazon S3</strong><span>Stores the static files, accessed through CloudFront.</span></li>
        </ol>
        <div className="architecture-details">
          <div><h3>Built with React</h3><p>TypeScript components and Vite turn the content and design into a static website.</p></div>
          <div><h3>Defined in Terraform</h3><p>Hosting and access policies live in version control alongside the application.</p></div>
          <div><h3>Delivered with GitHub Actions</h3><p>Manual deployments target dev or prod, with type checks, a production build, and release verification.</p></div>
        </div>
        <div className="architecture-links">
          <a className="quiet-link" href={websiteRepository} target="_blank" rel="noopener noreferrer"><Icon name="github" /> Explore the source <Icon name="arrow" /></a>
          <a className="quiet-link" href={`${websiteRepository}/blob/master/docs/architecture.md`} target="_blank" rel="noopener noreferrer">Read the architecture <Icon name="arrow" /></a>
        </div>
      </div>
    </section>
  );
}
