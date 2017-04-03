"use strict";
var InMemoryDataService = (function () {
    function InMemoryDataService() {
    }
    InMemoryDataService.prototype.createDb = function () {
        var users = [
            {
                id: 1,
                Name: "John Brown",
                Email: "john.brown@gmail.com",
                Kids: [
                    {
                        id: 1,
                        Name: "Mary Brown",
                        Gender: "Female",
                        Paths: [
                            {
                                id: 1,
                                Title: "Spanish",
                                Description: "Mary dreams about being a toreador. In this case Spanish will be useful",
                                Goals: [
                                    {
                                        id: 1,
                                        Title: "Achieve Basic level",
                                        Completed: true,
                                        GoalYear: 2017,
                                        GoalMonth: "Jul",
                                        Steps: [
                                            {
                                                id: 1,
                                                Text: "Start attanding Spanish classes",
                                                Completed: true
                                            },
                                            {
                                                id: 2,
                                                Text: "Try to speak inside the family",
                                                Completed: true
                                            },
                                            {
                                                id: 3,
                                                Text: "Complete school's exams",
                                                Completed: true
                                            }
                                        ]
                                    },
                                    {
                                        id: 2,
                                        Title: "Achieve Intermediate level",
                                        Completed: false,
                                        GoalYear: 2019,
                                        GoalMonth: "Dec",
                                        Steps: [
                                            {
                                                id: 4,
                                                Text: "Start attanding Spanish speaking clubs<",
                                                Completed: true
                                            },
                                            {
                                                id: 5,
                                                Text: "Find some Spanish friends",
                                                Completed: false
                                            },
                                            {
                                                id: 6,
                                                Text: "Complete university's exams",
                                                Completed: false
                                            },
                                            {
                                                id: 7,
                                                Text: "Complete at least 10 Spanish books",
                                                Completed: false
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                id: 2,
                                Title: "Dancing",
                                Description: "In order to be fast and flexible Mary should take some dancing classes",
                                Goals: [
                                    {
                                        id: 3,
                                        Title: "Learn some moves!",
                                        Completed: false,
                                        GoalYear: 2018,
                                        GoalMonth: "Nov",
                                        Steps: [
                                            {
                                                id: 8,
                                                Text: "Start attending dancing section",
                                                Completed: false
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                id: 3,
                                Title: "Mountaineering",
                                Description: "Sounds like a good skill to get to the top of everything!"
                            },
                        ]
                    },
                    {
                        id: 2,
                        Name: "Steave Brown",
                        Gender: "Male",
                        Paths: [
                            {
                                id: 4,
                                Title: "Guitar",
                                Description: "Steave loves music. Can something be better than a guitar?",
                                Goals: [
                                    {
                                        id: 4,
                                        Title: "Take first cords",
                                        Completed: false,
                                        GoalYear: 2017,
                                        GoalMonth: "Jun",
                                        Steps: [
                                            {
                                                id: 9,
                                                Text: "Buy the first guitar",
                                                Completed: false
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                id: 5,
                                Title: "Skying",
                                Description: "Sport is important too!"
                            },
                            {
                                id: 6,
                                Title: "Painting",
                                Description: "Looks like Steave is really talanted boy"
                            }
                        ]
                    }
                ]
            }
        ];
        return { users: users };
    };
    return InMemoryDataService;
}());
exports.InMemoryDataService = InMemoryDataService;
//# sourceMappingURL=in-memory-data.service.js.map