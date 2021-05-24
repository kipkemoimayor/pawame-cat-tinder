export const SaveVotesToLocalStorage = async vData => {
    let voteData = Object.assign({}, vData);

    let votes = getVotesFromStorage();
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

export const getVotesFromStorage = _ => {
    let votes = localStorage.getItem('votes');
    return JSON.parse(votes);
};

export const checkIfExist = catId => {
    let votes = getVotesFromStorage();
    return votes.find(cat => cat.image_id === catId);
};

export const getNextCat = (cats, index, catId) => {
    let nextCatImg = cats[index+1];
    return nextCatImg;
};