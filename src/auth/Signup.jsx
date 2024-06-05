import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser, checkEmailExists } from '../services/api';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [role, setRole] = useState('');
  const [emailError, setEmailError] = useState('');

  const navigate = useNavigate();

  const handleEmailChange = async (e) => {
    const email = e.target.value;
    setEmail(email);
    if (email) {
      const exists = await checkEmailExists(email);
      setEmailError(exists ? 'Email already exists' : '');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (emailError) return;
    const user = { name, email, password, phone, address, role };
    try {
      await registerUser(user);
      navigate('/login');
    } catch (error) {
      console.error('Error registering user', error);
    }
  };

  return (
    <div className="container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={email} onChange={handleEmailChange} required />
          {emailError && <p className="text-danger">{emailError}</p>}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="">Select Role</option>
            <option value="FARMER">Farmer</option>
            <option value="EXPERT">Expert</option>
            <option value="COMMUNITYMEMBER">Community Member</option>
          </select>
        </div>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
