import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { ContactSection } from './components/sections/ContactSection';
import { MainContent } from './components/layout/MainContent';

export function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />

      {window.location.pathname === '/contact.html' ? (
        <main id="main-content" className="contact-page">
          <ContactSection />
        </main>
      ) : (
        <MainContent />
      )}

      <Footer />
    </>
  );
}
