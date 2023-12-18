import { NavLink } from 'react-router-dom';

const links = [
  { path: '/', text: 'Home' },
  { path: '/login', text: 'Login' },
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
