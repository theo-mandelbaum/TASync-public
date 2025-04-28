import { Stack, IconButton } from "@chakra-ui/react";
import { FaPlus, FaMinus } from "react-icons/fa";
import DefaultApi from "../../client/src/api/DefaultApi";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { toaster } from "../ui/toaster";
import { useState, useLayoutEffect } from "react";

const api = new DefaultApi();

function studentsInShiftAPI(schedule_id) {
  return new Promise((resolve, reject) => {
    api.backendSchedApiViewsListShiftStudents(
      schedule_id,
      (error, data, response) => {
        if (error) {
          reject(error);
        } else {
          console.log("gooooood");
          resolve(data);
        }
      }
    );
  });
}

function getUserIDAPI(schedule_id) {
  return new Promise((resolve, reject) => {
    api.backendSchedApiViewsGetUserId((error, data, response) => {
      if (error) {
        reject(error);
      } else {
        console.log("gooooood");
        resolve(data);
      }
    });
  });
}

function addStudentToShiftAPI(schedule_id) {
  return new Promise((resolve, reject) => {
    api.backendSchedApiViewsAddStudentToShift(
      schedule_id,
      (error, data, response) => {
        if (error) {
          reject(error);
        } else {
          console.log("gooooood");
          resolve(data);
        }
      }
    );
  });
}

function removeStudentFromShiftAPI(schedule_id) {
  return new Promise((resolve, reject) => {
    api.backendSchedApiViewsRemoveStudentFromShift(
      schedule_id,
      (error, data, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      }
    );
  });
}

function StudentCardSideBar({ shift_id, schedule_id }) {
  const queryClient = useQueryClient();
  const [inShift, setInShift] = useState(false);
  const { data: studentsInShift, isFetching: isStudentsFetching } = useQuery({
    queryKey: [`students_in_shift ${shift_id}`],
    queryFn: () => studentsInShiftAPI(shift_id),
    enabled: shift_id !== null && shift_id !== undefined,
    refetchOnWindowFocus: false,
    retry: 3,
    retryDelay: 200,
  });

  const { data: userID, isFetching: isUserIDFetching } = useQuery({
    queryKey: [`user_id`],
    queryFn: () => getUserIDAPI(shift_id),
    refetchOnWindowFocus: false,
    retry: 3,
    retryDelay: 200,
  });

  const addStudentMutation = useMutation({
    mutationFn: () => addStudentToShiftAPI(shift_id),
    onSuccess: () => {
      toaster.create({
        title: "Success",
        description: "Student added shift successfully",
        status: "success",
        duration: 5000,
      });
      queryClient.refetchQueries([`shifts ${schedule_id}`]);
      queryClient.refetchQueries([`students_not_in_shift ${shift_id}`]);
      queryClient.refetchQueries([`students_in_shift ${shift_id}`]);
    },
    onError: (error) => {
      toaster.create({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 5000,
      });
    },
  });

  const removeStudentMutation = useMutation({
    mutationFn: () => removeStudentFromShiftAPI(shift_id),
    onSuccess: () => {
      toaster.create({
        title: "Success",
        description: "Student removed shift successfully",
        status: "success",
        duration: 5000,
      });
      queryClient.refetchQueries([`shifts ${schedule_id}`]);
      queryClient.refetchQueries([`students_not_in_shift ${shift_id}`]);
      queryClient.refetchQueries([`students_in_shift ${shift_id}`]);
    },
    onError: (error) => {
      toaster.create({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 5000,
      });
    },
  });

  function handleAddStudent() {
    addStudentMutation.mutate();
  }
  function handleRemoveStudent() {
    removeStudentMutation.mutate();
  }

  useLayoutEffect(() => {
    if (studentsInShift && userID) {
      const studentInShift = studentsInShift.find(
        (student) => student.id === userID
      );
      console.log(studentInShift);
      console.log(!!studentInShift);
      setInShift(!!studentInShift);
    }
  }, [studentsInShift, shift_id, userID]);
  return (
    <Stack spacing={2} alignItems="center" justifyContent="center">
      {!inShift ? (
        <IconButton onClick={handleAddStudent} size="lg" bgColor="green.200">
          <FaPlus />
        </IconButton>
      ) : (
        <IconButton onClick={handleRemoveStudent} size="lg" bgColor="red.400">
          <FaMinus />
        </IconButton>
      )}
    </Stack>
  );
}

export { StudentCardSideBar };
