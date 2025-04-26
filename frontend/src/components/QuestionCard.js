import React, { useLayoutEffect, useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import DefaultApi from "../client/src/api/DefaultApi";
import {
  CardRoot,
  CardBody,
  CardTitle,
  CardDescription,
  CardFooter,
  HStack,
  Button,
  IconButton,
  Text,
  Icon,
  Flex,
  Spacer,
  Input,
  FieldRoot,
  FieldsetRoot,
  FieldsetContent,
  Field,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import CommentCreateSchema from "../client/src/model/CommentCreateSchema";
import { toaster } from "./ui/toaster";

const api = new DefaultApi();

function getComments(subjectID) {
  return new Promise((resolve, reject) => {
    api.backendSchedApiViewsListComments(subjectID, (error, data, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

function postComment(subjectID, comment) {
  return new Promise((resolve, reject) => {
    api.backendSchedApiViewsCommentQuestion(
      subjectID,
      comment,
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

export default function QuestionCard({
  id,
  question_text,
  asker,
  date_asked,
  is_answered,
}) {
  const queryClient = useQueryClient();
  const [comments, setComments] = useState([]);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      content: "",
    },
  });

  const {
    data: commentData,
    isPending: isPendingComments,
    isFetching: isFetchingComments,
    isError: isErrorComments,
  } = useQuery({
    queryKey: ["comments", id],
    queryFn: () => getComments(id),
    placeholderData: (prevData) => prevData,
    enabled: id !== undefined && id !== null,
    refetchOnWindowFocus: false,
  });

  const postCommmentMutation = useMutation({
    mutationFn: (comment) => postComment(id, comment),
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", id]);
      toaster.success("Comment posted successfully!");
    },
    onError: (error) => {
      toaster.error("Error posting comment: " + error.message);
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    const comment_raw = {
      content: data.content,
    };
    const comment = CommentCreateSchema.constructFromObject(comment_raw);
    console.log(comment);
    postCommmentMutation.mutate(comment);
  };

  useLayoutEffect(() => {
    if (!isErrorComments) {
      setComments(commentData);
    }
  }, [commentData, isErrorComments]);

  return (
    <CardRoot>
      <CardBody>
        <HStack>
          <HStack>
            <CardTitle>{asker}</CardTitle>
            <Text>{date_asked}</Text>
          </HStack>
          <Spacer />
          <IconButton />
        </HStack>
        <CardDescription>
          <Text>{question_text}</Text>
        </CardDescription>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldsetRoot>
            <FieldsetContent>
              <FieldRoot>
                <Input
                  placeholder="Comment"
                  {...register("content", {
                    required: "Is required",
                  })}
                />
                <Button type="submit">Add Comment</Button>
              </FieldRoot>
            </FieldsetContent>
          </FieldsetRoot>
        </form>
      </CardBody>
      <hr />
      <CardFooter>
        {/* <HStack>
          <Text>Comments</Text>
          <Spacer />
          {comments && <Text>{comments.length}</Text>}
        </HStack> */}
        {/* <HStack>
          <Input flexGrow="1" />
          <Button>Post</Button>
        </HStack> */}
        <Flex
          h="300px"
          maxH="300px"
          overflowY="auto"
          direction="column"
          gap={2}
        >
          {isPendingComments ? (
            <Text>Loading...</Text>
          ) : isErrorComments ? (
            <Text>Error loading comments</Text>
          ) : (
            comments &&
            comments.map((comment) => (
              <CardRoot key={comment.id} minH="100px">
                <CardBody>
                  <HStack>
                    <CardTitle>{comment.user.username}</CardTitle>
                    <Text>{comment.date_posted.toLocaleDateString()}</Text>
                  </HStack>
                  <CardDescription>
                    <Text>{comment.content}</Text>
                  </CardDescription>
                </CardBody>
              </CardRoot>
            ))
          )}
        </Flex>
      </CardFooter>
    </CardRoot>
  );
}
