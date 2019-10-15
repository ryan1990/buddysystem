import axios from 'axios';


export default class ApiService {
    // constructor(apiCaller) { // pass axios in as dependency
    //     this.apiCaller = apiCaller;
    // }

    constructor() {
    }

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

    async DoAxiosCall() {
        let uri = "https://jsonplaceholder.typicode.com/posts/1";
        let response;

        try {
            response = await axios.get(uri);
            console.log("GOOD");
        } catch (error) {
            console.log("ERROR, returning null");
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