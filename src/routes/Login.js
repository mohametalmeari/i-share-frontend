import { useSelector } from 'react-redux';
import LoginForm from '../components/LoginForm';
import loadingIcon from '../assets/loading.gif';

const Login = () => {
  const { isLoading } = useSelector((state) => state.auth);

  if (isLoading) {
    return (
      <img className="loading-icon" src={loadingIcon} alt="loading" />
    );
  }

  return (
    <div className="user-form">
      <LoginForm />
    </div>
  );
};
export default Login;
