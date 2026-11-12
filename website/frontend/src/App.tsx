import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MainContent } from './components/MainContent';

export function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header />

      <MainContent />

      <Footer />
    </>
  );
}
