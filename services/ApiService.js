import axios from 'axios';

// have username/userId be case-insensitive so user and AWS doesn't have to worry about case?

export default class ApiService {
    async GetUserSessions(userId) {
        // to be completed
    }

    async GetUserSessionsFakeSuccessWithSessions() {
        let response = {
            data: {
                sessions: [
                    {
                        userId:"ryan12",
                        sessionStartTime:"2019-10-13T18:25:43.511Z",
                        sessionLengthInSeconds:"955"
                    },
                    {
                        userId:"ryan12",
                        sessionStartTime:"2019-10-14T18:25:43.511Z",
                        sessionLengthInSeconds:"1202"
                    },
                    {
                        userId:"ryan12",
                        sessionStartTime:"2019-10-15T18:25:43.511Z",
                        sessionLengthInSeconds:"1202"
                    },
                    {
                        userId:"ryan12",
                        sessionStartTime:"2019-10-16T18:25:43.511Z",
                        sessionLengthInSeconds:"1202"
                    },
                    {
                        userId:"ryan12",
                        sessionStartTime:"2019-10-17T18:25:43.511Z",
                        sessionLengthInSeconds:"1202"
                    }
                ]
            },
            status: 200
        }

        return response;
    }

    // try empty and null sessions, also null data

    async UserExists(userId) {
        // to be completed

        // try catch
        // if doesn't go into catch, return response.
        // if does, return null
    }
    
    async UserExistsFakeTrue(userId) {
        response = {
            data: {
                userIdExists: true
            },
            status: 200
        }

        return response;
    }

    async UserExistsFakeFalse(userId) {
        response = {
            data: {
                userIdExists: false
            },
            status: 200
        }

        return response;
    }

    async UserExistsFakeErrorReturnNullResponse(userId) {
        return null;
    }

    async CreateUser(username) {
        // to be completed
    }

    async CreateUserFakeSuccess201() {
        response = {
            data: null, // the data JSON may vary
            status: 201
        }

        return response;
    }

    async CreateUserFakeErrorReturnNullResponse() {
        return null;
    }

    // user must exist. Code for that
    async UpdateUser(username, smartGoal, minutesPerDay, daysPerWeek) {
        // to be completed
    }

    async UpdateUserFakeSuccess201() {
        response = {
            data: null, // the data JSON may vary
            status: 200
        }

        return response;
    }

    async UpdateUserFakeErrorReturnNullResponse() {
        return null;
    }

    async SubmitPracticeSession() {
        // to be completed
    }

    async SubmitPracticeSessionFakeSuccess201() {
        response = {
            data: null, // the data JSON may vary
            status: 201
        }

        return response;
    }

    async SubmitPracticeSessionFakeErrorReturnNullResponse() {
        return null;
    }

    // Get existing user’s goal and commitment (minutes, days)
    async GetUserGoalAndCommitment(userId) {
        // to be completed
    }

    async GetUserGoalAndCommitmentFakeSuccess200() {
        response = {
            data: {
                userId:"ryan12",
                goal:"Learn to play Carol of the Bells on Piano by May 25th",
                commitment: {
                    minutesPerDay:10,
                    daysPerWeek:5
                }
            },
            status: 200
        }

        return response;
    }

    async GetUserGoalAndCommitmentFakeErrorReturnNullResponse() {
        return null;
    }

    async PostCallExperiment() {
        let uri = "https://jsonplaceholder.typicode.com/posts";

        let requestBody = JSON.stringify({
            title: 'foo',
            body: 'bar',
            userId: 1
        });

        try {
            let response = await axios.post(uri, requestBody);
            return response;
        } catch(error) {
            return error;

            // TODO: SEE other methods and consider returning error instead of null!
        }
    }

    async DoAxiosCall() {
        let uri = "https://jsonplaceholder.typicode.com/posts/1";
        let response;

        try {
            response = await axios.get(uri);
        } catch (error) {
            response = null;
            //response = error;
        }

        return response;
    }
}

// https://jsonplaceholder.typicode.com/posts/1
// resJson={"data":{"userId":1,"id":1,"title":"sunt aut facere repellat provident occaecati excepturi optio reprehenderit","body":"quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"},"status":200,"headers":{"server":"cloudflare","access-control-allow-credentials":"true","vary":"Origin, Accept-Encoding","x-powered-by":"Express","date":"Mon, 14 Oct 2019 23:30:35 GMT","content-type":"application/json; charset=utf-8","cache-control":"public, max-age=14400","cf-ray":"525d5789986c5562-ORD","expect-ct":"max-age=604800, report-uri=\"https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct\"","age":"2301","cf-cache-status":"HIT","via":"1.1 vegur","etag":"W/\"124-yiKdLzqO5gfBrJFrcdJ8Yq0LGnU\"","x-content-type-options":"nosniff","expires":"Tue, 15 Oct 2019 03:30:35 GMT"},"config":{"url":"https://jsonplaceholder.typicode.com/posts/1","method":"get","headers":{"Accept":"application/json, text/plain, */*"},"transformRequest":[null],"transformResponse":[null],"timeout":0,"xsrfCookieName":"XSRF-TOKEN","xsrfHeaderName":"X-XSRF-TOKEN","maxContentLength":-1},"request":{"UNSENT":0,"OPENED":1,"HEADERS_RECEIVED":2,"LOADING":3,"DONE":4,"readyState":4,"status":200,"timeout":0,"withCredentials":true,"upload":{},"_aborted":false,"_hasError":false,"_method":"GET","_response":"{\n
// \"userId\": 1,\n  \"id\": 1,\n  \"title\": \"sunt aut facere repellat provident occaecati excepturi optio reprehenderit\",\n  \"body\": \"quia et suscipit\\nsuscipit recusandae consequuntur expedita et cum\\nreprehenderit molestiae ut ut quas totam\\nnostrum rerum est autem sunt rem eveniet architecto\"\n}","_url":"https://jsonplaceholder.typicode.com/posts/1","_timedOut":false,"_trackingName":"unknown","_incrementalEvents":false,"responseHeaders":{"server":"cloudflare","access-control-allow-credentials":"true","vary":"Origin, Accept-Encoding","x-powered-by":"Express","date":"Mon, 14 Oct 2019 23:30:35 GMT","content-type":"application/json; charset=utf-8","Cache-Control":"public, max-age=14400","cf-ray":"525d5789986c5562-ORD","expect-ct":"max-age=604800, report-uri=\"https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct\"","age":"2301","cf-cache-status":"HIT","via":"1.1 vegur","etag":"W/\"124-yiKdLzqO5gfBrJFrcdJ8Yq0LGnU\"","x-content-type-options":"nosniff","expires":"Tue, 15 Oct 2019 03:30:35 GMT"},"_requestId":null,"_headers":{"accept":"application/json, text/plain, */*"},"_responseType":"","_sent":true,"_lowerCaseResponseHeaders":{"server":"cloudflare","access-control-allow-credentials":"true","vary":"Origin, Accept-Encoding","x-powered-by":"Express","date":"Mon, 14 Oct 2019 23:30:35 GMT","content-type":"application/json; charset=utf-8","cache-control":"public, max-age=14400","cf-ray":"525d5789986c5562-ORD","expect-ct":"max-age=604800, report-uri=\"https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct\"","age":"2301","cf-cache-status":"HIT","via":"1.1 vegur","etag":"W/\"124-yiKdLzqO5gfBrJFrcdJ8Yq0LGnU\"","x-content-type-options":"nosniff","expires":"Tue, 15 Oct 2019 03:30:35 GMT"},"_subscriptions":[],"responseURL":"https://jsonplaceholder.typicode.com/posts/1"}}

// https://jsonplaceholder.typicode.com/posts1/1
// resJson={"message":"Request failed with status code 404","name":"Error","stack":"createError@http://192.168.1.124:19001/node_modules/expo/AppEntry.bundle?platform=android&dev=true&minify=false&hot=false:124351:26\nsettle@http://192.168.1.124:19001/node_modules/expo/AppEntry.bundle?platform=android&dev=true&minify=false&hot=false:124341:25\nhandleLoad@http://192.168.1.124:19001/node_modules/expo/AppEntry.bundle?platform=android&dev=true&minify=false&hot=false:124245:15\ndispatchEvent@http://192.168.1.124:19001/node_modules/expo/AppEntry.bundle?platform=android&dev=true&minify=false&hot=false:29268:31\nsetReadyState@http://192.168.1.124:19001/node_modules/expo/AppEntry.bundle?platform=android&dev=true&minify=false&hot=false:29006:27\n__didCompleteResponse@http://192.168.1.124:19001/node_modules/expo/AppEntry.bundle?platform=android&dev=true&minify=false&hot=false:28848:29\nemit@http://192.168.1.124:19001/node_modules/expo/AppEntry.bundle?platform=android&dev=true&minify=false&hot=false:3877:42\n__callFunction@http://192.168.1.124:19001/node_modules/expo/AppEntry.bundle?platform=android&dev=true&minify=false&hot=false:3172:49\nhttp://192.168.1.124:19001/node_modules/expo/AppEntry.bundle?platform=android&dev=true&minify=false&hot=false:2929:31\n__guard@http://192.168.1.124:19001/node_modules/expo/AppEntry.bundle?platform=android&dev=true&minify=false&hot=false:3126:15\ncallFunctionReturnFlushedQueue@http://192.168.1.124:19001/node_modules/expo/AppEntry.bundle?platform=android&dev=true&minify=false&hot=false:2928:21\ncallFunctionReturnFlushedQueue@[native code]","config":{"url":"https://jsonplaceholder.typicode.com/posts1/1","method":"get","headers":{"Accept":"application/json, text/plain, */*"},"transformRequest":[null],"transformResponse":[null],"timeout":0,"xsrfCookieName":"XSRF-TOKEN","xsrfHeaderName":"X-XSRF-TOKEN","maxContentLength":-1}}

// https://jsonp555laceholder.typicode.com/posts1/1
// resJson={"message":"Network Error","name":"Error","stack":"createError@http://192.168.1.124:19001/node_modules/expo/AppEntry.bundle?platform=android&dev=true&minify=false&hot=false:124351:26\nhandleError@http://192.168.1.124:19001/node_modules/expo/AppEntry.bundle?platform=android&dev=true&minify=false&hot=false:124259:27\ndispatchEvent@http://192.168.1.124:19001/node_modules/expo/AppEntry.bundle?platform=android&dev=true&minify=false&hot=false:29268:31\nsetReadyState@http://192.168.1.124:19001/node_modules/expo/AppEntry.bundle?platform=android&dev=true&minify=false&hot=false:29021:33\n__didCompleteResponse@http://192.168.1.124:19001/node_modules/expo/AppEntry.bundle?platform=android&dev=true&minify=false&hot=false:28848:29\nemit@http://192.168.1.124:19001/node_modules/expo/AppEntry.bundle?platform=android&dev=true&minify=false&hot=false:3877:42\n__callFunction@http://192.168.1.124:19001/node_modules/expo/AppEntry.bundle?platform=android&dev=true&minify=false&hot=false:3172:49\nhttp://192.168.1.124:19001/node_modules/expo/AppEntry.bundle?platform=android&dev=true&minify=false&hot=false:2929:31\n__guard@http://192.168.1.124:19001/node_modules/expo/AppEntry.bundle?platform=android&dev=true&minify=false&hot=false:3126:15\ncallFunctionReturnFlushedQueue@http://192.168.1.124:19001/node_modules/expo/AppEntry.bundle?platform=android&dev=true&minify=false&hot=false:2928:21\ncallFunctionReturnFlushedQueue@[native code]","config":{"url":"https://jsonp555laceholder.typicode.com/posts1/1","method":"get","headers":{"Accept":"application/json, text/plain, */*"},"transformRequest":[null],"transformResponse":[null],"timeout":0,"xsrfCookieName":"XSRF-TOKEN","xsrfHeaderName":"X-XSRF-TOKEN","maxContentLength":-1}}