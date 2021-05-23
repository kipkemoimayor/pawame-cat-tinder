import React from 'react';

export class Error extends React.Component {
    constructor(props) {
        super(props);
        this.reloadPage = this.reloadPage.bind(this);
    }

    reloadPage() {
        window.location.reload();
    }

    render() {
        return (
            <div>
                <div className='alert alert-danger'>
                    <p className='err-msg'>An error occured </p>
                    <p className='err-msg'>{this.props.errorMsg} </p>
                    <button onClick={this.reloadPage} className='btn btn-outline-info'>Reload</button>
                </div>

                <hr />
                <div className='err-gif'>
                    <img src='https://media.giphy.com/media/xUPGcEliCc7bETyfO8/giphy.gif' alt='err' />
                </div>
            </div>
        )
    }
}