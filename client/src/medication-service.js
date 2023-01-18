function medication() {

    get = function() {
        return axios.get('http://localhost:3000/medication');
    };

    return {
        get: get
    };
}