import { useParams, useNavigate } from "react-router-dom";
import { z } from "zod";
import DefaultApi from "./client/src/api/DefaultApi";

const api = new DefaultApi();

function get_shifts(subjectID) {
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

  return <div>hello</div>;
}
