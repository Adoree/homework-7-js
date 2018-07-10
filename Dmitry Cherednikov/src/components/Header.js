import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <header>
    <nav>
      <ul className="header-list">
        <li>
          <NavLink
            to='/pokemons'
            activeClassName='link-active'
          >
            All
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/catched'
            activeClassName='link-active'
          >
            Catched
          </NavLink>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;