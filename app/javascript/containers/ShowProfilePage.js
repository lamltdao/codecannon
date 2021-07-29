import React from 'react';
import LandingPageLayout from '../layouts/LandingPageLayout';
import ProfileAvatar from '../components/profile/ProfileAvatar';
import ProfileInfo from '../components/profile/ProfileInfo';

const ShowProfilePage = () => (
  <LandingPageLayout
    leftComponentGroup={<ProfileAvatar />}
    rightComponentGroup={<ProfileInfo />}
  />
);

export default ShowProfilePage;
