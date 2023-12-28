import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signupUser } from '../redux/auth/authSlice';
import { loggedInLinks } from './Navbar';

const SignupForm = () => {
  const dispatch = useDispatch();
  const { signupError } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password_confirmation: '',
    username: '',
    name: '',
    image_url: '',
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
        className="input-field"
        type="email"
        value={formData.email}
        placeholder="Email"
        onChange={handleChange('email')}
      />
      <input
        className="input-field"
        type="text"
        value={formData.username}
        placeholder="Username"
        onChange={handleChange('username')}
      />
      <input
        className="input-field"
        type="text"
        value={formData.name}
        placeholder="Name"
        onChange={handleChange('name')}
      />
      <input
        className="input-field"
        type="text"
        value={formData.image_url}
        placeholder="Image url"
        onChange={handleChange('image_url')}
      />
      <input
        className="input-field"
        type="password"
        value={formData.password}
        placeholder="Password"
        onChange={handleChange('password')}
      />
      <input
        className="input-field"
        type="password"
        value={formData.password_confirmation}
        placeholder="Password Confirmation"
        onChange={handleChange('password_confirmation')}
      />
      <div>
        <button className="form-btn" type="button" onClick={handleSignup}>
          Sign Up
        </button>
        {' or '}
        <Link to={loggedInLinks[0].path}>
          {loggedInLinks[0].text}
        </Link>
      </div>
      <span className="error-msg">{signupError}</span>
    </>
  );
};
export default SignupForm;
