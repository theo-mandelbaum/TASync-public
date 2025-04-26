import { useParams, useNavigate } from "react-router-dom";
import { z } from "zod";
import DefaultApi from "./client/src/api/DefaultApi";
import { Button } from "@chakra-ui/react";

const api = new DefaultApi();

function getShifts(subjectID) {
  return new Promise((resolve, reject) => {
    api.backendSchedApiViewsListTaShifts(subjectID, (error, data, response) => {
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

  const uuidSchema = z.string().uuid();

  try {
    console.log("trying");
    uuidSchema.parse(subjectID);
  } catch (e) {
    navigate("*", { replace: true });
    return null;
  }

  const handleGoToQuestions = () => {
    navigate(`/questions/${subjectID}`);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to Subject Home</h1>
      <Button colorScheme="blue" size="lg" onClick={handleGoToQuestions}>
        Go to Questions
      </Button>
    </div>
  );
}
