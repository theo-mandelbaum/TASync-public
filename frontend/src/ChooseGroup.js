import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { z } from "zod";
import DefaultApi from "./client/src/api/DefaultApi";
import {
  HStack,
  Stack,
  Button,
  RadioCardRoot,
  RadioCardItem,
  RadioCardItemText,
  RadioCardItemControl,
  RadioCardLabel,
  RadioCardItemContent,
  RadioCardItemIndicator,
  RadioCardItemHiddenInput,
} from "@chakra-ui/react";
import { useLayoutEffect, useState } from "react";
import { useGroupCheck } from "./GroupCheckProvider";

const api = new DefaultApi();

function getGroups() {
  return new Promise((resolve, reject) => {
    api.backendSchedApiViewsListGroups((error, data, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

function addUserGroup(groupID) {
  return new Promise((resolve, reject) => {
    api.backendSchedApiViewsAddGroup(groupID, (error, data, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

export default function ChooseGroup() {
  const { group } = useGroupCheck();
  const queryClient = useQueryClient();

  const {
    data: groups,
    isLoading: isLoadingGroups,
    isError: noGroups,
  } = useQuery({
    queryKey: ["groups"],
    queryFn: getGroups,
    placeholderData: (prevData) => prevData,
  });

  const [currentGroupID, setCurrentGroupID] = useState(null);
  const navigate = useNavigate();
  const { mutate: mutateUserGroup } = useMutation({
    mutationFn: (currentGroupID) => {
      console.log("GROUPY", group);
      addUserGroup(currentGroupID);
    },
    onSuccess: (data) => {
      console.log("Group added successfully");
      queryClient.invalidateQueries(["user_group"]);
    },
    onError: (error) => {
      console.error("Error adding group:", error);
    },
  });

  function handleGroupClick() {
    mutateUserGroup(currentGroupID);
  }

  useLayoutEffect(() => {
    console.log("in in in");
    if (group) {
      navigate("/", { replace: true });
    }
  }, [group, navigate]);

  if (group) {
    navigate("/", { replace: true });
  }

  if (isLoadingGroups) {
    return <p>Loading...</p>;
  }

  if (noGroups) {
    return <p>No groups available</p>;
  }

  return (
    <Stack>
      <RadioCardRoot>
        <RadioCardLabel>Choose a group:</RadioCardLabel>
        <HStack w="100%" justifyContent="space-between">
          {groups.map((group) => (
            <RadioCardItem
              key={group.id}
              value={group.id}
              onClick={() => setCurrentGroupID(group.id)}
            >
              <RadioCardItemHiddenInput />
              <RadioCardItemControl>
                <RadioCardItemContent>
                  <RadioCardItemText>{group.name}</RadioCardItemText>
                  <RadioCardItemControl />
                </RadioCardItemContent>
                <RadioCardItemIndicator />
              </RadioCardItemControl>
            </RadioCardItem>
          ))}
        </HStack>
      </RadioCardRoot>
      <Button
        disabled={currentGroupID === null}
        onClick={handleGroupClick}
        w="min-content"
      >
        Select Group
      </Button>
    </Stack>
  );
}
