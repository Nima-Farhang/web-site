import { HeroSection } from '../sections/HeroSection';
import { FocusBand } from '../sections/FocusBand';
import { WorkSection } from '../sections/WorkSection';
import { ArchitectureSection } from '../sections/ArchitectureSection';
import { ClosingSection } from '../sections/ClosingSection';

export function MainContent() {
  return (
    <main id="main-content">
      <HeroSection />
      <FocusBand />
      <WorkSection />
      <ArchitectureSection />
      <ClosingSection />
    </main>
  );
}
