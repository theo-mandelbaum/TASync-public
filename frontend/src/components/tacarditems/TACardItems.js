import {
  Stack,
  IconButton,
  Dialog,
  HStack,
  Button,
  Portal,
  Fieldset,
  Field,
  Select,
  CloseButton,
  createListCollection,
} from "@chakra-ui/react";
import { FaPlus, FaMinus } from "react-icons/fa";
import DefaultApi from "../../client/src/api/DefaultApi";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { toaster } from "../ui/toaster";
import { useState, useLayoutEffect } from "react";
import { set } from "react-hook-form";
import { useForm } from "react-hook-form";

const api = new DefaultApi();

function getUserIDAPI() {
  return new Promise((resolve, reject) => {
    api.backendSchedApiViewsGetUserId((error, data, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

function getUserShiftsAPI() {
  return new Promise((resolve, reject) => {
    api.backendSchedApiViewsListTaUserShifts((error, data, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

function addTAToShiftAPI(shift_id) {
  return new Promise((resolve, reject) => {
    api.backendSchedApiViewsAddTaToShift(shift_id, (error, data, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

function removeTAFromShiftAPI(shift_id) {
  return new Promise((resolve, reject) => {
    api.backendSchedApiViewsRemoveTaFromShift(
      shift_id,
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

function createSwapRequestAPI(fromShiftId, toShiftId, toUserId) {
  return new Promise((resolve, reject) => {
    api.backendSchedApiViewsCreateSwapRequest(
      fromShiftId,
      toShiftId,
      toUserId,
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

function TACardSideBar({
  shift_id,
  schedule_id,
  not_tas,
  in_tas,
  full_capacity,
  empty,
}) {
  const queryClient = useQueryClient();
  const [inShift, setInShift] = useState(false);
  const [swapShiftButton, setSwapShiftButton] = useState(false);
  const [inFrameWork, setInFrameWork] = useState(null);
  const [usersShiftsFrameWork, setUsersShiftsFrameWork] = useState(null);
  const [fromShift, setFromShift] = useState([]);
  const [toUser, setToUser] = useState([]);
  const [open, setOpen] = useState(false);

  const { handleSubmit, setValue } = useForm({
    defaultValues: {
      to_user_id: null,
      from_shift_id: null,
    },
  });

  const { data: userID, isFetching: isUserIDFetching } = useQuery({
    queryKey: [`user_id`],
    queryFn: () => getUserIDAPI(shift_id),
    refetchOnWindowFocus: false,
    retry: 3,
    retryDelay: 200,
  });

  const { data: userShifts, isFetching: isUserShiftsFetching } = useQuery({
    queryKey: [`user_shifts`],
    queryFn: () => getUserShiftsAPI(),
    refetchOnWindowFocus: false,
    retry: 3,
    retryDelay: 200,
  });

  const addTAMutation = useMutation({
    mutationFn: () => addTAToShiftAPI(shift_id),
    onSuccess: () => {
      toaster.create({
        title: "Success",
        description: "TA added shift successfully",
        status: "success",
        duration: 5000,
      });
      queryClient.refetchQueries([`shifts ${schedule_id}`]);
      queryClient.refetchQueries([`tas_not_in_shift ${shift_id}`]);
      queryClient.refetchQueries([`tas_in_shift ${shift_id}`]);
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

  const removeTAMutation = useMutation({
    mutationFn: () => removeTAFromShiftAPI(shift_id),
    onSuccess: () => {
      toaster.create({
        title: "Success",
        description: "TA removed shift successfully",
        status: "success",
        duration: 5000,
      });
      queryClient.refetchQueries([`shifts ${schedule_id}`]);
      queryClient.refetchQueries([`tas_not_in_shift ${shift_id}`]);
      queryClient.refetchQueries([`tas_in_shift ${shift_id}`]);
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

  const createSwapRequestMuation = useMutation({
    mutationFn: (data) => {
      createSwapRequestAPI(data.from_shift_id, shift_id, data.to_user_id);
    },
    onSuccess: () => {
      toaster.create({
        title: "Success",
        description: "Swap request created successfully",
        status: "success",
        duration: 5000,
      });
      setOpen(false);
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

  function handleAddTA() {
    addTAMutation.mutate();
  }
  function handleRemoveTA() {
    removeTAMutation.mutate();
  }

  function submitShiftSwap(data) {
    console.log(data);
    console.log("in");
    createSwapRequestMuation.mutate(data);
  }

  useLayoutEffect(() => {
    if (userID && in_tas && not_tas) {
      const tasInShiftFilter = in_tas.find((ta) => ta.id === userID);
      console.log(tasInShiftFilter);
      console.log(!!tasInShiftFilter);
      setInShift(!!tasInShiftFilter);
      const swapShiftButtonFilter = not_tas?.find((ta) => ta.id === userID);
      setSwapShiftButton(!!swapShiftButtonFilter);
      if (in_tas?.length === 0) {
        setSwapShiftButton(false);
      }
      const inFrameWorkRaw = in_tas.map((ta) => ({
        label: ta.username,
        value: ta.id,
      }));
      const newInFrameWork = createListCollection({
        items: inFrameWorkRaw,
      });
      setInFrameWork(newInFrameWork);
    }
    if (userShifts && userID) {
      const usersShiftsFrameWorkRaw = userShifts.map((shift) => {
        const start_time = new Date(`1970-01-01T${shift.start_time}`)
          .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
          .replace("AM", "am")
          .replace("PM", "pm");

        const end_time = new Date(`1970-01-01T${shift.end_time}`)
          .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
          .replace("AM", "am")
          .replace("PM", "pm");

        return {
          label: `${shift.schedule.subject.name} ${shift.day_of_week} ${start_time} - ${end_time}`,
          value: shift.id,
        };
      });
      const newUserShiftsFrameWork = createListCollection({
        items: usersShiftsFrameWorkRaw,
      });
      setUsersShiftsFrameWork(newUserShiftsFrameWork);
    }
  }, [shift_id, userID, not_tas, in_tas, userShifts]);

  return (
    <Stack spacing={2} alignItems="center" justifyContent="center">
      <HStack>
        {!inShift
          ? !full_capacity && (
              <IconButton onClick={handleAddTA} size="lg" bgColor="green.200">
                <FaPlus />
              </IconButton>
            )
          : !empty && (
              <IconButton onClick={handleRemoveTA} size="lg" bgColor="red.400">
                <FaMinus />
              </IconButton>
            )}
      </HStack>
      {swapShiftButton && (
        <Dialog.Root
          open={open}
          onOpenChange={(e) => {
            console.log("value", e.open);
            setOpen(e.open);
          }}
        >
          <Dialog.Trigger asChild>
            <Button>Swap Shift</Button>
          </Dialog.Trigger>
          <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.Header>Swap Shift</Dialog.Header>
                <form onSubmit={handleSubmit(submitShiftSwap)}>
                  <Dialog.Body>
                    <Fieldset.Root>
                      <Fieldset.Content>
                        <Field.Root required>
                          <Field.RequiredIndicator />
                          <Field.Label>TA to swap with</Field.Label>
                          <Select.Root
                            collection={inFrameWork}
                            value={toUser}
                            onValueChange={(e) => {
                              setValue("to_user_id", e.value[0]);
                              setToUser(e.value);
                            }}
                          >
                            <Select.HiddenSelect />
                            <Select.Control>
                              <Select.Trigger>
                                <Select.ValueText placeholder="Select TA" />
                              </Select.Trigger>
                              <Select.IndicatorGroup>
                                <Select.Indicator />
                              </Select.IndicatorGroup>
                            </Select.Control>
                            <Select.Positioner>
                              <Select.Content>
                                {inFrameWork?.items?.map((user) => (
                                  <Select.Item
                                    key={user.value}
                                    item={user.value}
                                  >
                                    {user.label}
                                    <Select.ItemIndicator />
                                  </Select.Item>
                                ))}
                              </Select.Content>
                            </Select.Positioner>
                          </Select.Root>
                        </Field.Root>
                        <Field.Root required>
                          <Field.RequiredIndicator />
                          <Field.Label>Shift to swap</Field.Label>
                          <Select.Root
                            collection={usersShiftsFrameWork}
                            value={fromShift}
                            onValueChange={(e) => {
                              setValue("from_shift_id", e.value[0]);
                              setFromShift(e.value);
                            }}
                          >
                            <Select.HiddenSelect />
                            <Select.Control>
                              <Select.Trigger>
                                <Select.ValueText placeholder="Select shift" />
                              </Select.Trigger>
                              <Select.IndicatorGroup>
                                <Select.Indicator />
                              </Select.IndicatorGroup>
                            </Select.Control>
                            <Select.Positioner>
                              <Select.Content>
                                {usersShiftsFrameWork?.items?.map((shift) => (
                                  <Select.Item
                                    key={shift.value}
                                    item={shift.value}
                                  >
                                    {shift.label}
                                    <Select.ItemIndicator />
                                  </Select.Item>
                                ))}
                              </Select.Content>
                            </Select.Positioner>
                          </Select.Root>
                        </Field.Root>
                      </Fieldset.Content>
                    </Fieldset.Root>
                  </Dialog.Body>
                  <Dialog.Footer>
                    <Button type="submit">Submit Swap Request</Button>
                  </Dialog.Footer>
                </form>
                <Dialog.CloseTrigger asChild>
                  <CloseButton />
                </Dialog.CloseTrigger>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
      )}
    </Stack>
  );
}

export { TACardSideBar };
