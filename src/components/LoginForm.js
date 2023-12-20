import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/auth/authSlice';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ email: 'admin@mo-dev.site', password: '123456' });

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleLogin = async () => {
    dispatch(loginUser(formData));
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
      <button type="button" onClick={handleLogin}>
        Log in
      </button>
    </>
  );
};
export default LoginForm;
