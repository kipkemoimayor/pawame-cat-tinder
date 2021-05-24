import React from 'react';
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

import '../styles/home-breeds.css';
import { ListBreeds } from '../utils/ListBreeds';
import { Error } from '../components/Error';
import Loader from "./Loader";

export class CatsHome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cats: [],
            errorState: false,
            loadingData: true
        };
    }

    componentDidMount() {
        this.getBreeds();
    }

    componentWillUnmount() {

    }

    async getBreeds() {
        let breeds = await ListBreeds(this.props).catch(e => {
            console.log('error', e);
            this.setState(state => ({
                cats: [],
                errorState: true,
                loadingData: false
            }));

        });
        this.setState(state => ({
            cats: breeds,
            loadingData: false
        }));
    }

    render() {
        if (this.state.loadingData) {
            return (
                <div className='container custom-container'>

                    <div className='row'>
                        <div className='col-md-2'></div>
                        <div className='col-md-8'>
                            {/* All cat breeds layout*/}
                            <div className='row'>
                                {[1, 2, 3, 4, 5, 6, 8, 7].map((number) =>
                                    <div key={number} className='col-md-6'>
                                        < Loader />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='col-md-2'></div>
                    </div>

                </div>
            )
        } else {
            if (!this.state.errorState) {
                const allBreeds = this.state.cats.slice();
                return (
                    <div className='container custom-container'>

                        <div className='row'>
                            <div className='col-md-2'></div>
                            <div className='col-md-8'>
                                {/* All cat breeds layout*/}
                                <div className='row'>
                                    {allBreeds.map((breed) =>
                                        <div key={breed.id} className='col-md-6 d-flex align-items-stretch custom-dip'>
                                            <div className='card detail-card'>
                                                <header> <h6>{breed.name}</h6></header>
                                                <div className='card-body'>
                                                    <div className='img-holder'>
                                                        <img src={breed.image ? breed.image.url : ''} className='card-img' alt='The cat' />
                                                    </div>

                                                    <div className='description'>
                                                        <p>{breed.description}</p>
                                                    </div>

                                                    <blockquote>
                                                        <small>Origin ~ {breed.origin}</small>
                                                    </blockquote>


                                                    <p><small>For more checkout</small> <a href={breed.wikipedia_url} target='_blank' rel='noreferrer' about=''>Wikipedia</a></p>
                                                </div>

                                                <div className='card-footer'>
                                                    <div className='vote-btn'>
                                                        <Link className='btn btn-outline-success' to={`/vote/${breed.image ? breed.image.id : ''}`} title='View Details to like'>View Details</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className='col-md-2'></div>
                        </div>

                    </div>
                )
            } else {
                return <Error errorMsg='Error Fetching Cats' />
            }
        }


    }
}