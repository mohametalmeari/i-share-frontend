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
    <nav>
      <ul className="nav-list">
        {
      loggedIn ? loggedOutLinks.map((link) => (
        <li className="nav-link" key={link.text}>
          <NavLink to={link.path}>
            {link.text}
          </NavLink>
        </li>
      ))
        : loggedInLinks.map((link) => (
          <li className="nav-link" key={link.text}>
            <NavLink to={link.path}>
              {link.text}
            </NavLink>
          </li>
        ))

    }
        {loggedIn && (
        <li className="nav-link">
          <Logout />
        </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
