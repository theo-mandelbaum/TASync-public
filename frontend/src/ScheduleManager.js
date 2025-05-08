import { useLayoutEffect, useState } from "react";
import DefaultApi from "./client/src/api/DefaultApi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Theme,
  Flex,
  Heading,
  Button,
  DialogBody,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  DialogContent,
  DialogBackdrop,
  DialogPositioner,
  DialogCloseTrigger,
  DialogActionTrigger,
  DialogFooter,
  DialogHeader,
  Portal,
  CloseButton,
  FieldRoot,
  FieldLabel,
  FieldRequiredIndicator,
  FieldsetContent,
  FieldsetRoot,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  SelectIndicator,
  SelectIndicatorGroup,
  SelectContent,
  SelectPositioner,
  SelectItem,
  SelectItemIndicator,
  SelectHiddenSelect,
  SelectControl,
  createListCollection,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import ScheduleCard from "./components/ScheduleCard";
import { set, useForm } from "react-hook-form";
import { toaster } from "./components/ui/toaster";
import "./css/manageschedule.css";

const api = new DefaultApi();

function getUserSchedules() {
  return new Promise((resolve, reject) => {
    api.backendSchedApiViewsListEducatorSchedules((error, data, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

function getTAHourSchedule() {
  return new Promise((resolve, reject) => {
    api.backendSchedApiViewsListTaHourSchedule((error, data, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

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

function postSchedule(subjectID) {
  return new Promise((resolve, reject) => {
    api.backendSchedApiViewsCreateSchedule(
      subjectID,
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

export default function ScheduleManager() {
  const group = JSON.parse(localStorage.getItem("group"));
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const [subjectDict, setSubjectDict] = useState({});
  const [subjectFramework, setSubjectFramework] = useState(null);
  const [placeholder, setPlaceholder] = useState([]);
  const [firstLoad, setFirstLoad] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      question: "",
    },
  });

  const {
    data: schedules,
    isLoading: isLoadingSchedules,
    isFetching: isFetchingSchedules,
    isError: isErrorSchedules,
  } = useQuery({
    queryKey: ["schedules"],
    queryFn: getUserSchedules,
    placeholderData: (prevData) => prevData,
    enabled: group !== null && group !== undefined,
    refetchOnWindowFocus: false,
    retry: 3,
    retryDelay: 200,
  });

  const {
    data: ta_schedule,
    isLoading: isLoadingTaSchedule,
    isFetching: isFetchingTaSchedule,
    isError: isErrorTaSchedule,
  } = useQuery({
    queryKey: ["ta_schedule"],
    queryFn: getTAHourSchedule,
    placeholderData: (prevData) => prevData,
    enabled: group !== null && group !== undefined,
    refetchOnWindowFocus: false,
    retry: 3,
    retryDelay: 200,
  });

  const {
    data: subjects,
    isLoading: isLoadingSubjects,
    isFetching: isFetchingSubjects,
    isError: isErrorSubjects,
  } = useQuery({
    queryKey: ["subjects"],
    queryFn: getSubjects,
    placeholderData: (prevData) => prevData,
    enabled: group !== null && group !== undefined && group.name === "Educator",
    refetchOnWindowFocus: false,
  });

  const postScheduleMutation = useMutation({
    mutationFn: (subjectID) => postSchedule(subjectID),
    onSuccess: () => {
      toaster.create({
        title: "Success",
        description: "Schedule added successfully!",
        status: "success",
        duration: 5000,
      });
      setOpen(false);
      queryClient.refetchQueries({ queryKey: ["schedules"] });
      queryClient.refetchQueries({ queryKey: ["ta_schedule"] });
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

  useLayoutEffect(() => {
    if (group === null || group === undefined || group.name !== "Educator") {
      navigate("/", { replace: true });
    }
  }, [group, navigate]);

  useLayoutEffect(() => {
    if (subjects) {
      const preFramwork = [];
      for (let i = 0; i < subjects.length; i++) {
        const subject = subjects[i];
        if (!subject.is_ta_hours) {
          preFramwork.push({
            label: subject.name,
            value: subject.id,
          });
        }
      }
      const newframework = createListCollection({
        items: preFramwork,
      });
      setSubjectFramework(newframework);

      setSubjectDict(
        preFramwork.reduce((acc, subject) => {
          acc[subject.id] = subject.name;
          return acc;
        }, {})
      );
    }
  }, [subjects]);

  function addSchedule(data, event) {
    event.preventDefault();
    postScheduleMutation.mutate(data.subject[0]);
  }

  useLayoutEffect(() => {
    if (schedules || ta_schedule) {
      setFirstLoad(false);
    }
  }, [schedules, ta_schedule]);

  if (
    (isLoadingSchedules ||
      isFetchingSchedules ||
      isLoadingTaSchedule ||
      isFetchingTaSchedule) &&
    firstLoad
  ) {
    return <div>Loading...</div>;
  }
  if (isErrorSchedules) {
    return <div>Error loading schedules.</div>;
  }

  return (
    <Container h="100%" maxW="100%" className="schedule-manager">
      <Heading size="lg" mb={6} textAlign="center">
        Schedule Manager
      </Heading>
      <Flex direction="column" gap={4} mb={7}>
        {schedules?.map((schedule) => (
          <ScheduleCard
            key={schedule.id}
            schedule_id={schedule.id}
            subject_name={schedule.subject.name}
            is_ta_hours={schedule.subject.is_ta_hours}
            is_educator_card={true}
            is_student_card={false}
            is_ta_card={false}
            educator_name={schedule.educator.username}
          />
        ))}
        {ta_schedule && (
          <ScheduleCard
            key={ta_schedule.id}
            schedule_id={ta_schedule.id}
            subject_name={ta_schedule.subject.name}
            is_ta_hours={ta_schedule.subject.is_ta_hours}
            is_educator_card={true}
            is_student_card={false}
            is_ta_card={false}
            educator_name={""}
          />
        )}
      </Flex>
      <DialogRoot open={open} onOpenChange={(e) => setOpen(e.open)}>
        <DialogTrigger asChild>
          <Button>Add Schedule</Button>
        </DialogTrigger>
        <Portal asChild>
          <Theme appearance="light">
            <DialogBackdrop />
            <DialogPositioner>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Schedule</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(addSchedule)}>
                  <FieldsetRoot>
                    <FieldsetContent>
                      <DialogBody>
                        <FieldRoot required>
                          <FieldLabel>Subject</FieldLabel>
                          <FieldRequiredIndicator />
                          <SelectRoot
                            collection={subjectFramework}
                            value={placeholder}
                            onValueChange={(e) => {
                              setValue("subject", e.value);
                              setPlaceholder(e.value);
                            }}
                          >
                            <SelectHiddenSelect />
                            <SelectControl>
                              <SelectTrigger>
                                <SelectValueText placeholder="Select a subject" />
                              </SelectTrigger>
                              <SelectIndicatorGroup>
                                <SelectIndicator />
                              </SelectIndicatorGroup>
                            </SelectControl>
                            <SelectPositioner>
                              <SelectContent>
                                {subjectFramework?.items?.map((subject) => (
                                  <SelectItem
                                    key={subject.id}
                                    item={subject.value}
                                  >
                                    {subject.label}
                                    <SelectItemIndicator />
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </SelectPositioner>
                          </SelectRoot>
                        </FieldRoot>
                      </DialogBody>
                    </FieldsetContent>
                    <DialogFooter>
                      <DialogActionTrigger asChild>
                        <Button variant="secondary">Cancel</Button>
                      </DialogActionTrigger>
                      <Button type="submit" variant="primary">
                        Submit
                      </Button>
                    </DialogFooter>
                  </FieldsetRoot>
                </form>
                <DialogCloseTrigger asChild>
                  <CloseButton />
                </DialogCloseTrigger>
              </DialogContent>
            </DialogPositioner>
          </Theme>
        </Portal>
      </DialogRoot>
    </Container>
  );
}
