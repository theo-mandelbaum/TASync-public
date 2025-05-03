import DefaultApi from "./client/src/api/DefaultApi";
import { Container, SimpleGrid, Card, Heading, Button } from "@chakra-ui/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useState, useLayoutEffect } from "react";
import { toaster } from "./components/ui/toaster";

const api = new DefaultApi();

function getIncomingSwapRequests() {
  return new Promise((resolve, reject) => {
    api.backendSchedApiViewsListIncomingSwapRequests(
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

function handleSwapRequest(swap_id, answer) {
  return new Promise((resolve, reject) => {
    api.backendSchedApiViewsHandleSwapRequest(
      swap_id,
      answer,
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

function RequestCard({ request }) {
  const queryClient = useQueryClient();
  const fromUser = request.requester_user.username;
  const dateRequested = new Date(request.date_requested);
  const dateRequestedString = dateRequested.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const requestedShift = request.requested_shift;
  const requesterShift = request.requester_shift;

  const requestedShiftSubjectID = requestedShift.schedule.subject.id;
  const requesterShiftSubjectID = requesterShift.schedule.subject.id;

  const requesterShiftDay = requesterShift.day_of_week;
  const requesterShiftStartRaw = requesterShift.start_time;
  const requesterShiftEndRaw = requesterShift.end_time;
  const requesterShiftStart = new Date(`1970-01-01T${requesterShiftStartRaw}`)
    .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    .replace("AM", "am")
    .replace("PM", "pm");
  const requesterShiftEnd = new Date(`1970-01-01T${requesterShiftEndRaw}`)
    .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    .replace("AM", "am")
    .replace("PM", "pm");
  const requesterShiftSubject = requesterShift.schedule.subject.name;
  const requesterShiftString = `${requesterShiftDay} ${requesterShiftStart} - ${requesterShiftEnd}`;

  const requesterShiftEducator = requesterShift.schedule.educator.username;

  const handleSwapRequestMutation = useMutation({
    mutationFn: (answer) => handleSwapRequest(request.id, answer),
    onSuccess: () => {
      toaster.create({
        title: "Swap request handled successfully",
        description: "The swap request has been handled.",
        status: "success",
        duration: 5000,
      });
      queryClient.invalidateQueries(["incoming_swap_requests"]);
      queryClient.invalidateQueries([`schedules ${requestedShiftSubjectID}`]);
      queryClient.invalidateQueries([`schedules ${requesterShiftSubjectID}`]);
    },
    onError: (error) => {
      toaster.create({
        title: "Error handling swap request",
        description: error.message,
        status: "error",
        duration: 5000,
      });
    },
  });

  return (
    <Card.Root borderWidth={3}>
      <Card.Header>
        <Card.Title>{fromUser} request</Card.Title>
        <Heading as="h4">
          {requesterShiftSubject}
          {requesterShiftEducator && `(${requesterShiftEducator})`}{" "}
          {dateRequestedString}
        </Heading>
      </Card.Header>
      <Card.Body>
        <Card.Description>{requesterShiftString}</Card.Description>
      </Card.Body>
      <Card.Footer>
        <Button
          onClick={() => handleSwapRequestMutation.mutate(true)}
          bgColor="green.700"
        >
          Accept
        </Button>
        <Button
          onClick={() => handleSwapRequestMutation.mutate(false)}
          bgColor="red.700"
        >
          Decline
        </Button>
      </Card.Footer>
    </Card.Root>
  );
}

export default function ShiftRquests() {
  const group = JSON.parse(localStorage.getItem("group"));
  const navigate = useNavigate();
  const [firstLoad, setFirstLoad] = useState(true);
  const {
    data: incomingSwapRequests,
    isLoading: isLoadingIncomingSwapRequests,
    isFetching: isFetchingIncomingSwapRequests,
    isError: isErrorIncomingSwapRequests,
  } = useQuery({
    queryKey: ["incoming_swap_requests"],
    queryFn: getIncomingSwapRequests,
    placeholderData: (prevData) => prevData,
    retry: 3,
    retryDelay: 200,
    refetchOnWindowFocus: false,
  });

  useLayoutEffect(() => {
    if (group === null || group === undefined || group.name !== "TA") {
      navigate("/", { replace: true });
    }
  }, [group, navigate]);

  if (
    (isLoadingIncomingSwapRequests || isFetchingIncomingSwapRequests) &&
    firstLoad
  ) {
    setFirstLoad(false);
    return <div>Loading...</div>;
  }

  if (isErrorIncomingSwapRequests) {
    return <div>Error loading messages</div>;
  }
  return (
    <Container maxW="container.lg" py={6}>
      <Heading size="lg" mb={6} textAlign="center">
        Incoming Swap Requests
      </Heading>
      <SimpleGrid columns={[1, 2]} spacing={6}>
        {incomingSwapRequests?.map((request) => (
          <RequestCard request={request} key={request.id} />
        ))}
      </SimpleGrid>
    </Container>
  );
}
