import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Logout from './Logout';

const loggedInLinks = [
  { path: '/login', text: 'Log in' },
  { path: '/signup', text: 'Sign up' },
];
const loggedOutLinks = [
  { path: '/', text: 'Home' },
  { path: '/new', text: 'New Post' },
];

const Navbar = () => {
  const { loggedIn } = useSelector((state) => state.auth);
  return (
    <ul>
      {
      loggedIn ? loggedOutLinks.map((link) => (
        <li key={link.text}>
          <NavLink to={link.path}>
            {link.text}
          </NavLink>
        </li>
      ))
        : loggedInLinks.map((link) => (
          <li key={link.text}>
            <NavLink to={link.path}>
              {link.text}
            </NavLink>
          </li>
        ))

    }
      {loggedIn && (
      <li>
        <Logout />
      </li>
      )}
    </ul>
  );
};

export default Navbar;
