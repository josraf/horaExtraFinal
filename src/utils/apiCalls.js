const axios = require("axios");


export function getAll() {
    return axios({
        "method": "GET",
        "url": "https://restcountries-v1.p.rapidapi.com/all",
        "headers": {
            "content-type": "application/octet-stream",
            "x-rapidapi-host": "restcountries-v1.p.rapidapi.com",
            "x-rapidapi-key": "ph7DVcjw7pmshP1TODgAQjbbxcpZp1l9wCBjsnsL7cpQeqg3st"
        }
    })
}

export function getByCountryName(countryName) {
    return axios({
        "method":"GET",
        "url":`https://restcountries-v1.p.rapidapi.com/name/${countryName}`,
        "headers":{
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"restcountries-v1.p.rapidapi.com",
            "x-rapidapi-key":"ph7DVcjw7pmshP1TODgAQjbbxcpZp1l9wCBjsnsL7cpQeqg3st"
        }
    })
}

export function getImagesByCountry(countryName) {
    return axios({
        "method":"GET",
        "url":`https://api.unsplash.com/search/photos?page=1&client_id=${process.env.REACT_APP_API_ACCESS_KEY}&query=${countryName}`,
    }).then( (response) => {
        let imgsUrl = [];
        response.data.results.map((data) => {
            imgsUrl.push(data.urls.regular);
        });
        return imgsUrl;
    });

}


