import * as React from "react";
import { Fragment, useEffect, useRef, useState, useCallback } from "react";
import {
  ButtonComponent,
  CheckBoxComponent,
} from "@syncfusion/ej2-react-buttons";
import { TimePickerComponent } from "@syncfusion/ej2-react-calendars";
import {
  DropDownListComponent,
  MultiSelectComponent,
  CheckBoxSelection,
} from "@syncfusion/ej2-react-dropdowns";
import { UploaderComponent } from "@syncfusion/ej2-react-inputs";
import {
  ToolbarComponent,
  ItemsDirective,
  ItemDirective,
  ContextMenuComponent,
  AppBarComponent,
} from "@syncfusion/ej2-react-navigations";
import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Year,
  TimelineViews,
  TimelineMonth,
  TimelineYear,
  ViewsDirective,
  ViewDirective,
  ResourcesDirective,
  ResourceDirective,
  Inject,
  Resize,
  DragAndDrop,
  Agenda,
  Print,
  ExcelExport,
  ICalendarImport,
  ICalendarExport,
  Timezone,
} from "@syncfusion/ej2-react-schedule";
import { DropDownButtonComponent } from "@syncfusion/ej2-react-splitbuttons";
import {
  addClass,
  Browser,
  closest,
  extend,
  Internationalization,
  isNullOrUndefined,
  removeClass,
  remove,
  compile,
} from "@syncfusion/ej2-base";
import { DataManager, Predicate, Query } from "@syncfusion/ej2-data";
import { tz } from "moment-timezone";
import "./css/overview.css";
import { useQuery } from "@tanstack/react-query";
import DefaultApi from "./client/src/api/DefaultApi";

const weekDays = [
  { text: "Sunday", value: 0 },
  { text: "Monday", value: 1 },
  { text: "Tuesday", value: 2 },
  { text: "Wednesday", value: 3 },
  { text: "Thursday", value: 4 },
  { text: "Friday", value: 5 },
  { text: "Saturday", value: 6 },
];
const api = new DefaultApi();

const setTimeOnDate = (date, timeStr) => {
  const [hours, minutes, seconds] = timeStr.split(":").map(Number);
  const utcDate = new Date(date);
  utcDate.setUTCHours(hours, minutes, seconds || 0, 0);

  // Convert UTC to local time by adding the timezone offset
  const localDate = new Date(
    utcDate.getTime() + utcDate.getTimezoneOffset() * 60000
  );
  return localDate;
};

// React Query hook
export const useShifts = () => {
  return useQuery({
    queryKey: ["shifts"],
    queryFn: async () => {
      const data = await fetchAllShifts();
      return data.map((shift) => ({
        Id: shift.id,
        Subject: `Shift for ${shift.schedule?.educator?.name || "Unknown"}`,
        StartTime: setTimeOnDate(shift.date, shift.start_time),
        EndTime: setTimeOnDate(shift.date, shift.end_time),
        IsAllDay: false,
        Description: `Max TAs: ${shift.max_ta}, Max Students: ${shift.max_students}`,
        CalendarId: 1,
      }));
    },
    placeholderData: [],
  });
};

const processEvents = (events) => {
  let timezone = new Timezone();
  let currentTimezone = timezone.getLocalTimezoneName();
  return events.map((event) => ({
    ...event,
    StartTime: timezone.convert(event.StartTime, "UTC", currentTimezone),
    EndTime: timezone.convert(event.EndTime, "UTC", currentTimezone),
  }));
};

// Fetch all users (TAs and Educators)
const fetchUsers = async () => {
  return new Promise((resolve, reject) => {
    api.backendSchedApiViewsListTas((error, data) => {
      if (error) {
        console.error("Error fetching users:", error);
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
};

// Fetch all educators
const fetchEducators = async () => {
  return new Promise((resolve, reject) => {
    api.backendSchedApiViewsListEducators((error, data) => {
      if (error) {
        console.error("Error fetching educators:", error);
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
};

// React Query hooks for TAs and educators
export const useTAs = () => {
  return useQuery({
    queryKey: ["tas"],
    queryFn: fetchUsers, // Fetch TAs
    placeholderData: [],
  });
};

export const useEducators = () => {
  return useQuery({
    queryKey: ["educators"],
    queryFn: fetchEducators,
    placeholderData: [],
  });
};

const calendarCollections = [
  { CalendarId: 1, CalendarText: "Default Calendar", CalendarColor: "#1aaa55" },
];

// Fetch shifts for a specific user
const fetchUserShifts = async (userId) => {
  return new Promise((resolve, reject) => {
    api.backendSchedApiViewsListUserShifts(userId, (error, data) => {
      if (error) {
        console.error(`Error fetching shifts for user ${userId}:`, error);
        reject(error);
      } else {
        console.log(`Fetched shifts for user ${userId}:`, data);
        resolve(data);
      }
    });
  });
};

const Overview = () => {
  console.log("Overview component rendered");

  const [selectedUsers, setSelectedUsers] = useState([]); // Array to store selected user IDs
  const [events, setEvents] = useState([]); // Array to store events for the schedule
  const [currentView, setCurrentView] = useState("Week"); // Initialize currentView with "Week"
  const [userType, setUserType] = useState("TAs"); // State to toggle between TAs and Educators

  const { data: tas, isLoading: tasLoading } = useTAs();
  const { data: educators, isLoading: educatorsLoading } = useEducators();

  // Filter out events with invalid StartTime or EndTime
  const validEvents = events.filter(
    (event) => event.StartTime && event.EndTime
  );

  console.log("Valid events being passed to ScheduleComponent:", validEvents);

  // Map day_of_week to iCalendar BYDAY values
  const dayOfWeekMap = {
    Monday: "MO",
    Tuesday: "TU",
    Wednesday: "WE",
    Thursday: "TH",
    Friday: "FR",
    Saturday: "SA",
    Sunday: "SU",
  };

  // Fetch shifts for a specific user and add them to the events array
  const fetchAndAddUserShifts = async (userId) => {
    console.log(`Fetching shifts for user ID: ${userId}`);
    try {
      const shifts = await fetchUserShifts(userId);
      console.log(`Fetched shifts for user ID ${userId}:`, shifts);
      const newEvents = shifts.map((shift) => ({
        Id: shift.id,
        Subject: `${shift.schedule?.subject?.name || "Unknown Subject"}`,
        StartTime: setTimeOnDate(shift.date, shift.start_time),
        EndTime: setTimeOnDate(shift.date, shift.end_time),
        IsAllDay: false,
        Description: `${
          shift.schedule?.subject?.name || "Unknown Subject"
        } for ${shift.schedule?.educator?.name || "Unknown TA"}`,
        userId: userId, // Store userId as a number for consistency
        CalendarId: 1,
        RecurrenceRule: `FREQ=WEEKLY;BYDAY=${dayOfWeekMap[shift.day_of_week]}`, // Dynamically set recurrence rule
      }));
      setEvents((prevEvents) => [...prevEvents, ...newEvents]);
      console.log(
        `Updated events after adding shifts for user ID ${userId}:`,
        newEvents
      );
    } catch (error) {
      console.error(`Error fetching shifts for user ${userId}:`, error);
    }
  };

  const handleUserTypeChange = (e) => {
    setUserType(e.value); // Update the user type based on dropdown selection
    setSelectedUsers([]); // Reset selected users when user type changes
  };

  const handleUserSelection = (userId, isSelected) => {
    console.log(
      `User selection changed: userId=${userId}, isSelected=${isSelected}`
    );
    if (isSelected) {
      setSelectedUsers((prev) => [...prev, userId]);
      fetchAndAddUserShifts(userId); // Fetch and add shifts for the selected user
    } else {
      setSelectedUsers((prev) => prev.filter((id) => id !== userId));
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event.userId !== userId)
      ); // Match userId as a number
      console.log(`Removed events for user ID ${userId}`);
    }
  };

  const userList = userType === "TAs" ? tas : educators; // Dynamically select the list based on userType
  const isLoading = userType === "TAs" ? tasLoading : educatorsLoading;

  const scheduleObj = useRef(null);

  const dateHeaderTemplate = (props) => {
    const intl = new Internationalization();
    const dayName = intl.formatDate(props.date, {
      type: "date",
      format: "EEEE",
    });
    const dayNumber = intl.formatDate(props.date, {
      type: "date",
      format: "d",
    });
    return (
      <Fragment>
        <div style={{ fontWeight: "bold" }}>{dayName}</div>{" "}
        {/* Day of the week */}
        <div>{dayNumber}</div> {/* Day of the month */}
      </Fragment>
    );
  };

  return (
    <div className="schedule-control-section">
      <div style={{ marginBottom: "20px", padding: "10px" }}>
        <h3>Filter Shifts</h3>
        <div style={{ marginBottom: "10px", textAlign: "center" }}>
          <DropDownListComponent
            id="userTypeDropdown"
            dataSource={["TAs", "Educators"]}
            value={userType}
            change={handleUserTypeChange}
            placeholder="Select User Type"
            cssClass="custom-dropdown"
          />
        </div>
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {isLoading ? (
            <p>Loading {userType}...</p>
          ) : (
            userList &&
            userList.map((user) => (
              <div
                key={user.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  padding: "5px 10px",
                  backgroundColor: "#f9f9f9",
                  borderRadius: "4px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user.id)}
                  onChange={(e) =>
                    handleUserSelection(user.id, e.target.checked)
                  }
                  className="custom-checkbox"
                />
                <span>{user.name || user.username}</span>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="col-lg-12 control-section">
        <div className="content-wrapper">
          <div className="schedule-overview">
            <div className="overview-content">
              <div className="left-panel">
                <div className="overview-scheduler">
                  <ScheduleComponent
                    id="scheduler"
                    cssClass="schedule-overview"
                    ref={scheduleObj}
                    width="100%"
                    height="100%"
                    currentView={currentView}
                    group={{ resources: ["Calendars"] }}
                    timezone={Intl.DateTimeFormat().resolvedOptions().timeZone}
                    eventSettings={{ dataSource: validEvents }}
                    dateHeaderTemplate={dateHeaderTemplate}
                    showTimeIndicator={true}
                  >
                    <ResourcesDirective>
                      <ResourceDirective
                        field="CalendarId"
                        title="Calendars"
                        name="Calendars"
                        dataSource={calendarCollections}
                        query={new Query().where("CalendarId", "equal", 1)}
                        textField="CalendarText"
                        idField="CalendarId"
                        colorField="CalendarColor"
                      />
                    </ResourcesDirective>
                    <ViewsDirective>
                      <ViewDirective option="Day" />
                      <ViewDirective option="Week" />
                      <ViewDirective option="WorkWeek" />
                      <ViewDirective option="Month" />
                      <ViewDirective option="Year" />
                      <ViewDirective option="Agenda" />
                      <ViewDirective option="TimelineDay" />
                      <ViewDirective option="TimelineWeek" />
                      <ViewDirective option="TimelineWorkWeek" />
                      <ViewDirective option="TimelineMonth" />
                      <ViewDirective option="TimelineYear" />
                    </ViewsDirective>
                    <Inject
                      services={[
                        Day,
                        Week,
                        WorkWeek,
                        Month,
                        Year,
                        Agenda,
                        TimelineViews,
                        TimelineMonth,
                        TimelineYear,
                        DragAndDrop,
                        Resize,
                        Print,
                        ExcelExport,
                        ICalendarImport,
                        ICalendarExport,
                      ]}
                    />
                  </ScheduleComponent>
                </div>
                <div className="col-right">
                  <DropDownListComponent
                    id="weekFirstDay"
                    dataSource={weekDays}
                    fields={{ text: "text", value: "value" }}
                    value={0}
                    popupHeight={400}
                    change={(args) => {
                      scheduleObj.current.firstDayOfWeek = args.value;
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
