# SchedApi.DefaultApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**backendSchedApiViewsAnswerQuestion**](DefaultApi.md#backendSchedApiViewsAnswerQuestion) | **PUT** /sched_api/answer_question/{question_id} | Answer Question
[**backendSchedApiViewsCommentQuestion**](DefaultApi.md#backendSchedApiViewsCommentQuestion) | **PUT** /sched_api/comment/{question_id} | Comment Question
[**backendSchedApiViewsCreateQuestion**](DefaultApi.md#backendSchedApiViewsCreateQuestion) | **POST** /sched_api/question/{subject_id} | Create Question
[**backendSchedApiViewsCreateSchedule**](DefaultApi.md#backendSchedApiViewsCreateSchedule) | **POST** /sched_api/schedule{subject_name} | Create Schedule
[**backendSchedApiViewsCreateSubject**](DefaultApi.md#backendSchedApiViewsCreateSubject) | **POST** /sched_api/subject | Create Subject
[**backendSchedApiViewsCreateSwapRequest**](DefaultApi.md#backendSchedApiViewsCreateSwapRequest) | **POST** /sched_api/create_swap_request | Create Swap Request
[**backendSchedApiViewsCreateTaShift**](DefaultApi.md#backendSchedApiViewsCreateTaShift) | **POST** /sched_api/ta_shift/{subject_id} | Create Ta Shift
[**backendSchedApiViewsListQuestions**](DefaultApi.md#backendSchedApiViewsListQuestions) | **GET** /sched_api/questions/{subject_id} | List Questions
[**backendSchedApiViewsListSchools**](DefaultApi.md#backendSchedApiViewsListSchools) | **GET** /sched_api/schools | List Schools
[**backendSchedApiViewsListSchoolsPaginated**](DefaultApi.md#backendSchedApiViewsListSchoolsPaginated) | **GET** /sched_api/schools_paginated | List Schools Paginated
[**backendSchedApiViewsListSubjects**](DefaultApi.md#backendSchedApiViewsListSubjects) | **GET** /sched_api/subjects | List Subjects
[**backendSchedApiViewsListTaShifts**](DefaultApi.md#backendSchedApiViewsListTaShifts) | **GET** /sched_api/ta_shifts/{subject_id} | List Ta Shifts



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

> QuestionSchema backendSchedApiViewsCommentQuestion(questionId, content)

Comment Question

### Example

```javascript
import SchedApi from 'sched_api';

let apiInstance = new SchedApi.DefaultApi();
let questionId = "questionId_example"; // String | 
let content = "content_example"; // String | 
apiInstance.backendSchedApiViewsCommentQuestion(questionId, content, (error, data, response) => {
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
 **content** | **String**|  | 

### Return type

[**QuestionSchema**](QuestionSchema.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
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

> ScheduleSchema backendSchedApiViewsCreateSchedule(subjectName, scheduleSchemaCreate)

Create Schedule

### Example

```javascript
import SchedApi from 'sched_api';

let apiInstance = new SchedApi.DefaultApi();
let subjectName = "subjectName_example"; // String | 
let scheduleSchemaCreate = new SchedApi.ScheduleSchemaCreate(); // ScheduleSchemaCreate | 
apiInstance.backendSchedApiViewsCreateSchedule(subjectName, scheduleSchemaCreate, (error, data, response) => {
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
 **subjectName** | **String**|  | 
 **scheduleSchemaCreate** | [**ScheduleSchemaCreate**](ScheduleSchemaCreate.md)|  | 

### Return type

[**ScheduleSchema**](ScheduleSchema.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## backendSchedApiViewsCreateSubject

> SubjectSchema backendSchedApiViewsCreateSubject(subjectCreateSchema)

Create Subject

### Example

```javascript
import SchedApi from 'sched_api';

let apiInstance = new SchedApi.DefaultApi();
let subjectCreateSchema = new SchedApi.SubjectCreateSchema(); // SubjectCreateSchema | 
apiInstance.backendSchedApiViewsCreateSubject(subjectCreateSchema, (error, data, response) => {
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

> ShiftSchema backendSchedApiViewsCreateTaShift(subjectId, shiftSchemaCreate)

Create Ta Shift

### Example

```javascript
import SchedApi from 'sched_api';

let apiInstance = new SchedApi.DefaultApi();
let subjectId = "subjectId_example"; // String | 
let shiftSchemaCreate = new SchedApi.ShiftSchemaCreate(); // ShiftSchemaCreate | 
apiInstance.backendSchedApiViewsCreateTaShift(subjectId, shiftSchemaCreate, (error, data, response) => {
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
 **shiftSchemaCreate** | [**ShiftSchemaCreate**](ShiftSchemaCreate.md)|  | 

### Return type

[**ShiftSchema**](ShiftSchema.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
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

