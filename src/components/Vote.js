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
                        </div>
                    </div>
                    <div className='col-md-3'></div>
                </div>

            </div>
        );
    }
}