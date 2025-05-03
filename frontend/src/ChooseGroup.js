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
  Heading,
} from "@chakra-ui/react";
import { useLayoutEffect, useState } from "react";

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
  const group = JSON.parse(localStorage.getItem("group"));
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
      addUserGroup(currentGroupID);
    },
    onSuccess: () => {
      console.log("Group added successfully");
      queryClient.invalidateQueries(["user_group"]);
      navigate("/subjects");
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

  if (isLoadingGroups) {
    return <p>Loading...</p>;
  }

  if (noGroups) {
    return <p>No groups available</p>;
  }

  return (
    <Stack spacing={6} align="center" py={6}>
      <Heading size="lg">Choose a Group</Heading>
      <RadioCardRoot>
        <RadioCardLabel>Select a group:</RadioCardLabel>
        <HStack w="100%" justifyContent="center" spacing={4}>
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
        colorScheme="blue"
      >
        Select Group
      </Button>
    </Stack>
  );
}
