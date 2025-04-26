import { useUser, useConfig } from "./auth";
import { useLocation, Link } from "react-router-dom";
import { HStack } from "@chakra-ui/react";
import {
  TabsRoot,
  TabsTrigger,
  TabsList,
  Link as ChaLink,
} from "@chakra-ui/react";

function NavBarItem(props) {
  const location = useLocation();
  const isActive =
    (props.href && location.pathname.startsWith(props.href)) ||
    (props.to && location.pathname.startsWith(props.to));
  return props.href ? (
    <TabsTrigger value={props.href} asChild>
      <ChaLink as={Link} unstyled href={props.href}>
        {props.name}
      </ChaLink>
    </TabsTrigger>
  ) : (
    <TabsTrigger value={props.to} asChild>
      <ChaLink as={Link} unstyled to={props.to}>
        {props.name}
      </ChaLink>
    </TabsTrigger>
  );
}

export default function NavBar() {
  const user = useUser();
  const config = useConfig();
  const anonNav = (
    <>
      <NavBarItem to="/account/login" name="Login" />
      <NavBarItem to="/account/signup" name="Signup" />
      <NavBarItem to="/account/password/reset" name="Reset password" />
    </>
  );
  const authNav = (
    <>
      <NavBarItem to="/account/email" name="Change Email" />
      <NavBarItem to="/account/password/change" name="Change Password" />
      {config.data.socialaccount ? (
        <NavBarItem to="/account/providers" name="Providers" />
      ) : null}
      {config.data.mfa ? (
        <NavBarItem to="/account/2fa" name="Two-Factor Authentication" />
      ) : null}

      {config.data.usersessions ? (
        <NavBarItem to="/account/sessions" name="Sessions" />
      ) : null}
      <NavBarItem to="/account/logout" name="Logout" />
    </>
  );
  const { pathname } = useLocation();
  return (
    <HStack bgColor="white" position="sticky" top={0} zIndex={100}>
      <Link to="/" className="navbar-brand">
        TASync
      </Link>
      <TabsRoot value={pathname}>
        <TabsList>
          <NavBarItem to="/schedule" icon="" name="Schedule" />
          <NavBarItem to="/shift-request" icon="" name="Request Shift" />
          <NavBarItem to="/questions" icon="" name="Questions" />
          <NavBarItem to="/swap-requests" icon="" name="Request Shift Swap" />
          {window.DEVELOPMENT ? (
            <NavBarItem href="http://localhost:1080" name="MailCatcher" />
          ) : null}
          {user ? authNav : anonNav}
        </TabsList>
      </TabsRoot>
    </HStack>
  );
}
