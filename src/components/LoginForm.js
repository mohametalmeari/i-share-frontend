import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginUser } from '../redux/auth/authSlice';
import { loggedInLinks } from './Navbar';

const LoginForm = () => {
  const dispatch = useDispatch();
  const { loginError } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleLogin = async () => {
    dispatch(loginUser(formData));
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
        type="password"
        value={formData.password}
        placeholder="Password"
        onChange={handleChange('password')}
      />
      <div>
        <button className="form-btn" type="button" onClick={handleLogin}>
          Log in
        </button>
        {' or '}
        <Link to={loggedInLinks[1].path}>
          {loggedInLinks[1].text}
        </Link>
      </div>
      <span className="error-msg">{loginError}</span>
    </>
  );
};
export default LoginForm;
