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

const api = new DefaultApi();

// get all subject IDs
const fetchAllSubjectIds = async () => {
  return new Promise((resolve, reject) => {
    api.backendSchedApiViewsListSubjects((error, data) => {
      if (error) {
        console.error("Error fetching subjects:", error);
        reject(error);
      } else {
        console.log("Raw subject data:", data);
        const ids = data.map((s) => s.id);
        console.log("Extracted subject IDs:", ids);
        resolve(ids);
      }
    });
  });
};


// fetch TA shifts for a given subject ID
const fetchShiftsForSubject = async (subjectId) => {
  return new Promise((resolve, reject) => {
    api.backendSchedApiViewsListTaShifts(subjectId, (error, data) => {
      if (error) {
        console.error(`Error fetching shifts for subject ${subjectId}`, error);
        resolve([]); // fail
      } else {
        resolve(data);
      }
    });
  });
};

// Main fetcher: get all shifts by looping through subject IDs
const fetchAllShifts = async () => {
  console.log('reached fetchAllShifts')
  const subjectIds = await fetchAllSubjectIds();
  const allShifts = [];

  console.log('About to enter subjectId loop')
  console.log(subjectIds)
  for (const subjectId of subjectIds) {
    console.log('About to await shifts')
    const shifts = await fetchShiftsForSubject(subjectId);
    console.log(`Shifts for subject ${subjectId}:`, shifts);
    allShifts.push(...shifts);
  }

  return allShifts;
};


const setTimeOnDate = (date, timeStr) => {
  if (!date || !timeStr) return null;
  const [hours, minutes, seconds] = timeStr.split(":").map(Number);
  const utcDate = new Date(date);
  utcDate.setUTCHours(hours, minutes, seconds || 0, 0);

  // Convert UTC to local time by adding the timezone offset
  const localDate = new Date(utcDate.getTime() + utcDate.getTimezoneOffset() * 60000);
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
    api.backendSchedApiViewsListUsers((error, data) => {
      if (error) {
        console.error("Error fetching users:", error);
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
};

// Fetch shifts for a specific user
const fetchUserShifts = async (userId) => {
  return new Promise((resolve, reject) => {
    api.backendSchedApiViewsListUserShifts(userId, (error, data) => {
      if (error) {
        console.error(`Error fetching shifts for user ${userId}:`, error);
        resolve([]);
      } else {
        resolve(data);
      }
    });
  });
};

const calendarCollections = [
  { CalendarId: 1, CalendarText: "Default Calendar", CalendarColor: "#1aaa55" },
];

const Overview = () => {
  console.log("Overview component rendered");

  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const [selectedUser, setSelectedUser] = useState(null);
  const [currentView, setCurrentView] = useState("Week");

  const { data: userShifts, isLoading: shiftsLoading } = useQuery({
    queryKey: ["userShifts", selectedUser],
    queryFn: () => fetchUserShifts(selectedUser),
    enabled: !!selectedUser,
  });

  const handleUserClick = (userId) => {
    setSelectedUser(userId);
  };

  const processedShifts = userShifts?.map((shift) => ({
    Id: shift.id,
    Subject: `Shift for ${shift.schedule?.educator?.name || "Unknown"}`,
    StartTime: setTimeOnDate(shift.date, shift.start_time),
    EndTime: setTimeOnDate(shift.date, shift.end_time),
    IsAllDay: false,
    Description: `Max TAs: ${shift.max_ta}, Max Students: ${shift.max_students}`,
    CalendarId: 1,
  })) || [];

  const scheduleObj = useRef(null);

  const dateHeaderTemplate = (date) => {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    const intl = new Internationalization();
    return intl.formatDate(date, { skeleton: "Ed" });
  };

  return (
    <div className="schedule-control-section">
      <div style={{ marginBottom: "20px", padding: "10px" }}>
        <h3>Select a User</h3>
        {usersLoading ? (
          <p>Loading users...</p>
        ) : (
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {console.log("Fetched users:", users)} {/* log for debugging */}
            {users?.map((user) => (
              <button
                key={user.id}
                onClick={() => handleUserClick(user.id)}
                style={{ padding: "10px 20px", cursor: "pointer" }}
              >
                {user.name || user.username}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="col-lg-12 control-section">
        <div className="content-wrapper">
          <div className="overview-scheduler">
            <ScheduleComponent
              id="scheduler"
              cssClass="schedule-overview"
              ref={scheduleObj}
              width="100%"
              height="100%"
              currentView={currentView}
              group={{ resources: ["Calendars"] }}
              timezone="UTC"
              eventSettings={{ dataSource: processedShifts }}
              dateHeaderTemplate={dateHeaderTemplate}
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
        </div>
      </div>
    </div>
  );
};

export default Overview;