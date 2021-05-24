import React from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";
import { CatsHome } from "./CatsHome";
import { Vote } from "./Vote";
import Favorite from '../components/Favorite';

export class Navbar extends React.Component {
    render() {
        return (
            <Router>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark" >

                    <Link className="navbar-brand" to="/">
                        Pawame Cats Tinder
                    </Link>


                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/favorite">
                                    Favorites <span className="sr-only"></span>
                                </Link>
                            </li>

                            <li className="nav-item active">
                                <Link className="nav-link" to="/">
                                    Breeds <span className="sr-only"></span>
                                </Link>

                            </li>
                        </ul>
                    </div>
                </nav>

                <Switch>
                    <Route path='/vote/:id' render={(props) => <Vote {...props} />}>
                        {/* <Vote /> */}
                    </Route>
                    <Route path='/favorite'>
                        <Favorite />
                    </Route>
                    <Route exact path='/'>
                        <CatsHome />
                    </Route>
                </Switch>
            </Router>
        );
    }
}
