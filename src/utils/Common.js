export const SaveVotesToLocalStorage = async vData => {
    let voteData = Object.assign({}, vData);

    let votes = getVotesFromStorage('votes');
    if (!votes) {
        let newVotes = JSON.stringify([voteData]);
        localStorage.setItem('votes', newVotes);
    } else {
        // votes exist

        votes.push(voteData);
        votes = JSON.stringify(votes);
        localStorage.setItem('votes', votes);
    }

};

export const addToFavToLocalStorage = cats => {
    let favList = getVotesFromStorage('fav');
    if (!favList) {
        let catsStore = [];
        catsStore.push(cats);
        let newFav = JSON.stringify(catsStore);
        localStorage.setItem('fav', newFav);
    } else {
        // votes exist
        let store = [...favList, cats];
        store = JSON.stringify(store);
        localStorage.setItem('fav', store);
    }
};

export const removeFavFromStorage = id => {
    let favList = getVotesFromStorage('fav');
    if (!favList) { return; }
    console.log(favList);
    let newFav = favList.filter(fav => fav.image_id !== id);
    newFav = JSON.stringify(newFav);
    localStorage.setItem('fav', newFav);
};

export const getVotesFromStorage = key => {
    let votes = localStorage.getItem(key);
    return JSON.parse(votes);
};

export const checkIfExist = (catId, key = 'votes') => {
    let votes = getVotesFromStorage(key);
    console.log(votes);
    if (!votes) { return null; }
    return votes.find(cat => cat.image_id === catId);
};

export const getNextCat = (cats, index, catId) => {
    let nextCatImg = cats[index + 1];
    return nextCatImg;
};