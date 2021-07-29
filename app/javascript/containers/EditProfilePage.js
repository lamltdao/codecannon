import React, { useState } from 'react';
import LandingPageLayout from '../layouts/LandingPageLayout';
import EditProfileAvatar from '../components/profile/EditProfileAvatar';
import EditProfileInfo from '../components/profile/EditProfileInfo';

const EditProfilePage = () => {
  const {
    fname, lname, username,
  } = window.gon.user;
  const [user, setUser] = useState({
    fname,
    lname,
    username,
    password: '',
    password_confirmation: '',
    current_password: '',
    avatar: null,
  });

  return (
    <LandingPageLayout
      leftComponentGroup={<EditProfileAvatar setUser={setUser} />}
      rightComponentGroup={<EditProfileInfo user={user} setUser={setUser} />}
    />
  );
};

export default EditProfilePage;
