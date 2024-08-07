import React, { useState } from 'react';
import './UserProfile.css'; // Import the CSS

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState({
    firstName: 'Ian',
    lastName: 'kagari',
    address: '10400',
    phone: '+254717780764',
    email: 'iankagari@gmail.com',
    currentPassword: 'iankngure',
    newPassword: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleProfileUpdate = () => {
    alert('Profile updated successfully!');
    // Logic for updating profile which i dont know how to apply
  };

  const handleChangePassword = () => {
    if (userInfo.newPassword !== userInfo.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    alert('Password changed successfully!');
    // Logic for changing password which i also dont know how to implement
  };

  return (
    <div className="user-profile-container">
      <div className="user-profile-card">
        <div className="user-profile-header">
          <h2>Raygen Solar Solutions</h2>
        </div>

        <div className="user-profile-body">
          <div className="user-profile-section">
            <h4>Edit Profile</h4>
            <div className="row">
              <div>
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={userInfo.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={userInfo.lastName}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={userInfo.address}
              onChange={handleInputChange}
            />
            <div className="row">
              <div>
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={userInfo.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={userInfo.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <button onClick={handleProfileUpdate}>Update Profile</button>
          </div>

          <div className="user-profile-section password-section">
            <h4>Change Password</h4>
            <label>Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={userInfo.currentPassword}
              onChange={handleInputChange}
            />
            <label>New Password</label>
            <input
              type="password"
              name="newPassword"
              value={userInfo.newPassword}
              onChange={handleInputChange}
            />
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={userInfo.confirmPassword}
              onChange={handleInputChange}
            />
            <button onClick={handleChangePassword}>Change Password</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
