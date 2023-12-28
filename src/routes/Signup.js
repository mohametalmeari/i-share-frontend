import { useSelector } from 'react-redux';
import SignupForm from '../components/SignupForm';
import loadingIcon from '../assets/loading.gif';

const Signup = () => {
  const { isLoading } = useSelector((state) => state.auth);

  if (isLoading) {
    return (
      <img className="loading-icon" src={loadingIcon} alt="loading" />
    );
  }

  return (
    <div className="user-form">
      <SignupForm />
    </div>
  );
};
export default Signup;
