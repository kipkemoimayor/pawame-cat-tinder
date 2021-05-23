import React from 'react';

import '../styles/home-breeds.css';
import { ListBreeds } from '../utils/ListBreeds';

export class CatsHome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cats: []
        };
    }

    componentDidMount() {
        this.getBreeds();
    }

    componentWillUnmount() {

    }

    async getBreeds() {
        let breeds = await ListBreeds(this.props).catch(e => {
            console.log('error', e)
        });
        this.setState(state => ({
            cats: breeds
        }));
        console.log(breeds)
    }

    render() {
        const allBreeds = this.state.cats.slice(0, 10);
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
                                                <img src={breed.image.url} className='card-img' alt='The cat' />
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
                                                <button className='btn btn-outline-success' title='View Details to like'>View Details</button>
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
    }
}