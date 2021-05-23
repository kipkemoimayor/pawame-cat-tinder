import React from 'react';

import ListBreeds from '../utils/ListBreeds';

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

    async getBreeds() {
        let breeds = await ListBreeds(this.props).catch(e => {
            console.log('error',e)
        });
        console.log(breeds);
    }

    render() {
        let name = 'Bambucha';
        return (
            <div>Hello Cats {name}</div>
        )
    }
}