export let tasksCollection = [
    {
        Id: 1,
        Name: "Project initiation",
        StartDate: new Date('04/02/2021'),
        EndDate: new Date('04/06/2021'),
        BaselineStartDate: new Date('04/02/2021'),
        BaselineEndDate: new Date('04/06/2021'),
    },
    {
        Id: 2,
        Name: "Identify site location",
        StartDate: new Date('04/02/2021'),
        EndDate: new Date('04/06/2021'),
        Progress: 30,
        ParentId: 1,
        BaselineStartDate: new Date('04/02/2021'),
        BaselineEndDate: new Date('04/10/2021'),
        resourceInfo: [{ Id: 1, Name: "Martin Tamer" ,MaxUnit:100}]
    },
    {
        Id: 3,
        Name: "Perform soil test",
        StartDate: new Date('04/08/2021'),
        EndDate: new Date('04/18/2021'),
        Progress: 40,
        ParentId: 1,
        BaselineStartDate: new Date('04/02/2021'),
        BaselineEndDate: new Date('04/10/2021'),
        resourceInfo: [{ Id: 1, Name: "Martin Tamer" ,MaxUnit:100}]
    },
    {
        Id: 4,
        Name: "Soil test approval",
        StartDate: new Date('04/08/2021'),
        EndDate: new Date('04/19/2021'),
        Progress: 30,
        ParentId: 1,
        BaselineStartDate: new Date('04/08/2021'),
        BaselineEndDate: new Date('04/15/2021'),
        resourceInfo: [{ Id: 3, Name: "Margaret Buchanan", MaxUnit: 100 }]
    },
    {
        Id: 5,
        Name: "Project initiation",
        StartDate: new Date('04/02/2021'),
        EndDate: new Date('04/08/2021'),
    },
    {
        Id: 6,
        Name: "Identify site location",
        StartDate: new Date('04/16/2021'),
        EndDate: new Date('04/22/2021'),
        Progress: 30,
        ParentId: 5,
        BaselineStartDate: new Date('04/02/2021'),
        BaselineEndDate: new Date('04/14/2021'),
        resourceInfo: [{ Id: 3, Name: "Margaret Buchanan", MaxUnit: 100 }]
    },
    {
        Id: 7,
        Name: "Perform soil test",
        StartDate: new Date('04/02/2021'),
        EndDate: new Date('04/03/2021'),
        Progress: 40,
        ParentId: 5,
        BaselineStartDate: new Date('04/02/2021'),
        BaselineEndDate: new Date('04/07/2021'),
        resourceInfo: [{ Id: 4, Name: "Fuller King", MaxUnit: 100}]
    },
    {
        Id: 8,
        Name: "Soil test approval",
        StartDate: new Date('04/02/2021'),
        EndDate: new Date('04/02/2021'),
        Progress: 30,
        ParentId: 5,
        BaselineStartDate: new Date('04/02/2021'),
        BaselineEndDate: new Date('04/06/2021'),
        resourceInfo: [{ Id: 5, Name: "Davolio Fuller", MaxUnit: 100 }]
    }
  ];
  export let resourceCollection = [
    { Id: 1, Name: "Martin Tamer" ,MaxUnit:100},
    { Id: 2, Name: "Rose Fuller", MaxUnit: 100 },
    { Id: 3, Name: "Margaret Buchanan", MaxUnit: 100 },
    { Id: 4, Name: "Fuller King", MaxUnit: 100},
    { Id: 5, Name: "Davolio Fuller", MaxUnit: 100 },
    { Id: 6, Name: "Laura Callahan", MaxUnit: 100 },
    { Id: 7, Name: "Andrew Fuller", MaxUnit: 100 },
    { Id: 8, Name: "Nancy Davolio", MaxUnit: 100 },
    { Id: 9, Name: "Janet Leverling", MaxUnit: 100 }
  ];
  
  export let TaskDataCollection  = [
    { TaskID: 1,TaskName: "Product concept", StartDate: new Date(2026, 3, 2), EndDate: new Date(2026, 3, 8), Duration: "5 days" },
    { TaskID: 2,TaskName: "Defining the product usage", StartDate: new Date(2026, 3, 2), EndDate: new Date(2026, 3, 8), Duration: "3", Progress: 30, ParentTaskID: 1 },
    { TaskID: 3,TaskName: "Defining the target audience", StartDate: new Date(2026, 3, 2), EndDate: new Date(2026, 3, 4), Duration: "3", Progress: 40, ParentTaskID: 1 },
    { TaskID: 4,TaskName: "Prepare product sketch and notes", StartDate: new Date(2026, 3, 5), EndDate: new Date(2026, 3, 8), Duration: "2", Progress: 30, ParentTaskID: 1, Predecessor: "2" },
    { TaskID: 5,TaskName: "Concept approval", StartDate: new Date(2026, 3, 8), EndDate: new Date(2026, 3, 8), Duration: "0", Predecessor: "3,4", ParentTaskID: 1 },
    { TaskID: 6,TaskName: "Market research", StartDate: new Date(2026, 3, 9), EndDate: new Date(2026, 3, 18), Predecessor: "2", Duration: "4", Progress: 30 },
    { TaskID: 7,TaskName: "Demand analysis", StartDate: new Date(2026, 3, 9), EndDate: new Date(2026, 3, 12), Duration: "4", Progress: 40, ParentTaskID: 6 },
    { TaskID: 8,TaskName: "Customer strength", StartDate: new Date(2026, 3, 9), EndDate: new Date(2026, 3, 12), Duration: "4", Progress: 30, ParentTaskID: 7, Predecessor: "5" },
    { TaskID: 9,TaskName: "Market opportunity analysis", StartDate: new Date(2026, 3, 9), EndDate: new Date(2026, 3, 12), Duration: "4", ParentTaskID: 7, Predecessor: "5" },
    { TaskID: 10,TaskName: "Competitor analysis", StartDate: new Date(2026, 3, 15), EndDate: new Date(2026, 3, 18), Duration: "4", Progress: 30, ParentTaskID: 6, Predecessor: "7,8" },
    { TaskID: 11,TaskName: "Product strength analysis", StartDate: new Date(2026, 3, 15), EndDate: new Date(2026, 3, 18), Duration: "4", Progress: 40, ParentTaskID: 6, Predecessor: "9" },
    { TaskID: 12,TaskName: "Research completed", StartDate: new Date(2026, 3, 18), EndDate: new Date(2026, 3, 18), Duration: "0", Progress: 30, ParentTaskID: 6, Predecessor: "10" },
    { TaskID: 13,TaskName: "Product design and development", StartDate: new Date(2026, 3, 19), EndDate: new Date(2026, 4, 16), Duration: "20", Predecessor: "6" },
    { TaskID: 14,TaskName: "Functionality design", StartDate: new Date(2026, 3, 19), EndDate: new Date(2026, 3, 23), Duration: "3", Progress: 30, ParentTaskID: 13, Predecessor: "12" },
    { TaskID: 15,TaskName: "Quality design", StartDate: new Date(2026, 3, 19), EndDate: new Date(2026, 3, 23), Duration: "3", Progress: 40, ParentTaskID: 13, Predecessor: "12" },
    { TaskID: 16,TaskName: "Define reliability", StartDate: new Date(2026, 3, 24), EndDate: new Date(2026, 3, 25), Duration: "2", Progress: 30, ParentTaskID: 13, Predecessor: "15" },
    { TaskID: 17,TaskName: "TaskIDentifying raw materials", StartDate: new Date(2026, 3, 24), EndDate: new Date(2026, 3, 25), Duration: "2", ParentTaskID: 13, Predecessor: "15" },
    { TaskID: 18,TaskName: "Define cost plan", StartDate: new Date(2026, 3, 26), EndDate: new Date(2026, 3, 29), Duration: "2", Progress: 30, ParentTaskID: 13, Predecessor: "17" },
    { TaskID: 19,TaskName: "Manufacturing cost", StartDate: new Date(2026, 3, 26), EndDate: new Date(2026, 3, 29), Duration: "2", Progress: 40, ParentTaskID: 18, Predecessor: "17" },
    { TaskID: 20,TaskName: "Selling cost", StartDate: new Date(2026, 3, 26), EndDate: new Date(2026, 3, 29), Duration: "2", Progress: 30, ParentTaskID: 18, Predecessor: "17" },
    { TaskID: 21,TaskName: "Development of final design", StartDate: new Date(2026, 3, 30), EndDate: new Date(2026, 4, 8), Duration: "7", ParentTaskID: 13 },
    { TaskID: 22,TaskName: "Develop dimensions and design", StartDate: new Date(2026, 3, 30), EndDate: new Date(2026, 4, 1), Duration: "2", Progress: 30, ParentTaskID: 21, Predecessor: "19,20" },
    { TaskID: 23,TaskName: "Develop designs to meet industry", StartDate: new Date(2026, 4, 2), EndDate: new Date(2026, 4, 3), Duration: "2", Progress: 40, ParentTaskID: 21, Predecessor: "22" },
    { TaskID: 24,TaskName: "Include all the details", StartDate: new Date(2026, 4, 6), EndDate: new Date(2026, 4, 8), Duration: "3", Progress: 30, ParentTaskID: 21, Predecessor: "23" },
    { TaskID: 25,TaskName: "Project closure", StartDate: new Date(2026, 4, 9), EndDate: new Date(2026, 4, 13), Duration: "3", Predecessor: "24" },
  ];

  export let taskCollection = [
    {
        TaskID: 1,
        TaskName: "Project initiation",
        StartDate: new Date('03/29/2024'),
        EndDate: new Date('04/02/2024'),
        resourceInfo: [3],
        Duration: 3,
    },
    {
        TaskID: 2,
        TaskName: "Identify site location",
        StartDate: new Date('03/29/2024'),
        EndDate: new Date('04/02/2024'),
        Duration: 3,
        resourceInfo: [1]
    },
    {
        TaskID: 3,
        TaskName: "Perform soil test",
        StartDate: new Date('03/29/2024'),
        EndDate: new Date('04/03/2024'),
        Duration: 4,
        resourceInfo: [1],
    },
  
    {
        TaskID: 5,
        TaskName: "Project estimation",
        StartDate: new Date('03/29/2024'),
        EndDate: new Date('04/02/2024'),
        resourceInfo: [3],
        Duration: 3,
    }
  ];
  export let resourcesCollection = [
    { resourceId: 1, resourceName: 'Martin Tamer', resourceGroup: 'Planning Team' },
        { resourceId: 2, resourceName: 'Rose Fuller', resourceGroup: 'Testing Team' },
        { resourceId: 3, resourceName: 'Margaret Buchanan', resourceGroup: 'Approval Team' },
        { resourceId: 4, resourceName: 'Fuller King', resourceGroup: 'Development Team' },
        { resourceId: 5, resourceName: 'Davolio Fuller', resourceGroup: 'Approval Team' },
  
  ];

  export let tasksCollect: Object[] = [
    {
        TaskID: 1,
        TaskName: 'Product Concept',
        StartDate: new Date('04/02/2019'),
        EndDate: new Date('04/21/2019'),
        subtasks: [
            { TaskID: 2, TaskName: 'Defining the product and its usage', BaselineStartDate: new Date('04/02/2019'), BaselineEndDate: new Date('04/06/2019'), StartDate: new Date('04/02/2019'), Duration: 3,Progress: 100 },
            { TaskID: 3, TaskName: 'Defining target audience', StartDate: new Date('04/02/2019'), Duration: 3,Predecessor: "2",Progress: 100,
        },
            { TaskID: 4, TaskName: 'Prepare product sketch and notes', StartDate: new Date('04/02/2019'), Duration: 3,Progress: 100 ,Predecessor: "3" },
        ]
    },
    { TaskID: 5, TaskName: 'Concept Approval', StartDate: new Date('04/02/2019'), Duration: 0,Predecessor: "4",Progress: 100, },
    {
        TaskID: 6,
        TaskName: 'Market Research',
        StartDate: new Date('04/02/2019'),
        EndDate: new Date('04/21/2019'),
        subtasks: [
            { TaskID: 7, TaskName: 'Competitor Analysis', StartDate: new Date('04/04/2019'), Duration: 4 ,Progress: 100,Predecessor: "5" },
            { TaskID: 8, TaskName: 'Product strength analysis', StartDate: new Date('04/04/2019'),Progress: 100, Duration: 4,Predecessor: "7"   },
            { TaskID: 9, TaskName: 'Research complete', StartDate: new Date('04/04/2019'),Progress: 100, Duration: 0,Predecessor: "8" }
        ]
    }
];