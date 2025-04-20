import { useUser, useConfig } from "./auth";
import { useLocation, Link } from "react-router-dom";

function NavBarItem(props) {
  const location = useLocation();
  const isActive =
    (props.href && location.pathname.startsWith(props.href)) ||
    (props.to && location.pathname.startsWith(props.to));
  const cls = isActive ? "nav-link active" : "nav-link";
  return (
    <li className="nav-item">
      {props.href ? (
        <a className={cls} href={props.href}>
          {props.icon} {props.name}
        </a>
      ) : (
        <Link className={cls} to={props.to}>
          {props.icon} {props.name}
        </Link>
      )}
    </li>
  );
}

export default function NavBar() {
  const user = useUser();
  const config = useConfig();
  const anonNav = (
    <>
      <NavBarItem to="/account/login" icon="🔑" name="Login" />
      <NavBarItem to="/account/signup" icon="🧑" name="Signup" />
      <NavBarItem
        to="/account/password/reset"
        icon="🔓"
        name="Reset password"
      />
    </>
  );
  const authNav = (
    <>
      <NavBarItem to="/account/email" icon="📬" name="Change Email" />
      <NavBarItem
        to="/account/password/change"
        icon="🔒"
        name="Change Password"
      />
      {config.data.socialaccount ? (
        <NavBarItem to="/account/providers" icon="👤" name="Providers" />
      ) : null}
      {config.data.mfa ? (
        <NavBarItem
          to="/account/2fa"
          icon="📱"
          name="Two-Factor Authentication"
        />
      ) : null}

      {config.data.usersessions ? (
        <NavBarItem to="/account/sessions" icon="🚀" name="Sessions" />
      ) : null}
      <NavBarItem to="/account/logout" icon="👋" name="Logout" />
    </>
  );
  return (
    <nav className="navbar navbar-expand-md navbar-dark sticky-top bg-dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          TASync
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <NavBarItem to="/subjects" icon="" name="Subjects" />
            <NavBarItem to="/schedule" icon="" name="Schedule" />
            <NavBarItem to="/shift-request" icon="" name="Request Shift" />
            <NavBarItem to="/questions" icon="" name="Questions" />
            <NavBarItem to="/swap-requests" icon="" name="Request Shift Swap" />
            {window.DEVELOPMENT ? (
              <NavBarItem
                href="http://localhost:1080"
                icon="✉️"
                name="MailCatcher"
              />
            ) : null}
            {user ? authNav : anonNav}
          </ul>
        </div>
      </div>
    </nav>
  );
}
