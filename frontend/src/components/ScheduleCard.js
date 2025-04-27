import {
  CardRoot,
  CardBody,
  CardFooter,
  CardTitle,
  Button,
  Spacer,
  IconButton,
  HStack,
  Dialog,
  useDisclosure,
  Portal,
  Fieldset,
  Field,
  Select,
  createListCollection,
  Input,
  CloseButton,
  Table,
  Heading,
  Flex,
  Stack,
  Separator,
  Avatar,
  AvatarGroup,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import DefaultApi from "../client/src/api/DefaultApi";
import ShiftSchemaCreate from "../client/src/model/ShiftSchemaCreate";
import { useState, useLayoutEffect } from "react";
import { toaster } from "./ui/toaster";
import { use } from "react";
import { FaTrash, FaUsers, FaUser, FaMinus } from "react-icons/fa";
import ListUsersSchema from "../client/src/model/ListStudentsSchema";
import { on } from "superagent";

const api = new DefaultApi();

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

function getShifts(schedule_id) {
  return new Promise((resolve, reject) => {
    api.backendSchedApiViewsListScheduleTaShifts(
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

function deleteScheduleAPI(schedule_id) {
  return new Promise((resolve, reject) => {
    api.backendSchedApiViewsDeleteSchedule(
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

function tasNotInShiftAPI(shift_id) {
  return new Promise((resolve, reject) => {
    api.backendSchedApiViewsListTasNotInShift(
      shift_id,
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

function studentsNotInShiftAPI(shift_id) {
  return new Promise((resolve, reject) => {
    api.backendSchedApiViewsListStudentsNotInShift(
      shift_id,
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
}) {
  const [targets, setTargets] = useState([]);

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
            <Dialog.Header>Add {target}s</Dialog.Header>
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
                <Button type="submit">Add {target}s</Button>
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

function EducatorShiftSidebar({ shift_id, schedule_id, tas, students }) {
  const queryClient = useQueryClient();

  const [taFramework, setTaFramework] = useState({});
  const [studentFramework, setStudentFramework] = useState({});
  const [isOpenStudentAdd, setIsOpenStudentAdd] = useState(false);
  const [isOpenTAAdd, setIsOpenTAAdd] = useState(false);

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
      queryClient.invalidateQueries([`shifts ${schedule_id}`]);
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
      queryClient.invalidateQueries([`shifts ${schedule_id}`]);
      queryClient.invalidateQueries([`students_not_in_shift ${shift_id}`]);
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
      queryClient.invalidateQueries([`shifts ${schedule_id}`]);
      queryClient.invalidateQueries([`tas_not_in_shift ${shift_id}`]);
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

  useLayoutEffect(() => {
    if (students) {
      const studentList = students.map((student) => ({
        label: student.username,
        value: student.id,
      }));

      const studentFrameworkRaw = createListCollection({
        items: studentList,
      });

      setStudentFramework(studentFrameworkRaw);
    }

    if (tas) {
      const taList = tas.map((ta) => ({
        label: ta.username,
        value: ta.id,
      }));
      const taFrameworkRaw = createListCollection({
        items: taList,
      });

      setTaFramework(taFrameworkRaw);
    }
  }, [tas, students]);

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
            target_framework={taFramework}
            value_name="ta_ids"
            setValue={setTAValue}
            bgColor="green.200"
            isOpen={isOpenTAAdd}
            setOpen={setIsOpenTAAdd}
          />
          <IconButton size="lg" bgColor="red.400">
            <FaMinus />{" "}
          </IconButton>
        </Stack>
      </Stack>
      <Stack>
        <Text>Student controls:</Text>
        <Stack spacing={2} alignItems="center">
          <EducatorAddSideBarButton
            submitFunction={handleStudentSubmit(handleStudentAddSubmitForm)}
            target="Student"
            icon={<FaUsers />}
            target_framework={studentFramework}
            value_name="student_ids"
            setValue={setStudentValue}
            bgColor="green.200"
            isOpen={isOpenStudentAdd}
            setOpen={setIsOpenStudentAdd}
          />
          <IconButton size="lg" bgColor="red.400">
            <FaMinus />
          </IconButton>
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
      queryClient.invalidateQueries([`shifts ${schedule_id}`]);
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

  console.log(open);

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

function ShiftCell({
  shift_id,
  schedule_id,
  start_time,
  end_time,
  tas,
  students,
  max_tas,
  max_students,
  is_educator_card,
  is_ta_card,
  is_student_card,
}) {
  const formattedStartTime = new Date(`1970-01-01T${start_time}`)
    .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    .replace("AM", "am")
    .replace("PM", "pm");
  const formattedEndTime = new Date(`1970-01-01T${end_time}`)
    .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    .replace("AM", "am")
    .replace("PM", "pm");
  const remainingTAs = max_tas - tas.length;
  const remainingStudents = max_students - students.length;

  const {
    data: tasNotInShift,
    isLoading: isLoadingTAsNotInShift,
    isError: isErrorTAsNotInShift,
    error: errorTAsNotInShift,
  } = useQuery({
    queryKey: [`tas_not_in_shift ${shift_id}`],
    queryFn: () => tasNotInShiftAPI(shift_id),
  });

  const {
    data: studentsNotInShift,
    isLoading: isLoadingStudentsNotInShift,
    isError: isErrorStudentsNotInShift,
    error: errorStudentsNotInShift,
  } = useQuery({
    queryKey: [`students_not_in_shift ${shift_id}`],
    queryFn: () => studentsNotInShiftAPI(shift_id),
  });

  const taAvatars = tas?.map((ta) => (
    <Avatar.Root key={ta.id}>
      <Avatar.Fallback name={ta.username} />
    </Avatar.Root>
  ));

  const studentAvatars = students?.map((student) => (
    <Avatar.Root key={student.id}>
      <Avatar.Fallback name={student.username} />
    </Avatar.Root>
  ));

  let sidebar = null;

  console.log(tasNotInShift, studentsNotInShift);
  console.log(shift_id);

  if (is_educator_card) {
    sidebar = (
      <EducatorShiftSidebar
        shift_id={shift_id}
        schedule_id={schedule_id}
        tas={tasNotInShift}
        students={studentsNotInShift}
      />
    );
  }

  return (
    <HStack>
      <Stack>
        <Stack>
          <Heading as="h3" size="md">
            {formattedStartTime} - {formattedEndTime}
          </Heading>
          <Heading as="h4" size="sm">
            {remainingTAs} TA slots available, {remainingStudents} student slots
            available
          </Heading>
        </Stack>
        <HStack spacing={4}>
          <Text fontSize="sm" color="gray.500">
            TAs:
          </Text>
          {tas.length > 0 ? (
            <AvatarGroup size="sm" max={3} spacing={-2}>
              {taAvatars}
            </AvatarGroup>
          ) : (
            <Text fontSize="sm" color="gray.500">
              {"No TAs :("}
            </Text>
          )}
          <Text fontSize="sm" color="gray.500">
            Students:
          </Text>
          {students.length > 0 ? (
            <AvatarGroup size="sm" max={3} spacing={-2}>
              {studentAvatars}
            </AvatarGroup>
          ) : (
            <Text fontSize="sm" color="gray.500">
              {"No Students :("}
            </Text>
          )}
        </HStack>
      </Stack>
      <Spacer />
      {sidebar}
    </HStack>
  );
}

export default function ScheduleCard({
  schedule_id,
  subject_name,
  is_ta_hours,
  is_educator_card,
  is_ta_card,
  is_student_card,
  educator_name,
}) {
  const queryClient = useQueryClient();
  const [mondayShifts, setMondayShifts] = useState([]);
  const [tuesdayShifts, setTuesdayShifts] = useState([]);
  const [wednesdayShifts, setWednesdayShifts] = useState([]);
  const [thursdayShifts, setThursdayShifts] = useState([]);
  const [fridayShifts, setFridayShifts] = useState([]);
  const [saturdayShifts, setSaturdayShifts] = useState([]);
  const [sundayShifts, setSundayShifts] = useState([]);

  const {
    data: shifts,
    isLoading: isLoadingShifts,
    isError: isErrorShifts,
    error: errorShifts,
  } = useQuery({
    queryKey: [`shifts ${schedule_id}`],
    queryFn: () => getShifts(schedule_id),
  });

  const deleteScheduleMutation = useMutation({
    mutationFn: () => deleteScheduleAPI(schedule_id),
    onSuccess: () => {
      toaster.create({
        title: "Success",
        description: "Schedule deleted successfully!",
        status: "success",
        duration: 5000,
      });
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
      queryClient.invalidateQueries({ queryKey: ["ta_schedule"] });
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

  function deleteSchedule() {
    deleteScheduleMutation.mutate();
  }

  useLayoutEffect(() => {
    if (shifts) {
      const shiftsByDay = {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
        Sunday: [],
      };

      shifts.forEach((shift) => {
        shiftsByDay[shift.day_of_week].push(shift);
      });

      for (const day in shiftsByDay) {
        shiftsByDay[day].sort((a, b) => {
          return (
            new Date(`1970-01-01T${a.start_time}`) -
            new Date(`1970-01-01T${b.start_time}`)
          );
        });
      }

      setMondayShifts(shiftsByDay.Monday);
      setTuesdayShifts(shiftsByDay.Tuesday);
      setWednesdayShifts(shiftsByDay.Wednesday);
      setThursdayShifts(shiftsByDay.Thursday);
      setFridayShifts(shiftsByDay.Friday);
      setSaturdayShifts(shiftsByDay.Saturday);
      setSundayShifts(shiftsByDay.Sunday);
    }
  }, [shifts]);

  let footer = null;

  if (is_educator_card) {
    footer = <EducatorFooter schedule_id={schedule_id} />;
  }

  return (
    <CardRoot bgColor={is_ta_hours && "purple.100"}>
      <CardBody>
        <HStack>
          <CardTitle>
            {subject_name} {!is_ta_hours && `for ${educator_name}`}
          </CardTitle>
          <Spacer />
          {!is_ta_hours && (
            <IconButton
              onClick={deleteSchedule}
              aria-label="Delete schedule button"
              bgColor="red.400"
            >
              <FaTrash />
            </IconButton>
          )}
        </HStack>
        <Table.Root interactive variant="line">
          <Table.Body>
            {mondayShifts.length > 0 && (
              <>
                <Heading as="h2" size="lg">
                  Monday
                </Heading>
                <Separator size="lg" />
                {mondayShifts.map((shift) => (
                  <Table.Row key={shift.id}>
                    <ShiftCell
                      shift_id={shift.id}
                      schedule_id={schedule_id}
                      start_time={shift.start_time}
                      end_time={shift.end_time}
                      tas={shift.ta}
                      students={shift.students}
                      max_tas={shift.max_ta}
                      max_students={shift.max_students}
                      is_educator_card={is_educator_card}
                      is_ta_card={is_ta_card}
                      is_student_card={is_student_card}
                    />
                  </Table.Row>
                ))}
              </>
            )}
            {tuesdayShifts.length > 0 && (
              <>
                <Heading as="h2" size="lg">
                  Tuesday
                </Heading>
                <Separator size="lg" />
                {tuesdayShifts.map((shift) => (
                  <Table.Row key={shift.id}>
                    <ShiftCell
                      shift_id={shift.id}
                      schedule_id={schedule_id}
                      start_time={shift.start_time}
                      end_time={shift.end_time}
                      tas={shift.ta}
                      students={shift.students}
                      max_tas={shift.max_ta}
                      max_students={shift.max_students}
                      is_educator_card={is_educator_card}
                      is_ta_card={is_ta_card}
                      is_student_card={is_student_card}
                    />
                  </Table.Row>
                ))}
              </>
            )}
            {wednesdayShifts.length > 0 && (
              <>
                <Heading as="h2" size="lg">
                  Wednesday
                </Heading>
                <Separator size="lg" />
                {wednesdayShifts.map((shift) => (
                  <Table.Row key={shift.id}>
                    <ShiftCell
                      shift_id={shift.id}
                      schedule_id={schedule_id}
                      start_time={shift.start_time}
                      end_time={shift.end_time}
                      tas={shift.ta}
                      students={shift.students}
                      max_tas={shift.max_ta}
                      max_students={shift.max_students}
                      is_educator_card={is_educator_card}
                      is_ta_card={is_ta_card}
                      is_student_card={is_student_card}
                    />
                  </Table.Row>
                ))}
              </>
            )}
            {thursdayShifts.length > 0 && (
              <>
                <Heading as="h2" size="lg">
                  Thursday
                </Heading>
                <Separator size="lg" />
                {thursdayShifts.map((shift) => (
                  <Table.Row key={shift.id}>
                    <ShiftCell
                      shift_id={shift.id}
                      schedule_id={schedule_id}
                      start_time={shift.start_time}
                      end_time={shift.end_time}
                      tas={shift.ta}
                      students={shift.students}
                      max_tas={shift.max_ta}
                      max_students={shift.max_students}
                      is_educator_card={is_educator_card}
                      is_ta_card={is_ta_card}
                      is_student_card={is_student_card}
                    />
                  </Table.Row>
                ))}
              </>
            )}
            {fridayShifts.length > 0 && (
              <>
                <Heading as="h2" size="lg">
                  Friday
                </Heading>
                <Separator size="lg" />
                {fridayShifts.map((shift) => (
                  <Table.Row key={shift.id}>
                    <ShiftCell
                      shift_id={shift.id}
                      schedule_id={schedule_id}
                      start_time={shift.start_time}
                      end_time={shift.end_time}
                      tas={shift.ta}
                      students={shift.students}
                      max_tas={shift.max_ta}
                      max_students={shift.max_students}
                      is_educator_card={is_educator_card}
                      is_ta_card={is_ta_card}
                      is_student_card={is_student_card}
                    />
                  </Table.Row>
                ))}
              </>
            )}
            {saturdayShifts.length > 0 && (
              <>
                <Heading as="h2" size="lg">
                  Saturday
                </Heading>
                <Separator size="lg" />
                {saturdayShifts.map((shift) => (
                  <Table.Row key={shift.id}>
                    <ShiftCell
                      shift_id={shift.id}
                      schedule_id={schedule_id}
                      start_time={shift.start_time}
                      end_time={shift.end_time}
                      tas={shift.ta}
                      students={shift.students}
                      max_tas={shift.max_ta}
                      max_students={shift.max_students}
                      is_educator_card={is_educator_card}
                      is_ta_card={is_ta_card}
                      is_student_card={is_student_card}
                    />
                  </Table.Row>
                ))}
              </>
            )}
            {sundayShifts.length > 0 && (
              <>
                <Heading as="h2" size="lg">
                  Sunday
                </Heading>
                <Separator size="lg" />
                {sundayShifts.map((shift) => (
                  <Table.Row key={shift.id}>
                    <ShiftCell
                      shift_id={shift.id}
                      schedule_id={schedule_id}
                      start_time={shift.start_time}
                      end_time={shift.end_time}
                      tas={shift.ta}
                      students={shift.students}
                      max_tas={shift.max_ta}
                      max_students={shift.max_students}
                      is_educator_card={is_educator_card}
                      is_ta_card={is_ta_card}
                      is_student_card={is_student_card}
                    />
                  </Table.Row>
                ))}
              </>
            )}
          </Table.Body>
        </Table.Root>
      </CardBody>
      <CardFooter>{footer}</CardFooter>
    </CardRoot>
  );
}
