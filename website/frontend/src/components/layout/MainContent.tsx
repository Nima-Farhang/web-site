import { HeroSection } from '../sections/HeroSection';
import { FocusBand } from '../sections/FocusBand';
import { WorkSection } from '../sections/WorkSection';
import { ClosingSection } from '../sections/ClosingSection';
import { ContactSection } from '../sections/ContactSection';

export function MainContent() {
  return (
    <main id="main-content">
      <HeroSection />
      <FocusBand />
      <WorkSection />
      <ClosingSection />
      <ContactSection />
    </main>
  );
}
