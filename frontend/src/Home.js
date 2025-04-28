import DefaultApi from "./client/src/api/DefaultApi";
import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Container } from "@chakra-ui/react";
import Subjects from "./Subjects";

const api = new DefaultApi();

function backendSchedApiViewsListSchools() {
  return new Promise((resolve, reject) => {
    api.backendSchedApiViewsListSchools((error, data, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

export default function Home() {
  console.log("Available API methods:", Object.keys(api));
  const queryClient = useQueryClient();
  const { data: schools } = useQuery({
    queryKey: ["schools"],
    queryFn: backendSchedApiViewsListSchools,
    placeholderData: (prevData) => prevData,
  });
  // useEffect(() => {
  //   console.log("hello");
  //   queryClient.prefetchQuery(backendSchedApiViewsListSchools);
  // }, [queryClient]);
  return (
    <Container h="100%">
      <Subjects />
    </Container>
  );
}
