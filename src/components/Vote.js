import React from "react";

//css import
import '../styles/vote.css';


export class Vote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }


    render() {
        return (
            <div className='container custom-container'>

                <div className='row'>
                    <div className='col-md-3'></div>
                    <div className='col-md-6'>
                        {/* Voting layout here*/}
                        <div className='card'>
                            <header>The Cat</header>
                            <div className='card-body'>
                                <div className='vote-btn'>
                                    <button className='btn btn-outline-danger'>Dislike</button>
                                    <button className='btn btn-outline-success'>Like</button>
                                </div>

                                <div className='img-top card-img'>
                                    <img src='' className='img-responsive img-top card-top' alt='The cat' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3'></div>
                </div>

            </div>
        );
    }
}