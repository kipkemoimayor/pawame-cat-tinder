
const request = {
    headers: { 'x-api-key': '727fe739-d55b-4ebd-a8af-8d591c4adcb5' }
};

function ListBreeds(props) {
    return new Promise((resolve, reject) => {
        fetch('https://api.thecatapi.com/v1/breeds', request).then(response => {
            resolve(response.json());
        }).catch(error => {
            reject(error);
        });
    });
}

export default ListBreeds;