import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import { useAuthStatus } from "./auth/hooks";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import DefaultApi from "./client/src/api/DefaultApi";
import { useGroupCheck } from "./GroupCheckProvider";
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
  const { group, setGroup } = useGroupCheck();
  const [enable, setEnable] = useState(group === null || group === undefined);
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
    refetchOnWindowFocus: false,
  });

  useLayoutEffect(() => {
    if (group === null || group === undefined) {
      setEnable(true);
    } else {
      setEnable(false);
    }
  }, [group]);

  useLayoutEffect(() => {
    if (!isLoadingUserGroup && !isFetchingUserGroup && status.isAuthenticated) {
      if (isErrorUserGroup) {
        setEnable(true);
        if (!currentURL.includes("choosegroup")) {
          queryClient.invalidateQueries(["groups"]);
          navigate(`/choosegroup`, { replace: true });
        }
      } else {
        setEnable(false);
        if (
          userGroup !== null &&
          userGroup !== undefined &&
          (group === null || group === undefined)
        ) {
          setGroup(userGroup);
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
    setGroup,
    status.isAuthenticated,
    userGroup,
  ]);

  if (isLoadingUserGroup) {
    return <p>Loading...</p>;
  }

  return (
    <Flex h="100vh" direction="column">
      <NavBar />
      <main className="flex-shrink-0 flex-grow-1">
        <Outlet />
      </main>
    </Flex>
  );
}
