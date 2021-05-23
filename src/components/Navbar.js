import React from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";
import { CatsHome } from "./CatsHome";

export class Navbar extends React.Component {
    render() {
        return (
            <Router>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark" >

                    <Link className="navbar-brand" to="/">
                        Mern
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
                                <Link className="nav-link" to="/vote">
                                    Vote <span className="sr-only"></span>
                                </Link>
                            </li>

                            <li className="nav-item active">
                                <Link className="nav-link" to="/breeds">
                                    Breeds <span className="sr-only"></span>
                                </Link>

                            </li>
                        </ul>
                    </div>
                </nav>

                <Switch>
                    {/* <Route exact path='/'>

                        </Route> */}

                    <Route path='/breeds'>
                        <CatsHome />
                    </Route>
                </Switch>
            </Router>
        );
    }
}
