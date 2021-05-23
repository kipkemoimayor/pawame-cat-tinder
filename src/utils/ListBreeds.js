
const request = {
    headers: { 'x-api-key': '727fe739-d55b-4ebd-a8af-8d591c4adcb5' }
};

const apiUrls = {
    breedsUrl: 'https://api.thecatapi.com/v1/breeds',
    catDetailUrl: 'https://api.thecatapi.com/v1/images/',
    allImageUrl: 'https://api.thecatapi.com/v1/images/search',
    voteUrl: 'https://api.thecatapi.com/v1/votes'
};

function ListBreeds(props) {
    return new Promise((resolve, reject) => {
        fetch(apiUrls.breedsUrl, request).then(response => {
            resolve(response.json());
        }).catch(error => {
            reject(error);
        });
    });
}

function GetData(props) {
    let url = Object.assign({}, props.apiUrl);
    return new Promise((resolve, reject) => {
        fetch(url.apiUrl, request).then(response => {
            resolve(response.json());
        }).catch(error => {
            reject(error);
        });
    });
}

function GetCatDetails(id) {
    return new Promise((resolve, reject) => {
        fetch(apiUrls.catDetailUrl + id, request).then(response => {
            resolve(response.json());
        }).catch(error => {
            reject(error);
        });
    });
}

function SubVote(data) {
    let params = {
        method: 'POST',
        body: data
    }
    let requestCopy = Object.assign(params, request);
    return new Promise((resolve, reject) => {
        fetch(apiUrls.voteUrl, requestCopy).then(response => {
            resolve(response.json());
        }).catch(error => {
            reject(error);
        });
    });
}

module.exports = { ListBreeds, GetData, GetCatDetails, SubVote };