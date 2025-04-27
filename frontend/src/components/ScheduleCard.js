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

function EducatorShiftSidebar({ id }) {
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <HStack spacing={4}>
      <Stack>
        <Text>TA controls:</Text>
        <Stack spacing={2} alignItems="center">
          <IconButton size="lg" bgColor="green.200">
            <FaUser />{" "}
          </IconButton>
          <IconButton size="lg" bgColor="red.400">
            <FaMinus />{" "}
          </IconButton>
        </Stack>
      </Stack>
      <Stack>
        <Text>Student controls:</Text>
        <Stack spacing={2} alignItems="center">
          <IconButton size="lg" bgColor="green.200">
            <FaUsers />
          </IconButton>
          <IconButton size="lg" bgColor="red.400">
            <FaMinus />
          </IconButton>
        </Stack>
      </Stack>
    </HStack>
  );
}

function EducatorFooter({ id }) {
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onClose } = useDisclosure();
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
    mutationFn: (data) => createTAShft(id, data),
    onSuccess: () => {
      toaster.create({
        title: "Success",
        description: "Shift created successfully",
        status: "success",
        duration: 5000,
      });
      onClose();
      queryClient.invalidateQueries([`shifts ${id}`]);
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
    console.log(data);
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
      <Dialog.Root isOpen={isOpen} onClose={onClose}>
        <Dialog.Trigger asChild>
          <Button onClick={onOpen}>Add Shift</Button>
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
                <CloseButton onClick={onClose} />
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

  const taAvatars = tas.map((ta) => (
    <Avatar.Root key={ta.id}>
      <Avatar.Fallback name={ta.username} />
    </Avatar.Root>
  ));

  const studentAvatars = students.map((student) => (
    <Avatar.Root key={student.id}>
      <Avatar.Fallback name={student.username} />
    </Avatar.Root>
  ));

  let sidebar = null;

  if (is_educator_card) {
    sidebar = <EducatorShiftSidebar id={shift_id} />;
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
  id,
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
    queryKey: [`shifts ${id}`],
    queryFn: () => getShifts(id),
  });

  const deleteScheduleMutation = useMutation({
    mutationFn: (schedule_id) => deleteScheduleAPI(schedule_id),
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
    deleteScheduleMutation.mutate(id);
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
    footer = <EducatorFooter id={id} />;
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
