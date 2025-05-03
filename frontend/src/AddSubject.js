import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import DefaultApi from "./client/src/api/DefaultApi";
import {
  Input,
  Button,
  Stack,
  Heading,
  CheckboxRoot,
  CheckboxControl,
  Flex,
  Text,
  CheckboxHiddenInput,
  CheckboxLabel,
} from "@chakra-ui/react";
import { set } from "react-hook-form";
import { toaster } from "./components/ui/toaster";

const api = new DefaultApi();

function addSubject(name, is_ta_hours) {
  return new Promise((resolve, reject) => {
    api.backendSchedApiViewsCreateSubject(
      is_ta_hours,
      { name },
      (error, data) => {
        if (error) reject(error);
        else resolve(data);
      }
    );
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
  const [disabled, setDisabled] = useState(false);
  const queryClient = useQueryClient();
  const group = JSON.parse(localStorage.getItem("group"));

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
    mutationFn: () => addSubject(name, isTA),
    onSuccess: () => {
      toaster.create({
        title: "Subject added successfully",
        status: "success",
      });
      queryClient.invalidateQueries(["subjects"]);
      if (!isTA) {
        setName("");
      }
    },
    onError: (error) => {
      toaster.create({
        title: "Error adding subject",
        description: error.message,
        status: "error",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteSubject(id),
    onSuccess: () => {
      toaster.create({
        title: "Subject deleted successfully",
        status: "success",
      });
      queryClient.invalidateQueries(["subjects"]);
    },
    onError: (error) => {
      toaster.create({
        title: "Error deleting subject",
        description: error.message,
        status: "error",
      });
    },
  });

  if (!group) return <p>Loading group info...</p>;
  if (group.name !== "Educator")
    return <p>You do not have permission to add subjects.</p>;

  return (
    <Stack spacing={6} p={6} maxW="md" mx="auto" mt={8} borderWidth={1} borderRadius="lg" boxShadow="md">
      <Heading size="lg" textAlign="center">
        Add Subject
      </Heading>
      <Input
        placeholder="Subject Name"
        value={name}
        disabled={disabled}
        onChange={(e) => setName(e.target.value)}
      />
      <CheckboxRoot
        checked={isTA}
        onCheckedChange={(e) => {
          setIsTA(!!e.checked);
          if (!!e.checked) {
            setName("TA Hours");
            setDisabled(true);
          } else {
            setName("");
            setDisabled(false);
          }
        }}
      >
        <CheckboxHiddenInput />
        <CheckboxControl />
        <CheckboxLabel>TA Hours</CheckboxLabel>
      </CheckboxRoot>
      <Button
        colorScheme="blue"
        onClick={() => createMutation.mutate({ name, is_ta_hours: isTA })}
        isDisabled={!name.trim()}
      >
        Submit
      </Button>
      <Heading size="md" mt={6}>
        Subjects
      </Heading>
      {subjects.map((subject) => (
        <Flex key={subject.id} justify="space-between" align="center">
          <Text>
            {subject.name} {subject.is_ta_hours ? "(TA Hours)" : ""}
          </Text>
          <Button
            size="sm"
            colorScheme="red"
            onClick={() => deleteMutation.mutate(subject.id)}
          >
            Delete
          </Button>
        </Flex>
      ))}
    </Stack>
  );
}
