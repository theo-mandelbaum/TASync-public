import { Heading, Stack } from "@chakra-ui/react";
import DefaultApi from "./client/src/api/DefaultApi";
import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import SubjectButtons from "./components/SubjectButtons";
import { useNavigate } from "react-router-dom";

const api = new DefaultApi();

function get_subjects() {
  return new Promise((resolve, reject) => {
    api.backendSchedApiViewsListSubjects((error, data, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

const Subjects = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data: subjects, isLoading: isLoadingSubjects } = useQuery({
    queryKey: ["subjects"],
    queryFn: get_subjects,
    placeholderData: (prevData) => prevData,
  });

  function handleSubjectClick(subjectId) {
    console.log("Subject clicked:", subjectId);
    navigate(`/subjecthome/${subjectId}`);
  }

  return isLoadingSubjects ? (
    <Stack>
      <Heading>Loading...</Heading>
    </Stack>
  ) : (
    <Stack>
      <Heading>List subjects</Heading>
      <SubjectButtons subjects={subjects} onSubjectClick={handleSubjectClick} />
    </Stack>
  );
};

export default Subjects;
