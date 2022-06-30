import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import AuthContext from "../../store/auth-context";

import classes from "./MainNavigation.module.css";
//import Search from "./Search";

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const location = useLocation();
  console.log(location);

  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
  };

  return (
    <header className={classes.header}>
      <Link to="/adresar">
        <div className={classes.logo}>Adresar</div>
      </Link>
      <nav>
        <ul>
          {(location.pathname === "/adresar") && <li>
           {/* <Search />  */}
          </li>}
          {!isLoggedIn && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/kontakt">New contact</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
