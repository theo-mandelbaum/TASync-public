import { useParams, useNavigate } from "react-router-dom";
import { z } from "zod";
import DefaultApi from "./client/src/api/DefaultApi";
import { Button, Container, Heading } from "@chakra-ui/react";
import SubjectSchedView from "./SubjectSchedView";
import { useQuery } from "@tanstack/react-query";
import { useLayoutEffect, useState } from "react";

const api = new DefaultApi();

// function getShifts(subjectID) {
//   return new Promise((resolve, reject) => {
//     api.backendSchedApiViewsListTaShifts(subjectID, (error, data, response) => {
//       if (error) {
//         reject(error);
//       } else {
//         resolve(data);
//       }
//     });
//   });
// }

function getSubject(subject_id) {
  return new Promise((resolve, reject) => {
    api.backendSchedApiViewsGetSubject(subject_id, (error, data, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

export default function SubjectHome() {
  const { subjectID } = useParams();
  const navigate = useNavigate();
  const [firstLoad, setFirstLoad] = useState(true);

  const uuidSchema = z.string().uuid();

  const {
    data: subject,
    isLoading: subjectLoading,
    isFetching: subjectFetching,
    isError: subjectError,
    error: subjectErrorMessage,
  } = useQuery({
    queryKey: [`subject ${subjectID}`],
    queryFn: () => getSubject(subjectID),
    enabled: subjectID !== null && subjectID !== undefined,
    refetchOnWindowFocus: false,
    retry: 3,
    retryDelay: 200,
  });

  useLayoutEffect(() => {
    if (subject) {
      setFirstLoad(false);
    }
  }, [subject]);

  try {
    uuidSchema.parse(subjectID);
  } catch (e) {
    navigate("*", { replace: true });
    return null;
  }

  const handleGoToQuestions = () => {
    navigate(`/questions/${subjectID}`);
  };

  if ((subjectLoading || subjectFetching) && firstLoad) {
    return <div>Loading...</div>;
  }

  if (subjectError) {
    return <div>Error: {subjectErrorMessage}</div>;
  }

  return (
    <Container>
      <Heading>Welcome to {subject?.name} Home</Heading>
      <SubjectSchedView subject_id={subjectID} />
      <Button colorScheme="blue" size="lg" onClick={handleGoToQuestions}>
        Go to Questions
      </Button>
    </Container>
  );
}
