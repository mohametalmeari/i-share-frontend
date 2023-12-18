import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/auth/authSlice';

const Logout = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(logoutUser());
  };
  return (
    <>
      <button type="button" onClick={handleLogout}>
        Log out
      </button>
    </>
  );
};
export default Logout;
