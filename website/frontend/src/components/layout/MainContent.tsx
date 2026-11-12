import { HeroSection } from '../sections/HeroSection';
import { FocusBand } from '../sections/FocusBand';
import { WorkSection } from '../sections/WorkSection';
import { ArchitectureSection } from '../sections/ArchitectureSection';
import { ClosingSection } from '../sections/ClosingSection';
import { ContactSection } from '../sections/ContactSection';

export function MainContent() {
  return (
    <main id="main-content">
      <HeroSection />
      <FocusBand />
      <WorkSection />
      <ArchitectureSection />
      <ClosingSection />
      <ContactSection />
    </main>
  );
}
