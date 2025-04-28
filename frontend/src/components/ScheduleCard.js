import {
  CardRoot,
  CardBody,
  CardFooter,
  CardTitle,
  Spacer,
  IconButton,
  HStack,
  Table,
  Heading,
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
import {
  EducatorFooter,
  EducatorShiftSidebar,
} from "./edcuatorcarditems/EducatorCardItem";
import { StudentCardSideBar } from "./studentcarditems/StudentCardItems";
import { TACardSideBar } from "./tacarditems/TACardItems";

const api = new DefaultApi();

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

function tasInShiftAPI(shift_id) {
  return new Promise((resolve, reject) => {
    api.backendSchedApiViewsListShiftTas(shift_id, (error, data, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
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

function studentsInShiftAPI(shift_id) {
  return new Promise((resolve, reject) => {
    api.backendSchedApiViewsListShiftStudents(
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

  console.log("shift_id", shift_id);

  const {
    data: studentsNotInShift,
    isLoading: isLoadingStudentsNotInShift,
    isError: isErrorStudentsNotInShift,
    error: errorStudentsNotInShift,
  } = useQuery({
    queryKey: [`students_not_in_shift ${shift_id}`],
    queryFn: () => studentsNotInShiftAPI(shift_id),
  });

  const {
    data: tasInShift,
    isLoading: isLoadingTAsInShift,
    isError: isErrorTAsInShift,
    error: errorTAsInShift,
  } = useQuery({
    queryKey: [`tas_in_shift ${shift_id}`],
    queryFn: () => tasInShiftAPI(shift_id),
  });

  const {
    data: studentsInShift,
    isLoading: isLoadingStudentsInShift,
    isError: isErrorStudentsInShift,
    error: errorStudentsInShift,
  } = useQuery({
    queryKey: [`students_in_shift ${shift_id}`],
    queryFn: () => studentsInShiftAPI(shift_id),
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

  if (is_educator_card) {
    sidebar = (
      <EducatorShiftSidebar
        shift_id={shift_id}
        schedule_id={schedule_id}
        not_tas={tasNotInShift}
        not_students={studentsNotInShift}
        in_tas={tasInShift}
        in_students={studentsInShift}
        full_capacity_tas={tasInShift?.length === max_tas}
        full_capacity_students={studentsInShift?.length === max_students}
        empty_tas={tasInShift?.length === 0}
        empty_students={studentsInShift?.length === 0}
      />
    );
  } else if (is_student_card) {
    sidebar = (
      <StudentCardSideBar
        shift_id={shift_id}
        schedule_id={schedule_id}
        full_capacity={studentsInShift?.length === max_students}
        empty={studentsInShift?.length === 0}
      />
    );
  } else if (is_ta_card) {
    sidebar = (
      <TACardSideBar
        shift_id={shift_id}
        schedule_id={schedule_id}
        not_tas={tasNotInShift}
        in_tas={tasInShift}
        full_capacity={tasInShift?.length === max_tas}
        empty={tasInShift?.length === 0}
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
          {!is_ta_hours && is_educator_card && (
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
                <Text size="lg">Monday</Text>
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
                <Text size="lg">Tuesday</Text>
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
                <Text size="lg">Wednesday</Text>
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
                <Text size="lg">Thursday</Text>
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
                <Text size="lg">Friday</Text>
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
                <Text size="lg">Saturday</Text>
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
                <Text size="lg">Sunday</Text>
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
