import { useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { ContactSection } from './components/sections/ContactSection';
import { MainContent } from './components/layout/MainContent';

export function App() {
  useEffect(() => {
    // Cross-page fragments can be processed before React creates their targets.
    const scrollToFragment = () => {
      const targetId = window.location.hash.slice(1);
      if (targetId) {
        document.getElementById(targetId)?.scrollIntoView();
      }
    };

    scrollToFragment();
    window.addEventListener('hashchange', scrollToFragment);
    return () => window.removeEventListener('hashchange', scrollToFragment);
  }, []);

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
