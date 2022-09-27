import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from "../../store/auth-slice";

const Navbar = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid justify-content-around">
        <a href="/" className="navbar-brand" style={{ textDecoration: 'none' }}>
          Auth-app
        </a>

        <ul className="navbar-nav">
          <li className="nav-item">
            {isLoggedIn
              ? <a className="nav-link" style={{cursor: 'pointer'}} onClick={logoutHandler}>Logout</a>
              : <Link to="/auth" className="nav-link">Login</Link>}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;