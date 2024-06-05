import React from 'react';

const Profile = ({ user }) => {
  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div className="profile">
      <h2>Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
    </div>
  );
};

export default Profile;
