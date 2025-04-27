import { Flex } from "@chakra-ui/react";
import DefaultApi from "./client/src/api/DefaultApi";
import ScheduleCard from "./components/ScheduleCard";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const api = new DefaultApi();

function getSchedules(subject_id) {
  return new Promise((resolve, reject) => {
    api.backendSchedApiViewsListSchedules(
      subject_id,
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

// function getTAHourScheduleAPI() {
//   return new Promise((resolve, reject) => {
//     api.backendSchedApiViewsListTaHourSchedule((error, data, response) => {
//       if (error) {
//         reject(error);
//       } else {
//         resolve(data);
//       }
//     });
//   });
// }

export default function SubjectSchedView({ subject_id }) {
  const group = JSON.parse(localStorage.getItem("group"));
  const {
    data: schedules,
    isLoading: schedulesLoading,
    isError: schedulesError,
    error: schedulesErrorMessage,
  } = useQuery({
    queryKey: [`schedules ${subject_id}`],
    queryFn: () => getSchedules(subject_id),
    enabled: group !== null && group !== undefined,
    refetchOnWindowFocus: false,
    retry: 3,
    retryDelay: 200,
  });

  return (
    <Flex direction="column" gap={4} mb={7}>
      {schedules?.map((schedule) => (
        <ScheduleCard
          key={schedule.id}
          schedule_id={schedule.id}
          subject_name={schedule.subject.name}
          is_ta_hours={schedule.subject.is_ta_hours}
          is_educator_card={false}
          is_student_card={group?.name === "Student"}
          is_ta_card={group?.name === "TA"}
          educator_name={schedule.educator?.username}
        />
      ))}
    </Flex>
  );
}
