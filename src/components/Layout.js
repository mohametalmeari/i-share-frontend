import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Navbar from './Navbar';

const Layout = () => {
  const { loggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const path = window.location.pathname;
  useEffect(() => {
    if (!loggedIn && path !== '/login' && path !== '/signup') {
      navigate('/login');
    } else if (loggedIn && (path === '/login' || path === '/signup')) {
      navigate('/');
    }
  }, [loggedIn, navigate, path]);

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};
export default Layout;
