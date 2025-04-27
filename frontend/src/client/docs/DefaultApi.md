# SchedApi.DefaultApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**backendSchedApiViewsAddGroup**](DefaultApi.md#backendSchedApiViewsAddGroup) | **PUT** /sched_api/add_group/{group_id} | Add Group
[**backendSchedApiViewsAddStudentToShift**](DefaultApi.md#backendSchedApiViewsAddStudentToShift) | **PUT** /sched_api/add_student_to_shift/{shift_id} | Add Student To Shift
[**backendSchedApiViewsAddTaToShift**](DefaultApi.md#backendSchedApiViewsAddTaToShift) | **PUT** /sched_api/add_ta_to_shift/{shift_id} | Add Ta To Shift
[**backendSchedApiViewsAnswerQuestion**](DefaultApi.md#backendSchedApiViewsAnswerQuestion) | **PUT** /sched_api/answer_question/{question_id} | Answer Question
[**backendSchedApiViewsCommentQuestion**](DefaultApi.md#backendSchedApiViewsCommentQuestion) | **PUT** /sched_api/comment/{question_id} | Comment Question
[**backendSchedApiViewsCreateQuestion**](DefaultApi.md#backendSchedApiViewsCreateQuestion) | **POST** /sched_api/question/{subject_id} | Create Question
[**backendSchedApiViewsCreateSchedule**](DefaultApi.md#backendSchedApiViewsCreateSchedule) | **POST** /sched_api/schedule/{subject_id} | Create Schedule
[**backendSchedApiViewsCreateSubject**](DefaultApi.md#backendSchedApiViewsCreateSubject) | **POST** /sched_api/subject/{is_ta_hours} | Create Subject
[**backendSchedApiViewsCreateSwapRequest**](DefaultApi.md#backendSchedApiViewsCreateSwapRequest) | **POST** /sched_api/create_swap_request | Create Swap Request
[**backendSchedApiViewsCreateTaShift**](DefaultApi.md#backendSchedApiViewsCreateTaShift) | **POST** /sched_api/ta_shift/{schedule_id} | Create Ta Shift
[**backendSchedApiViewsDeleteSchedule**](DefaultApi.md#backendSchedApiViewsDeleteSchedule) | **DELETE** /sched_api/delete_schedule/{schedule_id} | Delete Schedule
[**backendSchedApiViewsDeleteSubject**](DefaultApi.md#backendSchedApiViewsDeleteSubject) | **DELETE** /sched_api/delete_subject/{subject_id} | Delete Subject
[**backendSchedApiViewsGetUserGroup**](DefaultApi.md#backendSchedApiViewsGetUserGroup) | **GET** /sched_api/user_group | Get User Group
[**backendSchedApiViewsHandleSwapRequest**](DefaultApi.md#backendSchedApiViewsHandleSwapRequest) | **DELETE** /sched_api/handle_swap_request/{swap_request_id}/{accepted} | Handle Swap Request
[**backendSchedApiViewsListComments**](DefaultApi.md#backendSchedApiViewsListComments) | **GET** /sched_api/comments/{question_id} | List Comments
[**backendSchedApiViewsListEducatorSchedules**](DefaultApi.md#backendSchedApiViewsListEducatorSchedules) | **GET** /sched_api/educator_schedules | List Educator Schedules
[**backendSchedApiViewsListGroups**](DefaultApi.md#backendSchedApiViewsListGroups) | **GET** /sched_api/groups | List Groups
[**backendSchedApiViewsListIncomingSwapRequests**](DefaultApi.md#backendSchedApiViewsListIncomingSwapRequests) | **GET** /sched_api/incoming_swap_requests | List Incoming Swap Requests
[**backendSchedApiViewsListOutgoingSwapRequests**](DefaultApi.md#backendSchedApiViewsListOutgoingSwapRequests) | **GET** /sched_api/outgoing_swap_requests | List Outgoing Swap Requests
[**backendSchedApiViewsListQuestions**](DefaultApi.md#backendSchedApiViewsListQuestions) | **GET** /sched_api/questions/{subject_id} | List Questions
[**backendSchedApiViewsListScheduleTaShifts**](DefaultApi.md#backendSchedApiViewsListScheduleTaShifts) | **GET** /sched_api/schedule_ta_shifts/{schedule_id} | List Schedule Ta Shifts
[**backendSchedApiViewsListSchedules**](DefaultApi.md#backendSchedApiViewsListSchedules) | **GET** /sched_api/schedules/{subject_id} | List Schedules
[**backendSchedApiViewsListSchools**](DefaultApi.md#backendSchedApiViewsListSchools) | **GET** /sched_api/schools | List Schools
[**backendSchedApiViewsListSchoolsPaginated**](DefaultApi.md#backendSchedApiViewsListSchoolsPaginated) | **GET** /sched_api/schools_paginated | List Schools Paginated
[**backendSchedApiViewsListShiftStudents**](DefaultApi.md#backendSchedApiViewsListShiftStudents) | **GET** /sched_api/shift_students/{shift_id} | List Shift Students
[**backendSchedApiViewsListShiftTas**](DefaultApi.md#backendSchedApiViewsListShiftTas) | **GET** /sched_api/shift_tas/{shift_id} | List Shift Tas
[**backendSchedApiViewsListSubjects**](DefaultApi.md#backendSchedApiViewsListSubjects) | **GET** /sched_api/subjects | List Subjects
[**backendSchedApiViewsListTaHourSchedule**](DefaultApi.md#backendSchedApiViewsListTaHourSchedule) | **GET** /sched_api/ta_hour_schedule | List Ta Hour Schedule
[**backendSchedApiViewsListTaHourShift**](DefaultApi.md#backendSchedApiViewsListTaHourShift) | **GET** /sched_api/ta_hour_shift | List Ta Hour Shift
[**backendSchedApiViewsListTaShifts**](DefaultApi.md#backendSchedApiViewsListTaShifts) | **GET** /sched_api/ta_shifts/{subject_id} | List Ta Shifts
[**backendSchedApiViewsRemoveStudentFromShift**](DefaultApi.md#backendSchedApiViewsRemoveStudentFromShift) | **PUT** /sched_api/remove_student_from_shift/{shift_id} | Remove Student From Shift
[**backendSchedApiViewsRemoveTaFromShift**](DefaultApi.md#backendSchedApiViewsRemoveTaFromShift) | **PUT** /sched_api/remove_ta_from_shift/{shift_id} | Remove Ta From Shift
[**backendSchedApiViewsUnanswerQuestion**](DefaultApi.md#backendSchedApiViewsUnanswerQuestion) | **PUT** /sched_api/unanswer_question/{question_id} | Unanswer Question
[**backendSchedApiViewsUpdateSubject**](DefaultApi.md#backendSchedApiViewsUpdateSubject) | **PUT** /sched_api/update_subject/{subject_id} | Update Subject



## backendSchedApiViewsAddGroup

> UserSchema backendSchedApiViewsAddGroup(groupId)

Add Group

### Example

```javascript
import SchedApi from 'sched_api';

let apiInstance = new SchedApi.DefaultApi();
let groupId = 56; // Number | 
apiInstance.backendSchedApiViewsAddGroup(groupId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **groupId** | **Number**|  | 

### Return type

[**UserSchema**](UserSchema.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## backendSchedApiViewsAddStudentToShift

> ShiftSchema backendSchedApiViewsAddStudentToShift(shiftId)

Add Student To Shift

### Example

```javascript
import SchedApi from 'sched_api';

let apiInstance = new SchedApi.DefaultApi();
let shiftId = "shiftId_example"; // String | 
apiInstance.backendSchedApiViewsAddStudentToShift(shiftId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **shiftId** | **String**|  | 

### Return type

[**ShiftSchema**](ShiftSchema.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## backendSchedApiViewsAddTaToShift

> ShiftSchema backendSchedApiViewsAddTaToShift(shiftId)

Add Ta To Shift

### Example

```javascript
import SchedApi from 'sched_api';

let apiInstance = new SchedApi.DefaultApi();
let shiftId = "shiftId_example"; // String | 
apiInstance.backendSchedApiViewsAddTaToShift(shiftId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **shiftId** | **String**|  | 

### Return type

[**ShiftSchema**](ShiftSchema.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## backendSchedApiViewsAnswerQuestion

> QuestionSchema backendSchedApiViewsAnswerQuestion(questionId)

Answer Question

### Example

```javascript
import SchedApi from 'sched_api';

let apiInstance = new SchedApi.DefaultApi();
let questionId = "questionId_example"; // String | 
apiInstance.backendSchedApiViewsAnswerQuestion(questionId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **questionId** | **String**|  | 

### Return type

[**QuestionSchema**](QuestionSchema.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## backendSchedApiViewsCommentQuestion

> CommentSchema backendSchedApiViewsCommentQuestion(questionId, commentCreateSchema)

Comment Question

### Example

```javascript
import SchedApi from 'sched_api';

let apiInstance = new SchedApi.DefaultApi();
let questionId = "questionId_example"; // String | 
let commentCreateSchema = new SchedApi.CommentCreateSchema(); // CommentCreateSchema | 
apiInstance.backendSchedApiViewsCommentQuestion(questionId, commentCreateSchema, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **questionId** | **String**|  | 
 **commentCreateSchema** | [**CommentCreateSchema**](CommentCreateSchema.md)|  | 

### Return type

[**CommentSchema**](CommentSchema.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## backendSchedApiViewsCreateQuestion

> QuestionSchema backendSchedApiViewsCreateQuestion(subjectId, questionCreateSchema)

Create Question

### Example

```javascript
import SchedApi from 'sched_api';

let apiInstance = new SchedApi.DefaultApi();
let subjectId = "subjectId_example"; // String | 
let questionCreateSchema = new SchedApi.QuestionCreateSchema(); // QuestionCreateSchema | 
apiInstance.backendSchedApiViewsCreateQuestion(subjectId, questionCreateSchema, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **subjectId** | **String**|  | 
 **questionCreateSchema** | [**QuestionCreateSchema**](QuestionCreateSchema.md)|  | 

### Return type

[**QuestionSchema**](QuestionSchema.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## backendSchedApiViewsCreateSchedule

> ScheduleSchema backendSchedApiViewsCreateSchedule(subjectId)

Create Schedule

### Example

```javascript
import SchedApi from 'sched_api';

let apiInstance = new SchedApi.DefaultApi();
let subjectId = "subjectId_example"; // String | 
apiInstance.backendSchedApiViewsCreateSchedule(subjectId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **subjectId** | **String**|  | 

### Return type

[**ScheduleSchema**](ScheduleSchema.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## backendSchedApiViewsCreateSubject

> SubjectSchema backendSchedApiViewsCreateSubject(isTaHours, subjectCreateSchema)

Create Subject

### Example

```javascript
import SchedApi from 'sched_api';

let apiInstance = new SchedApi.DefaultApi();
let isTaHours = true; // Boolean | 
let subjectCreateSchema = new SchedApi.SubjectCreateSchema(); // SubjectCreateSchema | 
apiInstance.backendSchedApiViewsCreateSubject(isTaHours, subjectCreateSchema, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **isTaHours** | **Boolean**|  | 
 **subjectCreateSchema** | [**SubjectCreateSchema**](SubjectCreateSchema.md)|  | 

### Return type

[**SubjectSchema**](SubjectSchema.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## backendSchedApiViewsCreateSwapRequest

> SwapRequestSchema backendSchedApiViewsCreateSwapRequest(fromShiftId, toShiftId, toUserId)

Create Swap Request

### Example

```javascript
import SchedApi from 'sched_api';

let apiInstance = new SchedApi.DefaultApi();
let fromShiftId = "fromShiftId_example"; // String | 
let toShiftId = "toShiftId_example"; // String | 
let toUserId = "toUserId_example"; // String | 
apiInstance.backendSchedApiViewsCreateSwapRequest(fromShiftId, toShiftId, toUserId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **fromShiftId** | **String**|  | 
 **toShiftId** | **String**|  | 
 **toUserId** | **String**|  | 

### Return type

[**SwapRequestSchema**](SwapRequestSchema.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## backendSchedApiViewsCreateTaShift

> ShiftSchema backendSchedApiViewsCreateTaShift(scheduleId, shiftSchemaCreate)

Create Ta Shift

### Example

```javascript
import SchedApi from 'sched_api';

let apiInstance = new SchedApi.DefaultApi();
let scheduleId = "scheduleId_example"; // String | 
let shiftSchemaCreate = new SchedApi.ShiftSchemaCreate(); // ShiftSchemaCreate | 
apiInstance.backendSchedApiViewsCreateTaShift(scheduleId, shiftSchemaCreate, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **scheduleId** | **String**|  | 
 **shiftSchemaCreate** | [**ShiftSchemaCreate**](ShiftSchemaCreate.md)|  | 

### Return type

[**ShiftSchema**](ShiftSchema.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## backendSchedApiViewsDeleteSchedule

> Success backendSchedApiViewsDeleteSchedule(scheduleId)

Delete Schedule

### Example

```javascript
import SchedApi from 'sched_api';

let apiInstance = new SchedApi.DefaultApi();
let scheduleId = "scheduleId_example"; // String | 
apiInstance.backendSchedApiViewsDeleteSchedule(scheduleId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **scheduleId** | **String**|  | 

### Return type

[**Success**](Success.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## backendSchedApiViewsDeleteSubject

> Success backendSchedApiViewsDeleteSubject(subjectId)

Delete Subject

### Example

```javascript
import SchedApi from 'sched_api';

let apiInstance = new SchedApi.DefaultApi();
let subjectId = "subjectId_example"; // String | 
apiInstance.backendSchedApiViewsDeleteSubject(subjectId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **subjectId** | **String**|  | 

### Return type

[**Success**](Success.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## backendSchedApiViewsGetUserGroup

> GroupSchema backendSchedApiViewsGetUserGroup()

Get User Group

### Example

```javascript
import SchedApi from 'sched_api';

let apiInstance = new SchedApi.DefaultApi();
apiInstance.backendSchedApiViewsGetUserGroup((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**GroupSchema**](GroupSchema.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## backendSchedApiViewsHandleSwapRequest

> Success backendSchedApiViewsHandleSwapRequest(swapRequestId, accepted)

Handle Swap Request

### Example

```javascript
import SchedApi from 'sched_api';

let apiInstance = new SchedApi.DefaultApi();
let swapRequestId = "swapRequestId_example"; // String | 
let accepted = true; // Boolean | 
apiInstance.backendSchedApiViewsHandleSwapRequest(swapRequestId, accepted, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **swapRequestId** | **String**|  | 
 **accepted** | **Boolean**|  | 

### Return type

[**Success**](Success.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## backendSchedApiViewsListComments

> [CommentSchema] backendSchedApiViewsListComments(questionId)

List Comments

### Example

```javascript
import SchedApi from 'sched_api';

let apiInstance = new SchedApi.DefaultApi();
let questionId = "questionId_example"; // String | 
apiInstance.backendSchedApiViewsListComments(questionId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **questionId** | **String**|  | 

### Return type

[**[CommentSchema]**](CommentSchema.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## backendSchedApiViewsListEducatorSchedules

> [ScheduleSchema] backendSchedApiViewsListEducatorSchedules()

List Educator Schedules

### Example

```javascript
import SchedApi from 'sched_api';

let apiInstance = new SchedApi.DefaultApi();
apiInstance.backendSchedApiViewsListEducatorSchedules((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**[ScheduleSchema]**](ScheduleSchema.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## backendSchedApiViewsListGroups

> [GroupSchema] backendSchedApiViewsListGroups()

List Groups

### Example

```javascript
import SchedApi from 'sched_api';

let apiInstance = new SchedApi.DefaultApi();
apiInstance.backendSchedApiViewsListGroups((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**[GroupSchema]**](GroupSchema.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## backendSchedApiViewsListIncomingSwapRequests

> [SwapRequestSchema] backendSchedApiViewsListIncomingSwapRequests()

List Incoming Swap Requests

### Example

```javascript
import SchedApi from 'sched_api';

let apiInstance = new SchedApi.DefaultApi();
apiInstance.backendSchedApiViewsListIncomingSwapRequests((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**[SwapRequestSchema]**](SwapRequestSchema.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## backendSchedApiViewsListOutgoingSwapRequests

> [SwapRequestSchema] backendSchedApiViewsListOutgoingSwapRequests()

List Outgoing Swap Requests

### Example

```javascript
import SchedApi from 'sched_api';

let apiInstance = new SchedApi.DefaultApi();
apiInstance.backendSchedApiViewsListOutgoingSwapRequests((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**[SwapRequestSchema]**](SwapRequestSchema.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## backendSchedApiViewsListQuestions

> [QuestionSchema] backendSchedApiViewsListQuestions(subjectId)

List Questions

### Example

```javascript
import SchedApi from 'sched_api';

let apiInstance = new SchedApi.DefaultApi();
let subjectId = "subjectId_example"; // String | 
apiInstance.backendSchedApiViewsListQuestions(subjectId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **subjectId** | **String**|  | 

### Return type

[**[QuestionSchema]**](QuestionSchema.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## backendSchedApiViewsListScheduleTaShifts

> [ShiftSchema] backendSchedApiViewsListScheduleTaShifts(scheduleId)

List Schedule Ta Shifts

### Example

```javascript
import SchedApi from 'sched_api';

let apiInstance = new SchedApi.DefaultApi();
let scheduleId = "scheduleId_example"; // String | 
apiInstance.backendSchedApiViewsListScheduleTaShifts(scheduleId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **scheduleId** | **String**|  | 

### Return type

[**[ShiftSchema]**](ShiftSchema.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## backendSchedApiViewsListSchedules

> [ScheduleSchema] backendSchedApiViewsListSchedules(subjectId)

List Schedules

### Example

```javascript
import SchedApi from 'sched_api';

let apiInstance = new SchedApi.DefaultApi();
let subjectId = "subjectId_example"; // String | 
apiInstance.backendSchedApiViewsListSchedules(subjectId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **subjectId** | **String**|  | 

### Return type

[**[ScheduleSchema]**](ScheduleSchema.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## backendSchedApiViewsListSchools

> [SchoolSchema] backendSchedApiViewsListSchools()

List Schools

### Example

```javascript
import SchedApi from 'sched_api';

let apiInstance = new SchedApi.DefaultApi();
apiInstance.backendSchedApiViewsListSchools((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**[SchoolSchema]**](SchoolSchema.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## backendSchedApiViewsListSchoolsPaginated

> [SchoolSchema] backendSchedApiViewsListSchoolsPaginated(opts)

List Schools Paginated

### Example

```javascript
import SchedApi from 'sched_api';

let apiInstance = new SchedApi.DefaultApi();
let opts = {
  'page': 1, // Number | 
  'pageSize': 10 // Number | 
};
apiInstance.backendSchedApiViewsListSchoolsPaginated(opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **page** | **Number**|  | [optional] [default to 1]
 **pageSize** | **Number**|  | [optional] [default to 10]

### Return type

[**[SchoolSchema]**](SchoolSchema.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## backendSchedApiViewsListShiftStudents

> [UserSchema] backendSchedApiViewsListShiftStudents(shiftId)

List Shift Students

### Example

```javascript
import SchedApi from 'sched_api';

let apiInstance = new SchedApi.DefaultApi();
let shiftId = "shiftId_example"; // String | 
apiInstance.backendSchedApiViewsListShiftStudents(shiftId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **shiftId** | **String**|  | 

### Return type

[**[UserSchema]**](UserSchema.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## backendSchedApiViewsListShiftTas

> [UserSchema] backendSchedApiViewsListShiftTas(shiftId)

List Shift Tas

### Example

```javascript
import SchedApi from 'sched_api';

let apiInstance = new SchedApi.DefaultApi();
let shiftId = "shiftId_example"; // String | 
apiInstance.backendSchedApiViewsListShiftTas(shiftId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **shiftId** | **String**|  | 

### Return type

[**[UserSchema]**](UserSchema.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## backendSchedApiViewsListSubjects

> [SubjectSchema] backendSchedApiViewsListSubjects()

List Subjects

### Example

```javascript
import SchedApi from 'sched_api';

let apiInstance = new SchedApi.DefaultApi();
apiInstance.backendSchedApiViewsListSubjects((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**[SubjectSchema]**](SubjectSchema.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## backendSchedApiViewsListTaHourSchedule

> ScheduleSchema backendSchedApiViewsListTaHourSchedule()

List Ta Hour Schedule

### Example

```javascript
import SchedApi from 'sched_api';

let apiInstance = new SchedApi.DefaultApi();
apiInstance.backendSchedApiViewsListTaHourSchedule((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**ScheduleSchema**](ScheduleSchema.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## backendSchedApiViewsListTaHourShift

> [ShiftSchema] backendSchedApiViewsListTaHourShift()

List Ta Hour Shift

### Example

```javascript
import SchedApi from 'sched_api';

let apiInstance = new SchedApi.DefaultApi();
apiInstance.backendSchedApiViewsListTaHourShift((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**[ShiftSchema]**](ShiftSchema.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## backendSchedApiViewsListTaShifts

> [ShiftSchema] backendSchedApiViewsListTaShifts(subjectId)

List Ta Shifts

### Example

```javascript
import SchedApi from 'sched_api';

let apiInstance = new SchedApi.DefaultApi();
let subjectId = "subjectId_example"; // String | 
apiInstance.backendSchedApiViewsListTaShifts(subjectId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **subjectId** | **String**|  | 

### Return type

[**[ShiftSchema]**](ShiftSchema.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## backendSchedApiViewsRemoveStudentFromShift

> ShiftSchema backendSchedApiViewsRemoveStudentFromShift(shiftId)

Remove Student From Shift

### Example

```javascript
import SchedApi from 'sched_api';

let apiInstance = new SchedApi.DefaultApi();
let shiftId = "shiftId_example"; // String | 
apiInstance.backendSchedApiViewsRemoveStudentFromShift(shiftId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **shiftId** | **String**|  | 

### Return type

[**ShiftSchema**](ShiftSchema.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## backendSchedApiViewsRemoveTaFromShift

> ShiftSchema backendSchedApiViewsRemoveTaFromShift(shiftId)

Remove Ta From Shift

### Example

```javascript
import SchedApi from 'sched_api';

let apiInstance = new SchedApi.DefaultApi();
let shiftId = "shiftId_example"; // String | 
apiInstance.backendSchedApiViewsRemoveTaFromShift(shiftId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **shiftId** | **String**|  | 

### Return type

[**ShiftSchema**](ShiftSchema.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## backendSchedApiViewsUnanswerQuestion

> QuestionSchema backendSchedApiViewsUnanswerQuestion(questionId)

Unanswer Question

### Example

```javascript
import SchedApi from 'sched_api';

let apiInstance = new SchedApi.DefaultApi();
let questionId = "questionId_example"; // String | 
apiInstance.backendSchedApiViewsUnanswerQuestion(questionId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **questionId** | **String**|  | 

### Return type

[**QuestionSchema**](QuestionSchema.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## backendSchedApiViewsUpdateSubject

> SubjectSchema backendSchedApiViewsUpdateSubject(subjectId, subjectCreateSchema)

Update Subject

### Example

```javascript
import SchedApi from 'sched_api';

let apiInstance = new SchedApi.DefaultApi();
let subjectId = "subjectId_example"; // String | 
let subjectCreateSchema = new SchedApi.SubjectCreateSchema(); // SubjectCreateSchema | 
apiInstance.backendSchedApiViewsUpdateSubject(subjectId, subjectCreateSchema, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **subjectId** | **String**|  | 
 **subjectCreateSchema** | [**SubjectCreateSchema**](SubjectCreateSchema.md)|  | 

### Return type

[**SubjectSchema**](SubjectSchema.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

