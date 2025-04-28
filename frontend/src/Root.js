import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import { useAuthStatus } from "./auth/hooks";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import DefaultApi from "./client/src/api/DefaultApi";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useLayoutEffect } from "react";
import { set } from "zod";

const api = new DefaultApi();

function getUserGroup() {
  return new Promise((resolve, reject) => {
    api.backendSchedApiViewsGetUserGroup((error, data, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

export default function Root() {
  const [, status] = useAuthStatus();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const currentURL = useLocation().pathname;
  const group = JSON.parse(localStorage.getItem("group"));
  const [enable, setEnable] = useState(true);
  const {
    data: userGroup,
    isLoading: isLoadingUserGroup,
    isFetching: isFetchingUserGroup,
    isError: isErrorUserGroup,
  } = useQuery({
    queryKey: ["user_group"],
    queryFn: getUserGroup,
    placeholderData: (prevData) => prevData,
    enabled: enable && status.isAuthenticated,
    retry: 3,
    retryDelay: 200,
    refetchOnWindowFocus: false,
  });

  console.log("userGroup", userGroup);
  console.log("enable", enable);
  console.log("iserror", isErrorUserGroup);

  useLayoutEffect(() => {
    if (!status.isAuthenticated) {
      localStorage.removeItem("group");
      console.log("User is not authenticated, redirecting to login page.");
    }
  }, [status]);

  useLayoutEffect(() => {
    let group_check = JSON.parse(localStorage.getItem("group"));
    if (group_check) {
      setEnable(false);
    } else {
      setEnable(true);
    }
  }, [group]);

  useLayoutEffect(() => {
    if (!isLoadingUserGroup && !isFetchingUserGroup && status.isAuthenticated) {
      if (isErrorUserGroup) {
        console.log("auth", status.isAuthenticated);
        console.log("usergroup", userGroup);
        localStorage.removeItem("group");
        if (!currentURL.includes("choosegroup")) {
          navigate(`/choosegroup`, { replace: true });
        }
      } else {
        // setEnable(false);
        if (userGroup !== null && userGroup !== undefined) {
          localStorage.setItem("group", JSON.stringify(userGroup));
        }
      }
    }
  }, [
    currentURL,
    group,
    isErrorUserGroup,
    isFetchingUserGroup,
    isLoadingUserGroup,
    navigate,
    queryClient,
    status.isAuthenticated,
    userGroup,
  ]);

  if (isLoadingUserGroup || isFetchingUserGroup) {
    return <p>Loading...</p>;
  }

  return (
    <Flex h="100vh" direction="column" position="relative">
      <NavBar />
      <main style={{ height: "100%" }}>
        <Outlet />
      </main>
    </Flex>
  );
}
