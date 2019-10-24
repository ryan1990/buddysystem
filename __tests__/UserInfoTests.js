//https://www.valentinog.com/blog/jest/

//import { UserInfo } from '../components/UserInfo';
// import React from 'react';
// import { Button, Text, View } from 'react-native';
// import Hey from '../components/UserInfo';
import UserInfo from '../components/UserInfo';

describe("dateConvertFromUtcToLocal", () => {
    test("returns correct date -420 min timezone", () => {
        let utcDate = "2019-10-22T23:31:33.198Z";
        let dateTimeOffsetMinutes = -420;
        let expected = new Date(Date.parse("2019-10-22T16:31:33.198Z"));

        let userInfoClass = new UserInfo();

        expect(userInfoClass.dateConvertFromUtcToLocal(utcDate, dateTimeOffsetMinutes)).toEqual(expected);
    }),
    test("returns correct date -360 min timezone", () => {
        let utcDate = "2019-10-22T23:31:33.198Z";
        let dateTimeOffsetMinutes = -360;
        let expected = new Date(Date.parse("2019-10-22T17:31:33.198Z"));

        let userInfoClass = new UserInfo();

        expect(userInfoClass.dateConvertFromUtcToLocal(utcDate, dateTimeOffsetMinutes)).toEqual(expected);
    })
})

describe("dateConvertFromLocalToUtc", () => {
    test("returns correct date -420 min timezone", () => {
        let localDate = new Date(Date.parse("2019-10-22T16:31:33.198Z"));
        let dateTimeOffsetMinutes = -420;
        let expected = "2019-10-22T23:31:33.198Z";

        let userInfoClass = new UserInfo();

        expect(userInfoClass.dateConvertFromLocalToUtc(localDate, dateTimeOffsetMinutes)).toEqual(expected);
    }),
    test("returns correct date -360 min timezone", () => {
        let localDate = new Date(Date.parse("2019-10-22T17:31:33.198Z"));
        let dateTimeOffsetMinutes = -360;
        let expected = "2019-10-22T23:31:33.198Z";

        let userInfoClass = new UserInfo();

        expect(userInfoClass.dateConvertFromLocalToUtc(localDate, dateTimeOffsetMinutes)).toEqual(expected);
    })
})

// TEMP may break soon because of PST fall back.
// Don't expect this to pass at any time or location
describe("getPreviousSundayAtMidnight", () => {
    test("returns correct date", () => {
        let date = new Date(Date.parse("2019-10-17T21:11:42.298Z")); 
        let dateTimeOffsetMinutes = 0;
        let expected = new Date(Date.parse("2019-10-13T07:00:00.000Z"));

        let userInfoClass = new UserInfo();

        let actual = userInfoClass.getPreviousSundayAtMidnight(date, dateTimeOffsetMinutes);

        expect(actual).toEqual(expected);

    })
    // test("returns correct date", () => {
    //     let date = new Date(Date.parse("2019-10-17T21:11:42.298Z")); 
    //     let dateTimeOffsetMinutes = -420;
    //     let expected = new Date(Date.parse("2019-10-13T00:00:00.000Z"));

    //     let userInfoClass = new UserInfo();

    //     expect(userInfoClass.getPreviousSundayAtMidnight(date, dateTimeOffsetMinutes)).toEqual(expected);

    //     //https://medium.com/codeclan/mocking-es-and-commonjs-modules-with-jest-mock-37bbb552da43

    //     //UserInfo.weekWasSuccessful(weekStart, weekEnd, commitment);

    //     // jest.mock('./UserInfo', () => () => ({
    //     //     successfulWeeks: 0
    //     // }));
    // })
})

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

describe("successfulDaysWithinPeriod", () => {
    test("exact week with dateTimeOffsetMinutes = 0", () => {
        let periodStart = new Date(Date.parse("2019-10-06T00:00:00.000Z"));
        let periodEnd = new Date(Date.parse("2019-10-13T00:00:00.000Z"));
        let minutesPerDay = 10;
        let dateTimeOffsetMinutes = 0;

        let expected = 5;

        let userInfoClass = new UserInfo();

        let actual = userInfoClass.successfulDaysWithinPeriod(userSessions, periodStart, periodEnd, minutesPerDay, dateTimeOffsetMinutes);
        
        expect(actual).toEqual(expected);
    }),
    test("tue through sat with dateTimeOffsetMinutes = 0", () => {
        let periodStart = new Date(Date.parse("2019-10-08T00:00:00.000Z"));
        let periodEnd = new Date(Date.parse("2019-10-13T00:00:00.000Z"));
        let minutesPerDay = 10;
        let dateTimeOffsetMinutes = 0;

        let expected = 4;

        let userInfoClass = new UserInfo();

        let actual = userInfoClass.successfulDaysWithinPeriod(userSessions, periodStart, periodEnd, minutesPerDay, dateTimeOffsetMinutes);
        
        expect(actual).toEqual(expected);
    }),
    test("sun through part of sat including successful sat session with dateTimeOffsetMinutes = 0", () => {
        let periodStart = new Date(Date.parse("2019-10-06T00:00:00.000Z"));
        let periodEnd = new Date(Date.parse("2019-10-12T05:00:00.000Z"));
        let minutesPerDay = 10;
        let dateTimeOffsetMinutes = 0;

        let expected = 5;

        let userInfoClass = new UserInfo();

        let actual = userInfoClass.successfulDaysWithinPeriod(userSessions, periodStart, periodEnd, minutesPerDay, dateTimeOffsetMinutes);
        
        expect(actual).toEqual(expected);
    }),
    test("sun through part of sat excluding successful sat session with dateTimeOffsetMinutes = 0", () => {
        let periodStart = new Date(Date.parse("2019-10-06T00:00:00.000Z"));
        let periodEnd = new Date(Date.parse("2019-10-12T00:00:01.000Z"));
        let minutesPerDay = 10;
        let dateTimeOffsetMinutes = 0;

        let expected = 4;

        let userInfoClass = new UserInfo();

        let actual = userInfoClass.successfulDaysWithinPeriod(userSessions, periodStart, periodEnd, minutesPerDay, dateTimeOffsetMinutes);
        
        expect(actual).toEqual(expected);
    }),
    test("2 hour window sun with dateTimeOffsetMinutes = 0", () => {
        let periodStart = new Date(Date.parse("2019-10-06T20:00:00.298Z"));
        let periodEnd = new Date(Date.parse("2019-10-06T22:00:00.298Z"));
        let minutesPerDay = 10;
        let dateTimeOffsetMinutes = 0;

        let expected = 1;

        let userInfoClass = new UserInfo();

        let actual = userInfoClass.successfulDaysWithinPeriod(userSessions, periodStart, periodEnd, minutesPerDay, dateTimeOffsetMinutes);
        
        expect(actual).toEqual(expected);
    })//,
    // test("2 hour window sun with dateTimeOffsetMinutes = 120", () => {
    //     let periodStart = new Date(Date.parse("2019-10-06T20:00:00.298Z"));
    //     let periodEnd = new Date(Date.parse("2019-10-06T22:00:00.298Z"));
    //     let minutesPerDay = 10;
    //     let dateTimeOffsetMinutes = 120;

    //     let expected = 0;

    //     let userInfoClass = new UserInfo();

    //     let actual = userInfoClass.successfulDaysWithinPeriod(userSessions, periodStart, periodEnd, minutesPerDay, dateTimeOffsetMinutes);
        
    //     expect(actual).toEqual(expected);
    // })//,
    // test("2 hour window sun with dateTimeOffsetMinutes = -120", () => {
    //     let periodStart = new Date(Date.parse("2019-10-06T22:00:00.298Z"));
    //     let periodEnd = new Date(Date.parse("2019-10-06T24:00:00.298Z"));
    //     let minutesPerDay = 10;
    //     let dateTimeOffsetMinutes = -120;

    //     let expected = 0;

    //     let userInfoClass = new UserInfo();

    //     let actual = userInfoClass.successfulDaysWithinPeriod(userSessions, periodStart, periodEnd, minutesPerDay, dateTimeOffsetMinutes);
        
    //     expect(actual).toEqual(expected);
    // })

    // offset both ways
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
    test("sunday with dateTimeOffsetMinutes = 0 WITH MS input", () => {
        let periodStartMs = 1570320000000;//Date.parse("2019-10-06T00:00:00.000Z");
        let periodEndMs = 1570406400000;//Date.parse("2019-10-07T00:00:00.000Z");

        let dateTimeOffsetMinutes = 0;
        let expectedResult = [{
            userId:"ryan12",
            sessionStartTime:"2019-10-06T21:11:42.298Z", // sun
            sessionLengthInSeconds:"600"
        }];

        let userInfoClass = new UserInfo();

        let actualResult = userInfoClass.sessionsStartingWithinPeriod(userSessions, periodStartMs, periodEndMs, dateTimeOffsetMinutes);

        expect(actualResult).toEqual(expectedResult);
    })//,
    ///////
    
    
    test("sunday with dateTimeOffsetMinutes = 0", () => {
        let periodStartMs = Date.parse("2019-10-06T00:00:00.000Z");
        let periodEndMs = Date.parse("2019-10-07T00:00:00.000Z");
        let dateTimeOffsetMinutes = 0;
        let expectedResult = [{
            userId:"ryan12",
            sessionStartTime:"2019-10-06T21:11:42.298Z", // sun
            sessionLengthInSeconds:"600"
        }];

        let userInfoClass = new UserInfo();

        let actualResult = userInfoClass.sessionsStartingWithinPeriod(userSessions, periodStartMs, periodEndMs, dateTimeOffsetMinutes);

        expect(actualResult).toEqual(expectedResult);
    }),
    test("wednesday with dateTimeOffsetMinutes = 0", () => {
        let periodStartMs = Date.parse("2019-10-09T00:00:00.000Z");
        let periodEndMs = Date.parse("2019-10-10T00:00:00.000Z");
        let dateTimeOffsetMinutes = 0;
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

        let actualResult = userInfoClass.sessionsStartingWithinPeriod(userSessions, periodStartMs, periodEndMs, dateTimeOffsetMinutes);
        expect(actualResult).toEqual(expectedResult);
    }),
    test("thursday with dateTimeOffsetMinutes = 0", () => {
        let periodStartMs = Date.parse("2019-10-10T00:00:00.000Z");
        let periodEndMs = Date.parse("2019-10-11T00:00:00.000Z");
        let dateTimeOffsetMinutes = 0;
        let expectedResult = [];

        let userInfoClass = new UserInfo();

        let actualResult = userInfoClass.sessionsStartingWithinPeriod(userSessions, periodStartMs, periodEndMs, dateTimeOffsetMinutes);

        expect(actualResult).toEqual(expectedResult);
    }),
    test("thursday with dateTimeOffsetMinutes = -3*60 = -180", () => {
        let periodStartMs = Date.parse("2019-10-10T00:00:00.000Z");
        let periodEndMs = Date.parse("2019-10-11T00:00:00.000Z");
        let dateTimeOffsetMinutes = -3*60;
        let expectedResult = [{
            userId:"ryan12",
            sessionStartTime:"2019-10-11T00:02:00.333Z", // fri
            sessionLengthInSeconds:"1100"
        }];

        let userInfoClass = new UserInfo();

        let actualResult = userInfoClass.sessionsStartingWithinPeriod(userSessions, periodStartMs, periodEndMs, dateTimeOffsetMinutes);

        expect(actualResult).toEqual(expectedResult);
    }),
    test("whole week with dateTimeOffsetMinutes = 0", () => {
        let periodStartMs = Date.parse("2019-10-06T00:00:00.000Z");
        let periodEndMs = Date.parse("2019-10-13T00:00:00.000Z");
        let dateTimeOffsetMinutes = 0;
        let expectedResult = userSessions;

        let userInfoClass = new UserInfo();

        let actualResult = userInfoClass.sessionsStartingWithinPeriod(userSessions, periodStartMs, periodEndMs, dateTimeOffsetMinutes);

        expect(actualResult).toEqual(expectedResult);
    }),
    test("thursday through sunday dateTimeOffsetMinutes = 0", () => {
        let periodStartMs = Date.parse("2019-10-10T00:00:00.000Z");
        let periodEndMs = Date.parse("2019-10-13T00:00:00.000Z");
        let dateTimeOffsetMinutes = 0;
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

        let actualResult = userInfoClass.sessionsStartingWithinPeriod(userSessions, periodStartMs, periodEndMs, dateTimeOffsetMinutes);

        expect(actualResult).toEqual(expectedResult);
    }),
    test("thursday through sunday dateTimeOffsetMinutes = 24*60 = 1440", () => {
        let periodStartMs = Date.parse("2019-10-10T00:00:00.000Z");
        let periodEndMs = Date.parse("2019-10-13T00:00:00.000Z");
        let dateTimeOffsetMinutes = 24*60;
        let expectedResult = [{
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
        }];

        let userInfoClass = new UserInfo();

        let actualResult = userInfoClass.sessionsStartingWithinPeriod(userSessions, periodStartMs, periodEndMs, dateTimeOffsetMinutes);

        expect(actualResult).toEqual(expectedResult);
    })
})



// function filterByTerm(inputArr, searchTerm) {
//     let regex = new RegExp(searchTerm, "i");
//     return inputArr.filter(function(arrayElement) {
//         return arrayElement.url.match(regex);
//     });
// }

// describe("Filter function", () => {
//     test("it should filter by a search term (link)", () => {
//         let input = [
//             { id: 1, url: "https://www.url1.dev" },
//             { id: 2, url: "https://www.url2.dev" },
//             { id: 3, url: "https://www.link3.dev" }
//         ];

//         let output = [{ id: 3, url: "https://www.link3.dev" }];

//         expect(filterByTerm(input, "link")).toEqual(output);

//         expect(filterByTerm(input, "LINK")).toEqual(output);
//     });
// });