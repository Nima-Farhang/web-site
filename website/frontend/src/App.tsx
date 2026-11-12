import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { MainContent } from './components/layout/MainContent';

export function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />

      <MainContent />

      <Footer />
    </>
  );
}
