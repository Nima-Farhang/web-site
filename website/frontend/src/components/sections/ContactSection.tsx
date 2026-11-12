export function ContactSection() {
  return (
    <section
      className="contact-section container"
      id="contact"
      aria-labelledby="contact-heading"
    >
      <p className="eyebrow">
        <span className="teal-line" /> Get in touch
      </p>
      <h2 id="contact-heading">Contact me</h2>
      <p>Have a question about my work? Send me an email or give me a call.</p>
      <address className="contact-details">
        <a className="btn btn-primary" href="mailto:nima@farhang.io">
          Email me
        </a>
        <a href="mailto:nima@farhang.io">nima@farhang.io</a>
        <a href="tel:+64211229743">+64 21 122 9743</a>
      </address>
    </section>
  );
}
