import {
  Container,
  Flex,
  Heading,
  Theme,
  Text,
  Button,
  DialogBody,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  DialogContent,
  DialogBackdrop,
  DialogPositioner,
  DialogCloseTrigger,
  DialogFooter,
  DialogHeader,
  Portal,
  CloseButton,
  FieldRoot,
  FieldLabel,
  FieldRequiredIndicator,
  FieldsetContent,
  FieldsetRoot,
  Textarea,
  DialogActionTrigger,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { set, z } from "zod";
import DefaultApi from "./client/src/api/DefaultApi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLayoutEffect, useState } from "react";
import QuestionCard from "./components/QuestionCard";
import QuestionCreateSchema from "./client/src/model/QuestionCreateSchema";
import { toaster } from "./components/ui/toaster";

const api = new DefaultApi();

function getQuestions(subjectID) {
  return new Promise((resolve, reject) => {
    api.backendSchedApiViewsListQuestions(
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

function postQuestion(subjectID, questionSchema) {
  return new Promise((resolve, reject) => {
    api.backendSchedApiViewsCreateQuestion(
      subjectID,
      questionSchema,
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

const Questions = () => {
  const group = JSON.parse(localStorage.getItem("group"));
  const queryClient = useQueryClient();
  const { subjectID } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const uuidSchema = z.string().uuid();
  const [questions, setQuestions] = useState([]);
  const {
    data: questionData,
    isPending: isPendingQuestions,
    isFetching: isFetchingQuestions,
    isError: isErrorQuestions,
  } = useQuery({
    queryKey: [`questions ${subjectID}`],
    queryFn: () => getQuestions(subjectID),
    placeholderData: (prevData) => prevData,
    enabled: subjectID !== undefined && subjectID !== null,
    refetchOnWindowFocus: false,
  });

  const postQuestionMutation = useMutation({
    mutationFn: (questionSchema) => postQuestion(subjectID, questionSchema),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: [`questions ${subjectID}`] });
      toaster.create({
        title: "Success",
        description: "Question posted successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setOpen(false);
    },
    onError: (error) => {
      toaster.create({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const onSubmit = (data) => {
    const question_raw = {
      question_text: data.question,
    };
    const question = QuestionCreateSchema.constructFromObject(question_raw);
    postQuestionMutation.mutate(question);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      question: "",
    },
  });

  useLayoutEffect(() => {
    if (!isErrorQuestions) {
      setQuestions(questionData);
    }
  }, [questionData, isErrorQuestions]);

  try {
    uuidSchema.parse(subjectID);
  } catch (e) {
    navigate("/*", { replace: true });
    return null;
  }

  return (
    <Container h="100vh">
      <Heading>Questions</Heading>
      {isPendingQuestions ? (
        <Text>Loading...</Text>
      ) : isErrorQuestions ? (
        <Text>Error loading questions</Text>
      ) : (
        <Flex direction="column">
          <Flex direction="column" gap={4}>
            {questions &&
              questions.map((question) => (
                <QuestionCard
                  key={question.id}
                  id={question.id}
                  subject_id={subjectID}
                  question_text={question.question_text}
                  asker={question.asker.username}
                  date_asked={question.date_asked.toLocaleDateString()}
                  is_answered={question.is_answered}
                />
              ))}
          </Flex>
          {group?.name !== "Educator" && group?.name !== "TA" && (
            <DialogRoot open={open} onOpenChange={(e) => setOpen(e.open)}>
              <DialogTrigger asChild>
                <Button position="fixed" bottom="3" right="3">
                  Add Question
                </Button>
              </DialogTrigger>
              <Portal asChild>
                <Theme appearance="light">
                  <DialogBackdrop />
                  <DialogPositioner>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Question</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <FieldsetRoot>
                          <FieldsetContent>
                            <DialogBody>
                              <FieldRoot required>
                                <FieldLabel>Question</FieldLabel>
                                <FieldRequiredIndicator />
                                <Textarea
                                  name="question"
                                  placeholder="Enter your question here"
                                  {...register("question", {
                                    required: "Question is required",
                                  })}
                                  isInvalid={!!errors.question}
                                />
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
          )}
        </Flex>
      )}
    </Container>
  );
};

export default Questions;
