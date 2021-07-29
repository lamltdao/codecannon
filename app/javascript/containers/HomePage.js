import React, { useState } from 'react';
import LandingPageLayout from '../layouts/LandingPageLayout';
import HomeNavigationPanel from '../components/HomeNavigationPanel';
import Section from '../components/Section';
import { SECTION_OPTIONS } from '../shared/Constants';

const HomePage = () => {
  const [section, setSection] = useState(SECTION_OPTIONS.logo);
  return (
    <LandingPageLayout
      leftComponentGroup={<Section section={section} />}
      rightComponentGroup={<HomeNavigationPanel section={section} setSection={setSection} />}
    />
  );
};

export default HomePage;
