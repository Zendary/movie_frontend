import React from 'react';
import { NavLink } from 'react-router-dom';
import LogIn from './LogIn.jsx';
import LoggedIn from './LoggedIn.jsx';

const Header = ({ user, loggedIn, login, logout }) => {
  return (
    <ul className="header">
      <li>
        <NavLink to="/">Forside</NavLink>
      </li>
      <li>
        <NavLink to="/about">Om</NavLink>
      </li>
      {!loggedIn ? (
        <LogIn login={login} />
      ) : (
        <>
          {user.username === 'admin' && (
            <>
              <li>
                <NavLink to="/shows">Shows</NavLink>
              </li>
              <li>
                <NavLink to="/festivals">Festivals</NavLink>
              </li>
            </>
          )}
          {user.username !== 'admin' && (
            <>
              <li>
                <NavLink to="/allShows">Alle Shows</NavLink>
              </li>
              <li>
                <NavLink to="/userShows">Mine Shows</NavLink>
              </li>
            </>
          )}
          <div className="mx-4 mt-2" style={{ float: 'right' }}>
            <LoggedIn user={user} logout={logout} />
          </div>
        </>
      )}
    </ul>
  );
};

export default Header;
