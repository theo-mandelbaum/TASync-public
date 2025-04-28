import {
  Button,
  IconButton,
  HStack,
  Dialog,
  Portal,
  Fieldset,
  Field,
  Select,
  createListCollection,
  Input,
  CloseButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import DefaultApi from "../../client/src/api/DefaultApi";
import ShiftSchemaCreate from "../../client/src/model/ShiftSchemaCreate";
import { useState, useLayoutEffect } from "react";
import { toaster } from "../ui/toaster";
import { FaTrash, FaUsers, FaUser, FaMinus } from "react-icons/fa";
import ListUsersSchema from "../../client/src/model/ListStudentsSchema";

const api = new DefaultApi();

const weekFrameworks = createListCollection({
  items: [
    { label: "Monday", value: "Monday" },
    { label: "Tuesday", value: "Tuesday" },
    { label: "Wednesday", value: "Wednesday" },
    { label: "Thursday", value: "Thursday" },
    { label: "Friday", value: "Friday" },
    { label: "Saturday", value: "Saturday" },
    { label: "Sunday", value: "Sunday" },
  ],
});

function createTAShft(schedule_id, shift_data) {
  return new Promise((resolve, reject) => {
    api.backendSchedApiViewsCreateTaShift(
      schedule_id,
      shift_data,
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

function deleteShiftAPI(shift_id) {
  return new Promise((resolve, reject) => {
    api.backendSchedApiViewsDeleteShift(shift_id, (error, data, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

function edAddStudentToShiftAPI(shift_id, student_ids) {
  return new Promise((resolve, reject) => {
    api.backendSchedApiViewsEdAddStudentToShift(
      shift_id,
      student_ids,
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

function edRemoveStudentFromShiftAPI(shift_id, student_ids) {
  return new Promise((resolve, reject) => {
    api.backendSchedApiViewsEdRemoveStudentFromShift(
      shift_id,
      student_ids,
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

function edAddTAToShiftAPI(shift_id, ta_ids) {
  return new Promise((resolve, reject) => {
    api.backendSchedApiViewsEdAddTaToShift(
      shift_id,
      ta_ids,
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

function edRemoveTAFromShiftAPI(shift_id, ta_ids) {
  return new Promise((resolve, reject) => {
    api.backendSchedApiViewsEdRemoveTaFromShift(
      shift_id,
      ta_ids,
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

function EducatorAddSideBarButton({
  submitFunction,
  target,
  icon,
  target_framework,
  value_name,
  setValue,
  bgColor,
  isOpen,
  setOpen,
  action_type,
}) {
  const [targets, setTargets] = useState([]);

  useLayoutEffect(() => {
    if (!isOpen) {
      console.log("restting");
      setTargets([]);
    }
  }, [isOpen]);

  return (
    <Dialog.Root open={isOpen} onOpenChange={(e) => setOpen(e.open)}>
      <Dialog.Trigger asChild>
        <IconButton size="lg" bgColor={bgColor}>
          {icon}
        </IconButton>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              {action_type} {target}s
            </Dialog.Header>
            <form onSubmit={submitFunction}>
              <Dialog.Body>
                <Fieldset.Root>
                  <Fieldset.Content>
                    <Field.Root required>
                      <Field.RequiredIndicator />
                      <Field.Label>{target}s</Field.Label>
                      <Select.Root
                        multiple
                        collection={target_framework}
                        value={targets}
                        onValueChange={(e) => {
                          setValue(`${value_name}`, e.value);
                          setTargets(e.value);
                        }}
                      >
                        <Select.HiddenSelect />
                        <Select.Control>
                          <Select.Trigger>
                            <Select.ValueText
                              placeholder={`Select ${target}s`}
                            />
                          </Select.Trigger>
                          <Select.IndicatorGroup>
                            <Select.Indicator />
                          </Select.IndicatorGroup>
                        </Select.Control>
                        <Select.Positioner>
                          <Select.Content>
                            {target_framework.items?.map((target) => (
                              <Select.Item key={target.id} item={target.value}>
                                {target.label}
                                <Select.ItemIndicator />
                              </Select.Item>
                            ))}
                          </Select.Content>
                        </Select.Positioner>
                      </Select.Root>
                    </Field.Root>
                  </Fieldset.Content>
                </Fieldset.Root>
              </Dialog.Body>
              <Dialog.Footer>
                <Button type="submit">
                  {action_type} {target}s
                </Button>
              </Dialog.Footer>
            </form>
            <Dialog.CloseTrigger asChild>
              <CloseButton />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}

function EducatorShiftSidebar({
  shift_id,
  schedule_id,
  not_tas,
  not_students,
  in_tas,
  in_students,
}) {
  const queryClient = useQueryClient();

  const [notTaFramework, setNotTaFramework] = useState({});
  const [notStudentFramework, setNotStudentFramework] = useState({});
  const [inTaFramework, setInTaFramework] = useState({});
  const [inStudentFramework, setInStudentFramework] = useState({});
  const [isOpenStudentAdd, setIsOpenStudentAdd] = useState(false);
  const [isOpenTAAdd, setIsOpenTAAdd] = useState(false);
  const [isOpenStudentRemove, setIsOpenStudentRemove] = useState(false);
  const [isOpenTARemove, setIsOpenTARemove] = useState(false);

  const { handleSubmit: handleTASubmit, setValue: setTAValue } = useForm({
    defaultValues: {
      ta_ids: [],
    },
  });

  const { handleSubmit: handleStudentSubmit, setValue: setStudentValue } =
    useForm({
      defaultValues: {
        student_ids: [],
      },
    });

  const deleteShiftMutation = useMutation({
    mutationFn: () => deleteShiftAPI(shift_id),
    onSuccess: () => {
      toaster.create({
        title: "Success",
        description: "Shift deleted successfully",
        status: "success",
        duration: 5000,
      });
      queryClient.refetchQueries([`shifts ${schedule_id}`]);
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

  const addStudentToShiftMutation = useMutation({
    mutationFn: (student_ids) => edAddStudentToShiftAPI(shift_id, student_ids),
    onSuccess: () => {
      toaster.create({
        title: "Success",
        description: "Student added to shift successfully",
        status: "success",
        duration: 5000,
      });
      setIsOpenStudentAdd(false);
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

  const addTAToShiftMutation = useMutation({
    mutationFn: (ta_ids) => edAddTAToShiftAPI(shift_id, ta_ids),
    onSuccess: () => {
      toaster.create({
        title: "Success",
        description: "TA added to shift successfully",
        status: "success",
        duration: 5000,
      });
      setIsOpenTAAdd(false);
      queryClient.refetchQueries([`shifts ${schedule_id}`]);
      queryClient.refetchQueries([`tas_not_in_shift ${shift_id}`]);
      queryClient.refetchQueries([`tas_in_shift ${shift_id}`]);
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

  const removeStudentFromShiftMutation = useMutation({
    mutationFn: (student_ids) =>
      edRemoveStudentFromShiftAPI(shift_id, student_ids),
    onSuccess: () => {
      toaster.create({
        title: "Success",
        description: "Student removed from shift successfully",
        status: "success",
        duration: 5000,
      });
      setIsOpenStudentRemove(false);
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

  const removeTAsFromShiftMutation = useMutation({
    mutationFn: (ta_ids) => edRemoveTAFromShiftAPI(shift_id, ta_ids),
    onSuccess: () => {
      toaster.create({
        title: "Success",
        description: "TA removed from shift successfully",
        status: "success",
        duration: 5000,
      });
      setIsOpenTARemove(false);
      queryClient.refetchQueries([`shifts ${schedule_id}`]);
      queryClient.refetchQueries([`tas_not_in_shift ${shift_id}`]);
      queryClient.refetchQueries([`tas_in_shift ${shift_id}`]);
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

  function handleTAAddSubmitForm(data, e) {
    e.preventDefault();
    const ta_ids_Data = new ListUsersSchema(data.ta_ids);
    addTAToShiftMutation.mutate(ta_ids_Data);
  }

  function handleStudentAddSubmitForm(data, e) {
    e.preventDefault();
    const student_ids_Data = new ListUsersSchema(data.student_ids);
    addStudentToShiftMutation.mutate(student_ids_Data);
  }

  function handleTADeleteSubmitForm(data, e) {
    e.preventDefault();
    const ta_ids_Data = new ListUsersSchema(data.ta_ids);
    removeTAsFromShiftMutation.mutate(ta_ids_Data);
  }

  function handleStudentDeleteSubmitForm(data, e) {
    e.preventDefault();
    const student_ids_Data = new ListUsersSchema(data.student_ids);
    removeStudentFromShiftMutation.mutate(student_ids_Data);
  }

  useLayoutEffect(() => {
    if (in_students) {
      const studentList = in_students.map((student) => ({
        label: student.username,
        value: student.id,
      }));

      const studentFrameworkRaw = createListCollection({
        items: studentList,
      });

      setInStudentFramework(studentFrameworkRaw);
    }

    if (in_tas) {
      const taList = in_tas.map((ta) => ({
        label: ta.username,
        value: ta.id,
      }));
      const taFrameworkRaw = createListCollection({
        items: taList,
      });

      setInTaFramework(taFrameworkRaw);
    }
  }, [in_tas, in_students]);

  console.log(in_tas, inTaFramework);

  useLayoutEffect(() => {
    if (not_students) {
      const studentList = not_students.map((student) => ({
        label: student.username,
        value: student.id,
      }));

      const studentFrameworkRaw = createListCollection({
        items: studentList,
      });

      setNotStudentFramework(studentFrameworkRaw);
    }

    if (not_tas) {
      const taList = not_tas.map((ta) => ({
        label: ta.username,
        value: ta.id,
      }));
      const taFrameworkRaw = createListCollection({
        items: taList,
      });

      setNotTaFramework(taFrameworkRaw);
    }
  }, [not_tas, not_students]);

  function deleteShift() {
    deleteShiftMutation.mutate();
  }

  return (
    <HStack spacing={4}>
      <Stack>
        <Text>TA controls:</Text>
        <Stack spacing={2} alignItems="center">
          <EducatorAddSideBarButton
            submitFunction={handleTASubmit(handleTAAddSubmitForm)}
            target="TA"
            icon={<FaUser />}
            target_framework={notTaFramework}
            value_name="ta_ids"
            setValue={setTAValue}
            bgColor="green.200"
            isOpen={isOpenTAAdd}
            setOpen={setIsOpenTAAdd}
            action_type="Add"
          />
          <EducatorAddSideBarButton
            submitFunction={handleTASubmit(handleTADeleteSubmitForm)}
            target="TA"
            icon={<FaMinus />}
            target_framework={inTaFramework}
            value_name="ta_ids"
            setValue={setTAValue}
            bgColor="red.400"
            isOpen={isOpenTARemove}
            setOpen={setIsOpenTARemove}
            action_type="Remove"
          />
        </Stack>
      </Stack>
      <Stack>
        <Text>Student controls:</Text>
        <Stack spacing={2} alignItems="center">
          <EducatorAddSideBarButton
            submitFunction={handleStudentSubmit(handleStudentAddSubmitForm)}
            target="Student"
            icon={<FaUsers />}
            target_framework={notStudentFramework}
            value_name="student_ids"
            setValue={setStudentValue}
            bgColor="green.200"
            isOpen={isOpenStudentAdd}
            setOpen={setIsOpenStudentAdd}
            action_type="Add"
          />
          <EducatorAddSideBarButton
            submitFunction={handleStudentSubmit(handleStudentDeleteSubmitForm)}
            target="Student"
            icon={<FaMinus />}
            target_framework={inStudentFramework}
            value_name="student_ids"
            setValue={setStudentValue}
            bgColor="red.400"
            isOpen={isOpenStudentRemove}
            setOpen={setIsOpenStudentRemove}
            action_type="Remove"
          />
        </Stack>
      </Stack>
      <IconButton onClick={deleteShift} size="lg" bgColor="red.400">
        <FaTrash />
      </IconButton>
    </HStack>
  );
}

function EducatorFooter({ schedule_id }) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [dayValue, setDayValue] = useState([]);
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      start_time: "",
      end_time: "",
      day_of_week: "",
      max_ta: 0,
      max_students: 0,
    },
  });

  const taShiftMutation = useMutation({
    mutationFn: (data) => createTAShft(schedule_id, data),
    onSuccess: () => {
      toaster.create({
        title: "Success",
        description: "Shift created successfully",
        status: "success",
        duration: 5000,
      });
      setOpen(false);
      queryClient.refetchQueries([`shifts ${schedule_id}`]);
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

  function submitShift(data, e) {
    e.preventDefault();
    const shiftData = new ShiftSchemaCreate(
      data.start_time,
      data.end_time,
      data.day_of_week[0],
      null,
      data.max_ta,
      data.max_students
    );
    taShiftMutation.mutate(shiftData);
  }

  return (
    <HStack>
      <Dialog.Root
        open={open}
        onOpenChange={(e) => {
          console.log("value", e.open);
          setOpen(e.open);
        }}
      >
        <Dialog.Trigger asChild>
          <Button>Add Shift</Button>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>Add Shift</Dialog.Header>
              <form onSubmit={handleSubmit(submitShift)}>
                <Dialog.Body>
                  <Fieldset.Root>
                    <Fieldset.Content>
                      <Field.Root required>
                        <Field.RequiredIndicator />
                        <Field.Label>Start Time</Field.Label>
                        <Input {...register("start_time")} type="time" />
                      </Field.Root>
                      <Field.Root required>
                        <Field.RequiredIndicator />
                        <Field.Label>End Time</Field.Label>
                        <Input {...register("end_time")} type="time" />
                      </Field.Root>
                      <Field.Root required>
                        <Field.RequiredIndicator />
                        <Field.Label>Day of the Week</Field.Label>
                        <Select.Root
                          collection={weekFrameworks}
                          value={dayValue}
                          onValueChange={(e) => {
                            setValue("day_of_week", e.value);
                            setDayValue(e.value);
                          }}
                        >
                          <Select.HiddenSelect />
                          <Select.Control>
                            <Select.Trigger>
                              <Select.ValueText placeholder="Select a day" />
                            </Select.Trigger>
                            <Select.IndicatorGroup>
                              <Select.Indicator />
                            </Select.IndicatorGroup>
                          </Select.Control>
                          <Select.Positioner>
                            <Select.Content>
                              {weekFrameworks.items.map((day) => (
                                <Select.Item key={day.id} item={day.value}>
                                  {day.label}
                                  <Select.ItemIndicator />
                                </Select.Item>
                              ))}
                            </Select.Content>
                          </Select.Positioner>
                        </Select.Root>
                      </Field.Root>
                      <Field.Root required>
                        <Field.RequiredIndicator />
                        <Field.Label>Max TA</Field.Label>
                        <Input {...register("max_ta")} type="number" />
                      </Field.Root>
                      <Field.Root required>
                        <Field.RequiredIndicator />
                        <Field.Label>Max Students</Field.Label>
                        <Input {...register("max_students")} type="number" />
                      </Field.Root>
                    </Fieldset.Content>
                    <Button type="submit">Create Shift</Button>
                  </Fieldset.Root>
                </Dialog.Body>
              </form>
              <Dialog.CloseTrigger asChild>
                <CloseButton />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </HStack>
  );
}

export { EducatorShiftSidebar, EducatorFooter };
