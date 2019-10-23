//https://www.valentinog.com/blog/jest/

//import { UserInfo } from '../components/UserInfo';
// import React from 'react';
// import { Button, Text, View } from 'react-native';
// import Hey from '../components/UserInfo';
import UserInfo from '../components/UserInfo';

describe("dateConvertFromUtcToLocal", () => {
    test("returns correct date 420 min timezone", () => {
        let utcDate = "2019-10-22T23:31:33.198Z";
        let dateTimeOffsetMinutes = 420;
        let expected = new Date(Date.parse("2019-10-22T16:31:33.198Z"));

        let userInfoClass = new UserInfo();

        expect(userInfoClass.dateConvertFromUtcToLocal(utcDate, dateTimeOffsetMinutes)).toEqual(expected);
    }),
    test("returns correct date 360 min timezone", () => {
        let utcDate = "2019-10-22T23:31:33.198Z";
        let dateTimeOffsetMinutes = 360;
        let expected = new Date(Date.parse("2019-10-22T17:31:33.198Z"));

        let userInfoClass = new UserInfo();

        expect(userInfoClass.dateConvertFromUtcToLocal(utcDate, dateTimeOffsetMinutes)).toEqual(expected);
    })
})

describe("dateConvertFromLocalToUtc", () => {
    test("returns correct date 420 min timezone", () => {
        let localDate = new Date(Date.parse("2019-10-22T16:31:33.198Z"));
        let dateTimeOffsetMinutes = 420;
        let expected = "2019-10-22T23:31:33.198Z";

        let userInfoClass = new UserInfo();

        expect(userInfoClass.dateConvertFromLocalToUtc(localDate, dateTimeOffsetMinutes)).toEqual(expected);
    }),
    test("returns correct date 360 min timezone", () => {
        let localDate = new Date(Date.parse("2019-10-22T17:31:33.198Z"));
        let dateTimeOffsetMinutes = 360;
        let expected = "2019-10-22T23:31:33.198Z";

        let userInfoClass = new UserInfo();

        expect(userInfoClass.dateConvertFromLocalToUtc(localDate, dateTimeOffsetMinutes)).toEqual(expected);
    })
})

describe("getPreviousSundayAtMidnight", () => {
    test("returns correct date", () => {
        let date = new Date(Date.parse("2019-10-15T21:11:42.298Z")); 
        let dateTimeOffsetMinutes = 420;
        let expected = new Date(Date.parse("2019-10-13T00:00:00.000Z"));

        let userInfoClass = new UserInfo();

        expect(userInfoClass.getPreviousSundayAtMidnight(date, dateTimeOffsetMinutes)).toEqual(expected);

        //https://medium.com/codeclan/mocking-es-and-commonjs-modules-with-jest-mock-37bbb552da43

        //UserInfo.weekWasSuccessful(weekStart, weekEnd, commitment);

        // jest.mock('./UserInfo', () => () => ({
        //     successfulWeeks: 0
        // }));
    })
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

describe("successfulDaysInWeek", () => {
    test("returns correct value", () => {
        let sessions = [{
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
        }];
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