import Fetch from 'whatwg-fetch';

class WhatWgFetch {

    constructor(uri) {
        this.uri = uri;
    }

    checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response
        }
       throw new Error(response.statusText);
    }

    parseJSON(response) {
        return response.json()
    }

    prepareFetch(uri, method, headers, body) {
        return fetch(uri, {
            method: method,
            headers: headers,
            body: JSON.stringify(body)
        }).then(this.checkStatus).then(this.parseJSON);
    }

    get(id) {
        var uri = (id) ? this.uri + '/' + id : this.uri;
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
        return this.prepareFetch(uri, 'GET', headers);
    }

    post(data) {
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
        return this.prepareFetch(this.uri, 'POST', headers, data);
    }

    put(data) {
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
        return this.prepareFetch(this.uri + '/' + data.id, 'PUT', headers, data.text);
    }

    destroy(id) {
        var headers = {
            'Accept': 'application/json'
        };
        return this.prepareFetch(this.uri + '/' + id, 'DELETE', headers);
    }
}

const httpService = new WhatWgFetch('./todo');

export default httpService;
