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
  const [settingGroup, setSettingGroup] = useState(false);
  const [enable, setEnable] = useState(group === null || group === undefined);
  const {
    data: userGroup,
    isLoading: isLoadingUserGroup,
    isFetching: isFetchingUserGroup,
    isError: isErrorUserGroup,
    error: errorUserGroup,
  } = useQuery({
    queryKey: ["user_group"],
    queryFn: getUserGroup,
    placeholderData: (prevData) => prevData,
    enabled: enable,
    // retry: 3,
    refetchOnWindowFocus: false,
    // onSuccess: (data) => {
    //   console.log("hello THIS WAS A SUCCESS");
    //   if (data) {
    //     setGroup(data);
    //   }
    // },
    // onError: (error) => {
    //   console.log("group2", group);
    //   console.log(
    //     error && status.isAuthenticated && !currentURL.includes("choosegroup")
    //   );
    //   if (
    //     error &&
    //     status.isAuthenticated &&
    //     !currentURL.includes("choosegroup")
    //   ) {
    //     navigate(`/choosegroup`, { replace: true });
    //   }
    // },
  });

  useLayoutEffect(() => {
    if (group === null || group === undefined) {
      setEnable(true);
    } else {
      setEnable(false);
    }
  }, [group]);

  useLayoutEffect(() => {
    if (!isLoadingUserGroup && !isFetchingUserGroup) {
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
    userGroup,
  ]);
  // useEffect(() => {
  //   if (
  //     status.isAuthenticated &&
  //     (group === null || group === undefined) &&
  //     !isErrorUserGroup
  //   ) {
  //     setGroup(userGroup);
  //     setSettingGroup(false);
  //   }
  //   if (isErrorUserGroup) {
  //     console.log("error", errorUserGroup);
  //     if (status.isAuthenticated) {
  //       setSettingGroup(true);
  //       if (!currentURL.includes("choosegroup")) {
  //         navigate(`/choosegroup`, { replace: true });
  //       }
  //     }
  //   }
  // }, [
  //   status,
  //   group,
  //   setGroup,
  //   userGroup,
  //   isErrorUserGroup,
  //   errorUserGroup,
  //   currentURL,
  //   navigate,
  // ]);

  if (isLoadingUserGroup) {
    return <p>Loading...</p>;
  }

  // if (isErrorUserGroup) {
  //   if (status.isAuthenticated) {
  //     setSettingGroup(true);
  //     if (!currentURL.includes("choosegroup")) {
  //       navigate(`/choosegroup`, { replace: true });
  //     }
  //   }
  // } else {
  //   if (status.isAuthenticated && group === null) {
  //     setGroup(userGroup);
  //     setSettingGroup(false);
  //   }
  // }

  return (
    <Flex h="100vh" direction="column">
      <NavBar />
      <main className="flex-shrink-0 flex-grow-1">
        <Outlet />
      </main>
    </Flex>
  );
}
