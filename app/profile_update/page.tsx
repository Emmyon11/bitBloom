import React from 'react';
import ProfileForm from './components/update_form';

const ProfileUpdate = () => {
  return (
    <div className="flex items-center justify-center p-20">
      <div className="md:w-1/2 ">
        <ProfileForm />
      </div>
    </div>
  );
};

export default ProfileUpdate;
