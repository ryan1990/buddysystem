import UserInfo from "../components/UserInfo";

describe("getWeeksSubtracted", () => {
    test("subtract 1 week", () => {
        let date = new Date(Date.parse("2019-10-15T21:11:42.298Z"));
        let weeks = 1;
        let expected = new Date(Date.parse("2019-10-08T21:11:42.298Z"));

        let userInfoClass = new UserInfo();

        expect(userInfoClass.getWeeksSubtracted(date, weeks)).toEqual(expected);
    }),
    test("subtract 3 weeks", () => {
        let date = new Date(Date.parse("2019-10-15T21:11:42.298Z"));
        let weeks = 3;
        let expected = new Date(Date.parse("2019-09-24T21:11:42.298Z"));

        let userInfoClass = new UserInfo();

        expect(userInfoClass.getWeeksSubtracted(date, weeks)).toEqual(expected);
    }),
    test("subtract 0 weeks", () => {
        let date = new Date(Date.parse("2019-10-15T21:11:42.298Z"));
        let weeks = 0;
        let expected = new Date(Date.parse("2019-10-15T21:11:42.298Z"));

        let userInfoClass = new UserInfo();

        expect(userInfoClass.getWeeksSubtracted(date, weeks)).toEqual(expected);
    }),
    test("subtract -2 weeks", () => {
        let date = new Date(Date.parse("2019-10-15T21:11:42.298Z"));
        let weeks = -2;
        let expected = new Date(Date.parse("2019-10-29T21:11:42.298Z"));

        let userInfoClass = new UserInfo();

        expect(userInfoClass.getWeeksSubtracted(date, weeks)).toEqual(expected);
    })
})

describe("successfulWeekStreakUntilGivenTime", () => {
    jest.mock("../components/UserInfo");
    const userInfoMockInstance = new UserInfo();
    userInfoMockInstance.getPreviousSundayAtMidnight = jest.fn().mockImplementation(() => {
        return new Date("2019-10-13T07:00:00.000Z");
    });
    
    test("returns 1 for a successful last week", () => {
        let userSessions1 = [{
            userId:"ryan12",
            sessionStartTime:"2019-10-07T15:11:42.298Z", // mon
            sessionLengthInSeconds:"800"
        },
        {
            userId:"ryan12",
            sessionStartTime:"2019-10-12T15:02:00.333Z", // sat
            sessionLengthInSeconds:"700"
        }];

        let commitment = {
            minutesPerDay:10,
            daysPerWeek:2
        };

        let givenTime = new Date(Date.parse("2019-10-16T10:00:00.000Z")); // won't matter with mock
        let expected = 1;
        let actual = userInfoMockInstance.successfulWeekStreakUntilGivenTime(userSessions1, commitment, givenTime);
        expect(actual).toEqual(expected);
    }),
    test("returns 0 for an empty week", () => {
        const userInfoMockInstanceDeepPast = new UserInfo();
        userInfoMockInstanceDeepPast.getPreviousSundayAtMidnight = jest.fn().mockImplementation(() => {
            return new Date("1990-01-03T07:00:00.000Z"); // wed
        });

        let userSessions1 = [{
            userId:"ryan12",
            sessionStartTime:"2019-10-07T15:11:42.298Z", // mon
            sessionLengthInSeconds:"800"
        },
        {
            userId:"ryan12",
            sessionStartTime:"2019-10-12T15:02:00.333Z", // sat
            sessionLengthInSeconds:"700"
        }];

        let commitment = {
            minutesPerDay:10,
            daysPerWeek:2
        };
        
        let givenTime = new Date(Date.parse("2018-02-02T10:00:00.000Z")); // won't matter with mock
        let actual = userInfoMockInstanceDeepPast.successfulWeekStreakUntilGivenTime(userSessions1, commitment, givenTime);
        let expected = 0;
        expect(actual).toEqual(expected);
    }),
    test("returns 2 for successful last 2 weeks", () => {
        let userSessions2 = [{
            userId:"ryan12",
            sessionStartTime:"2019-09-30T15:11:42.298Z", // mon
            sessionLengthInSeconds:"800"
        },
        {
            userId:"ryan12",
            sessionStartTime:"2019-10-05T15:02:00.333Z", // sat
            sessionLengthInSeconds:"700"
        },
        {
            userId:"ryan12",
            sessionStartTime:"2019-10-07T15:11:42.298Z", // mon
            sessionLengthInSeconds:"800"
        },
        {
            userId:"ryan12",
            sessionStartTime:"2019-10-12T15:02:00.333Z", // sat
            sessionLengthInSeconds:"700"
        }];
        
        let commitment = {
            minutesPerDay:10,
            daysPerWeek:2
        };
        let givenTime = new Date(Date.parse("2019-10-16T10:00:00.000Z")); // won't matter with mock
        let expected = 2;
        let actual = userInfoMockInstance.successfulWeekStreakUntilGivenTime(userSessions2, commitment, givenTime);

        expect(actual).toEqual(expected);
    })
})

let userSessions = [{
    userId:"ryan12",
    sessionStartTime:"2019-10-06T21:11:42.298Z", // sun
    sessionLengthInSeconds:"600"
},
{
    userId:"ryan12",
    sessionStartTime:"2019-10-07T21:11:42.298Z", // mon
    sessionLengthInSeconds:"500"
},
{
    userId:"ryan12",
    sessionStartTime:"2019-10-08T00:02:00.333Z", // tue
    sessionLengthInSeconds:"700"
},
{
    userId:"ryan12",
    sessionStartTime:"2019-10-09T00:02:00.333Z", // wed
    sessionLengthInSeconds:"200"
},
{
    userId:"ryan12",
    sessionStartTime:"2019-10-09T23:02:00.333Z", // wed
    sessionLengthInSeconds:"500"
},
{
    userId:"ryan12",
    sessionStartTime:"2019-10-11T00:02:00.333Z", // fri
    sessionLengthInSeconds:"1100"
},
{
    userId:"ryan12",
    sessionStartTime:"2019-10-12T00:02:00.333Z", // sat
    sessionLengthInSeconds:"700"
}];

describe("weekWasSuccessful", () => {
    jest.mock("../components/UserInfo");
    const userInfoMockInstance = new UserInfo();
    userInfoMockInstance.successfulDaysWithinPeriod = jest.fn().mockImplementation(() => {
        return 5;
    });

    test("returns true for successfulDaysInWeek = daysPerWeek", () => {
        let weekStart = new Date(Date.parse("2019-10-06T00:00:00.000Z"));
        let weekEnd = new Date(Date.parse("2019-10-13T00:00:00.000Z"));
        let commitment = {
            minutesPerDay:10,
            daysPerWeek:5
        };

        let expected = true;
        let actual = userInfoMockInstance.weekWasSuccessful(userSessions, weekStart, weekEnd, commitment);

        expect(actual).toEqual(expected);
    }),
    test("returns false for successfulDaysInWeek < daysPerWeek", () => {
        let weekStart = new Date(Date.parse("2019-10-06T00:00:00.000Z"));
        let weekEnd = new Date(Date.parse("2019-10-13T00:00:00.000Z"));
        let commitment = {
            minutesPerDay:10,
            daysPerWeek:6
        };

        let expected = false;
        let actual = userInfoMockInstance.weekWasSuccessful(userSessions, weekStart, weekEnd, commitment);

        expect(actual).toEqual(expected);
    }),
    test("returns true for successfulDaysInWeek > daysPerWeek", () => {
        let weekStart = new Date(Date.parse("2019-10-06T00:00:00.000Z"));
        let weekEnd = new Date(Date.parse("2019-10-13T00:00:00.000Z"));
        let commitment = {
            minutesPerDay:10,
            daysPerWeek:1
        };

        let expected = true;
        let actual = userInfoMockInstance.weekWasSuccessful(userSessions, weekStart, weekEnd, commitment);

        expect(actual).toEqual(expected);
    }),
    test("returns false for empty week", () => {
        let weekStart = new Date(Date.parse("2019-09-29T00:00:00.000Z"));
        let weekEnd = new Date(Date.parse("2019-10-06T00:00:00.000Z"));
        let commitment = {
            minutesPerDay:10,
            daysPerWeek:5
        };

        let userInfoClass = new UserInfo();

        let expected = false;
        let actual = userInfoClass.weekWasSuccessful(userSessions, weekStart, weekEnd, commitment);

        expect(actual).toEqual(expected);
    })
})

describe("successfulDaysWithinPeriod", () => {
    test("exact week", () => {
        let periodStart = new Date(Date.parse("2019-10-06T00:00:00.000Z"));
        let periodEnd = new Date(Date.parse("2019-10-13T00:00:00.000Z"));
        let minutesPerDay = 10;
        let expected = 5;

        let userInfoClass = new UserInfo();

        let actual = userInfoClass.successfulDaysWithinPeriod(userSessions, periodStart, periodEnd, minutesPerDay);
        
        expect(actual).toEqual(expected);
    }),
    test("tue through sat", () => {
        let periodStart = new Date(Date.parse("2019-10-08T00:00:00.000Z"));
        let periodEnd = new Date(Date.parse("2019-10-13T00:00:00.000Z"));
        let minutesPerDay = 10;
        let expected = 4;

        let userInfoClass = new UserInfo();

        let actual = userInfoClass.successfulDaysWithinPeriod(userSessions, periodStart, periodEnd, minutesPerDay);
        
        expect(actual).toEqual(expected);
    }),
    test("sun through part of sat including successful sat session", () => {
        let periodStart = new Date(Date.parse("2019-10-06T00:00:00.000Z"));
        let periodEnd = new Date(Date.parse("2019-10-12T05:00:00.000Z"));
        let minutesPerDay = 10;
        let expected = 5;

        let userInfoClass = new UserInfo();

        let actual = userInfoClass.successfulDaysWithinPeriod(userSessions, periodStart, periodEnd, minutesPerDay);
        
        expect(actual).toEqual(expected);
    }),
    test("sun through part of sat excluding successful sat session", () => {
        let periodStart = new Date(Date.parse("2019-10-06T00:00:00.000Z"));
        let periodEnd = new Date(Date.parse("2019-10-12T00:00:01.000Z"));
        let minutesPerDay = 10;
        let expected = 4;

        let userInfoClass = new UserInfo();

        let actual = userInfoClass.successfulDaysWithinPeriod(userSessions, periodStart, periodEnd, minutesPerDay);
        
        expect(actual).toEqual(expected);
    }),
    test("2 hour window sun", () => {
        let periodStart = new Date(Date.parse("2019-10-06T20:00:00.298Z"));
        let periodEnd = new Date(Date.parse("2019-10-06T22:00:00.298Z"));
        let minutesPerDay = 10;
        let expected = 1;

        let userInfoClass = new UserInfo();

        let actual = userInfoClass.successfulDaysWithinPeriod(userSessions, periodStart, periodEnd, minutesPerDay);
        
        expect(actual).toEqual(expected);
    })
})

describe("sumSessionLengths", () => {
    test("test for correct sum", () => {
        let userInfoClass = new UserInfo();

        let actualResult = userInfoClass.sumSessionLengths(userSessions);
        let expectedResult = 4300;
        expect(actualResult).toEqual(expectedResult);
    })
})

describe("sessionsStartingWithinPeriod", () => {
    test("sunday", () => {
        let periodStartMs = Date.parse("2019-10-06T00:00:00.000Z");
        let periodEndMs = Date.parse("2019-10-07T00:00:00.000Z");
        let expectedResult = [{
            userId:"ryan12",
            sessionStartTime:"2019-10-06T21:11:42.298Z", // sun
            sessionLengthInSeconds:"600"
        }];

        let userInfoClass = new UserInfo();

        let actualResult = userInfoClass.sessionsStartingWithinPeriod(userSessions, periodStartMs, periodEndMs);

        expect(actualResult).toEqual(expectedResult);
    }),
    test("wednesday", () => {
        let periodStartMs = Date.parse("2019-10-09T00:00:00.000Z");
        let periodEndMs = Date.parse("2019-10-10T00:00:00.000Z");
        let expectedResult = [{
            userId:"ryan12",
            sessionStartTime:"2019-10-09T00:02:00.333Z", // wed
            sessionLengthInSeconds:"200"
        },
        {
            userId:"ryan12",
            sessionStartTime:"2019-10-09T23:02:00.333Z", // wed
            sessionLengthInSeconds:"500"
        }];

        let userInfoClass = new UserInfo();

        let actualResult = userInfoClass.sessionsStartingWithinPeriod(userSessions, periodStartMs, periodEndMs);
        expect(actualResult).toEqual(expectedResult);
    }),
    test("thursday", () => {
        let periodStartMs = Date.parse("2019-10-10T00:00:00.000Z");
        let periodEndMs = Date.parse("2019-10-11T00:00:00.000Z");
        let expectedResult = [];

        let userInfoClass = new UserInfo();

        let actualResult = userInfoClass.sessionsStartingWithinPeriod(userSessions, periodStartMs, periodEndMs);

        expect(actualResult).toEqual(expectedResult);
    }),
    test("whole week", () => {
        let periodStartMs = Date.parse("2019-10-06T00:00:00.000Z");
        let periodEndMs = Date.parse("2019-10-13T00:00:00.000Z");
        let expectedResult = userSessions;

        let userInfoClass = new UserInfo();

        let actualResult = userInfoClass.sessionsStartingWithinPeriod(userSessions, periodStartMs, periodEndMs);

        expect(actualResult).toEqual(expectedResult);
    }),
    test("thursday through sunday", () => {
        let periodStartMs = Date.parse("2019-10-10T00:00:00.000Z");
        let periodEndMs = Date.parse("2019-10-13T00:00:00.000Z");
        let expectedResult = [{
            userId:"ryan12",
            sessionStartTime:"2019-10-11T00:02:00.333Z", // fri
            sessionLengthInSeconds:"1100"
        },
        {
            userId:"ryan12",
            sessionStartTime:"2019-10-12T00:02:00.333Z", // sat
            sessionLengthInSeconds:"700"
        }];

        let userInfoClass = new UserInfo();

        let actualResult = userInfoClass.sessionsStartingWithinPeriod(userSessions, periodStartMs, periodEndMs);

        expect(actualResult).toEqual(expectedResult);
    })
})
