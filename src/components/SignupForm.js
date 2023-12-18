import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signupUser } from '../redux/auth/authSlice';

const SignupForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: 'user1@mo-dev.site',
    password: '123456',
    password_confirmation: '123456',
    username: 'user',
    name: 'User',
    image_url: 'url',
  });

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleSignup = async () => {
    dispatch(signupUser(formData));
  };
  return (
    <>
      <input
        type="email"
        value={formData.email}
        placeholder="Email"
        onChange={handleChange('email')}
      />
      <input
        type="password"
        value={formData.password}
        placeholder="Password"
        onChange={handleChange('password')}
      />
      <input
        type="password"
        value={formData.password_confirmation}
        placeholder="Password Confirmation"
        onChange={handleChange('password_confirmation')}
      />
      <input
        type="text"
        value={formData.username}
        placeholder="Username"
        onChange={handleChange('username')}
      />
      <input
        type="text"
        value={formData.name}
        placeholder="Name"
        onChange={handleChange('name')}
      />
      <input
        type="text"
        value={formData.image_url}
        placeholder="Image url"
        onChange={handleChange('image_url')}
      />
      <button type="button" onClick={handleSignup}>
        Sign Up
      </button>
    </>
  );
};
export default SignupForm;
