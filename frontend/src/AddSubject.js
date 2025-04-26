import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import DefaultApi from "./client/src/api/DefaultApi";
import {
  Input,
  Button,
  Stack,
  Heading,
  Checkbox,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useGroupCheck } from "./GroupCheckProvider";

const api = new DefaultApi();

function addSubject({ name, is_ta_hours }) {
  return new Promise((resolve, reject) => {
    api.backendSchedApiViewsCreateSubject(is_ta_hours, { name }, (error, data) => {
      if (error) reject(error);
      else resolve(data);
    });
  });
}

function deleteSubject(id) {
  return new Promise((resolve, reject) => {
    api.backendSchedApiViewsDeleteSubject(id, (error, data) => {
      if (error) reject(error);
      else resolve(data);
    });
  });
}

export default function AddSubject() {
  const [name, setName] = useState("");
  const [isTA, setIsTA] = useState(false);
  const queryClient = useQueryClient();
  const { group } = useGroupCheck();

  const { data: subjects = [] } = useQuery({
    queryKey: ["subjects"],
    queryFn: () =>
      new Promise((resolve, reject) => {
        api.backendSchedApiViewsListSubjects((error, data) => {
          if (error) reject(error);
          else resolve(data);
        });
      }),
  });

  const createMutation = useMutation({
    mutationFn: addSubject,
    onSuccess: () => {
      alert("Subject added!");
      queryClient.invalidateQueries(["subjects"]);
      setName("");
      setIsTA(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteSubject,
    onSuccess: () => {
      queryClient.invalidateQueries(["subjects"]);
    },
  });

  if (!group) return <p>Loading group info...</p>;
  if (group.name !== "Educator") return <p>You do not have permission to add subjects.</p>;

  return (
    <Stack spacing={4} p={4} maxW="md" mx="auto" mt={8}>
      <Heading size="md">Add Subject</Heading>
      <Input
        placeholder="Subject Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      
      <Button
        colorScheme="blue"
        onClick={() => createMutation.mutate({ name, is_ta_hours: isTA })}
        isDisabled={!name.trim()}
      >
        Submit
      </Button>

      <Heading size="sm" mt={6}>Subjects</Heading>
      {subjects.map((subject) => (
        <Flex key={subject.id} justify="space-between" align="center">
          <Text>
            {subject.name} {subject.is_ta_hours ? "(TA Hours)" : ""}
          </Text>
          <Flex gap={2}>
            {/* Placeholder for future editing */}
            <Button size="sm" colorScheme="yellow" onClick={() => {
              setName(subject.name);
              setIsTA(subject.is_ta_hours);
            }}>
              Edit
            </Button>
            <Button
              size="sm"
              colorScheme="red"
        
              onClick={() => {
                console.log("deleting", subject.id);
                deleteMutation.mutate(subject.id);
              }}
            >
              Delete
            </Button>
          </Flex>
        </Flex>
      ))}
    </Stack>
  );
}
