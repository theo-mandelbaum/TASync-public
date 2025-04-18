import { Container, Heading } from "@chakra-ui/react";
import DefaultApi from "./client/src/api/DefaultApi";
import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import SubjectButtons from "./components/SubjectButtons";

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
  const { data: subjects, isLoading: isLoadingSubjects } = useQuery({
    queryKey: ["subjects"],
    queryFn: get_subjects,
    placeholderData: (prevData) => prevData,
  });

  function handleSubjectClick(subjectId) {
    console.log("Subject clicked:", subjectId);
  }

  if (isLoadingSubjects) {
    return (
      <Container h="100%">
        <Heading>Loading...</Heading>
      </Container>
    );
  }

  return (
    <Container h="100%">
      <Heading>List subjects</Heading>
      <SubjectButtons subjects={subjects} onSubjectClick={handleSubjectClick} />
    </Container>
  );
};

export default Subjects;
