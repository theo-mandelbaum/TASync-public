import { useUser, useConfig } from "./auth";
import { useLocation, Link } from "react-router-dom";
import { HStack, Spacer } from "@chakra-ui/react";
import {
  TabsRoot,
  TabsTrigger,
  TabsList,
  Link as ChaLink,
} from "@chakra-ui/react";
import { useState, useLayoutEffect } from "react";

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

export default function NavBar({ group }) {
  const user = useUser();
  const config = useConfig();
  const [edVisible, setEdVisible] = useState(group?.name === "Educator");
  const [taVisible, setTaVisible] = useState(group?.name === "TA");
  console.log("edVisible", edVisible);
  console.log("taVisible", taVisible);
  const anonNav = (
    <>
      <NavBarItem to="/account/login" name="Login" />
      <NavBarItem to="/account/signup" name="Signup" />
      <NavBarItem to="/account/password/reset" name="Reset password" />
    </>
  );
  const authNav = (
    <>
      {/* <NavBarItem to="/account/email" name="Change Email" />
      <NavBarItem to="/account/password/change" name="Change Password" />
      {config.data.socialaccount ? (
        <NavBarItem to="/account/providers" name="Providers" />
      ) : null}
      {config.data.mfa ? (
        <NavBarItem to="/account/2fa" name="Two-Factor Authentication" />
      ) : null}

      {config.data.usersessions ? (
        <NavBarItem to="/account/sessions" name="Sessions" />
      ) : null} */}
      <NavBarItem to="/account/logout" name="Logout" />
    </>
  );
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    const group_check = JSON.parse(localStorage.getItem("group"));
    if (group_check) {
      setEdVisible(group_check.name === "Educator");
      setTaVisible(group_check.name === "TA");
    } else {
      setEdVisible(false);
      setTaVisible(false);
    }
    console.log("checking", group?.name);
  });

  return (
    <HStack bgColor="white" position="sticky" top={0} zIndex={100}>
      <Link to="/" className="navbar-brand">
        TASync
      </Link>
      <Spacer />
      <TabsRoot value={pathname}>
        <TabsList>
          {edVisible && (
            <NavBarItem to="/manageschedule" icon="" name="Manage Schedules" />
          )}
          {(edVisible || taVisible) && (
            <NavBarItem to="/schedule" icon="" name="Schedule" />
          )}
          {edVisible && (
            <NavBarItem to="/addsubjects" icon="" name="Add Subjects" />
          )}
          {/* {taVisible && (
            <NavBarItem to="/shift-request" icon="" name="Request Shift" />
          )} */}
          {taVisible && (
            <NavBarItem to="/swap-requests" icon="" name="View Swap Requests" />
          )}
          {window.DEVELOPMENT ? (
            <NavBarItem href="http://localhost:1080" name="MailCatcher" />
          ) : null}
          {user ? authNav : anonNav}
        </TabsList>
      </TabsRoot>
    </HStack>
  );
}
