import React from "react";

//css import
import '../styles/vote.css';

// data service import

import { GetCatDetails, SubVote, ListBreeds } from '../utils/ListBreeds';
import { SaveVotesToLocalStorage, checkIfExist, getNextCat } from '../utils/Common';
import { Error } from '../components/Error';
import Loader from "./Loader";


export class Vote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cat: null,
            allBreeds: [],
            errorState: false,
            errorMsg: '',
            currentImageIndex: 0
        };
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.getCatDetails(id);

        // get all breeds
        this.getBreeds();
    }

    componentDidUnMount() {

    }

    async userVote(dT, e) {
        e.preventDefault();
        let data = Object.assign({}, dT);

        console.log(data);
        await SubVote(data).then(response => {
            // success msg
            console.log(response);
            // move to next breed
            const vData = {
                image_id: dT.image_id,
                vote_id: response.id,
                value: dT.value
            };
            SaveVotesToLocalStorage(vData).then(_ => {
                // got to the next image
                // check if next cat img is already liked
                let catId = this.state.allBreeds[this.state.currentImageIndex].image.id;
                let catVoteExist = checkIfExist(catId);
                if (catVoteExist) {
                    // get next cat in the queue
                    console.log('This is exist');
                    let nextCat = getNextCat(this.state.allBreeds, this.state.currentImageIndex);
                    console.log(this.nextCat);
                    this.getCatDetails(nextCat.image.id);
                    this.props.history.push('/vote/' + catId);
                    // this.props.
                } else {
                    // cat has no vote 
                    console.log('Cat has no votes');
                    this.getCatDetails(this.state.allBreeds[this.state.currentImageIndex].image.id);
                    this.props.history.push('/vote/' + catId);
                }

                this.setState(state => ({
                    currentImageIndex: this.state.currentImageIndex += 1
                }));

            });
        }).catch(error => {
            // reason 
            console.log(error);
        });
    }


    async getCatDetails(catId) {

        // before fetching first check if cat has likes
        let hasVotes = checkIfExist(catId);
        console.log(hasVotes);
        if (hasVotes) {
            if(this.state.allBreeds.length){
                catId = getNextCat(this.state.allBreeds, this.state.currentImageIndex).image.id;
            }
        }
        let catDetails = await GetCatDetails(catId).catch(error => {
            this.setState(state => ({
                errorState: true,
                errorMsg: error.message
            }));
            console.log(error);
        });

        this.setState(state => ({
            cat: {
                detials: catDetails.breeds[0],
                other: catDetails
            }
        }));

        console.log(this.state.cat);

    }

    async getBreeds() {
        let breeds = await ListBreeds(this.props).catch(e => {
            console.log('error', e);
            this.setState(state => ({
                cats: [],
            }));

        });
        this.setState(state => ({
            allBreeds: breeds
        }));
        console.log(breeds);
    }


    render() {

        if (!this.state.errorState) {
            if (this.state.cat) {
                return (
                    <div className='container custom-container'>

                        <div className='row'>
                            <div className='col-md-3'></div>
                            <div className='col-md-6'>
                                {/* Voting layout here*/}
                                <div className='card'>
                                    <header>{this.state.cat.detials.name}</header>
                                    <div className='card-body'>
                                        <div className='vote-btn'>
                                            <button onClick={(e) => this.userVote({ image_id: this.state.cat.other.id, value: 0 }, e)} className='btn btn-outline-danger'>Dislike</button>
                                            <button onClick={(e) => this.userVote({ image_id: this.state.cat.other.id, value: 1 }, e)} className='btn btn-outline-success'>Like</button>
                                        </div>

                                        <div className='img-card'>
                                            <img src={this.state.cat.other.url} className='card-img-top' alt='The cat' />
                                        </div>
                                    </div>
                                    <div className='card-footer'>
                                        <div className='vote-btn'>
                                            <button className='btn btn-outline-success' title='View Details to like'>Add To Fav</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-3'></div>
                        </div>

                    </div>
                );
            } else {
                return (
                    <div className='row'>
                        <div className='col-md-3'></div>
                        <div className='col-md-6'>
                            <br />
                            <Loader />
                        </div>
                        <div className='col-md-3'></div>
                    </div>
                )
            }

        } else {
            return <Error errorMessage={this.state.errorMsg} />
        }

    }
}