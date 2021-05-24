import { BrowserRouter as Router, Link, Route } from "react-router-dom";

import { ListBreeds } from '../utils/ListBreeds';
import { getVotesFromStorage } from '../utils/Common';
import Loader from "./Loader";


import React, { useState, useEffect } from "react";

const Favorite = () => {
    const [hasError, setErrors] = useState(false);
    let [breeds, setBreeds] = useState([]);
    let loading = true;

    useEffect(() => {
        async function fetchCats() {
            await ListBreeds()
                .then(res => {
                    setBreeds(res);
                })
                .catch(err => setErrors(err));
        }

        fetchCats();

    });

    if (breeds) {
        let favBreeds = getVotesFromStorage('fav');
        if (favBreeds) {
            favBreeds = favBreeds.map(fav => fav.image_id);
            let newFav = breeds.filter(breed => {
                let imgId = breed.image ? breed.image.id : null;
                if (favBreeds.includes(imgId)) {
                    return breed;
                }
            });

            breeds = newFav;
            loading = false;
        } else {
            breeds = null;
            loading = false;
        }
    }
    if (loading) {
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
        if (breeds) {
            return (
                <div className='container custom-container'>

                    <div className='row'>
                        <div className='col-md-2'></div>
                        <div className='col-md-8'>
                            {/* All cat breeds layout*/}
                            <div className='row'>
                                {breeds.map((breed) =>
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
            return (
                <div className='alert alert-info'>No Favorite at the moment</div>
            )
        }
    }
};
export default Favorite;