import React from 'react';
import { CursorSplash } from './components/CursorSplash.jsx';
import { HeroFused } from './components/HeroFused.jsx';
import { SkillsSection, ExperienceStack } from './components/SkillsExperience.jsx';
import {
  ProjectsSection,
  PublicationsSection,
  ContactSection,
  FooterSection,
} from './components/PortfolioSections.jsx';

export default function App() {
  return (
    <div style={{ width: '100%', background: '#04060c', color: '#e6edf6' }}>
      <CursorSplash />
      <HeroFused />
      <SkillsSection />
      <ExperienceStack />
      <ProjectsSection />
      <PublicationsSection />
      <ContactSection />
      <FooterSection />
    </div>
  );
}
