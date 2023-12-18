import { NavLink } from 'react-router-dom';

const links = [
  { path: '/', text: 'Home' },
  { path: '/login', text: 'Log in' },
  { path: '/signup', text: 'Sign up' },
];

const Navbar = () => (
  <ul>
    {links.map((link) => (
      <li key={link.text}>
        <NavLink to={link.path}>
          {link.text}
        </NavLink>
      </li>
    ))}
  </ul>
);

export default Navbar;
