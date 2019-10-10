// import axios from 'axios';


export default class ApiService {
    constructor(apiCaller) { // pass axios in as dependency
        this.apiCaller = apiCaller;
    }
    
    DoAxiosCall(callback) {
        let uri = "https://jsonplaceholder.typicode.com/posts/1";
        this.apiCaller.get(uri)
            .then(function (response) {
                callback(response);
            })
            .catch(function (error) {
                if (error.response) {
                    callback(error.response);
                    // if (error.response.status === 404) {
                    //     callback(`\u2014`)
                    // }
                }
            })
    }
}