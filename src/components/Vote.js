import React from "react";

//css import
import '../styles/vote.css';

// data service import

import { GetCatDetails, SubVote } from '../utils/ListBreeds';
import { Error } from '../components/Error';
import Loader from "./Loader";


export class Vote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cat: null,
            errorState: false,
            errorMsg: ''
        };
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.getCatDetails(id);
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
        }).catch(error => {
            // reason 
            console.log(error);
        });
    }


    async getCatDetails(catId) {
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