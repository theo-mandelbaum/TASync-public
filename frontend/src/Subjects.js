import { useQuery } from "@tanstack/react-query";
import DefaultApi from "./client/src/api/DefaultApi";
import SubjectButtons from "./components/SubjectButtons";
import { Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const api = new DefaultApi();

function getSubjects() {
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

function Subjects() {
  const navigate = useNavigate();
  const {
    data: subjects,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["subjects"],
    queryFn: getSubjects,
    placeholderData: (prevData) => prevData,
    refetchOnWindowFocus: false,
  });

  function navigateSubjectHome(subjectID) {
    navigate(`/subjecthome/${subjectID}`);
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Flex flexDirection="column" alignItems="center" justifyContent="center">
      <SubjectButtons
        subjects={subjects}
        onSubjectClick={navigateSubjectHome}
      />
    </Flex>
  );
}

export default Subjects;
