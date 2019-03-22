import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux'
import Posts from './Posts'
import NewPost from './NewPost'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import {LoadingBar} from 'react-redux-loading'
import SinglePost from "./SinglePost";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import '../index.css';
import Categories from "./Categories";

library.add(faEllipsisV)

class App extends Component {
    render() {
        return (
            <Router>
                <Fragment>
                    <LoadingBar/>
                    <div className="container-fluid padding-0">
                        <img src="http://placehold.it/1920x300" alt="" className="img-fluid"/>
                    </div>
                    <div className="container">
                        <div className="row marver-15">
                            <div className="col">
                                <Link to={`/`} className="btn btn-success btn-cyan btn-sm mright-5">Home</Link>
                                <Categories/>
                            </div>
                            <div className="col text-right">
                                <NewPost/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <Route path="/" exact component={Posts} />
                                <Route path="/:category" exact component={Posts} />
                                <Route path="/:category/:post_id" {...this.props} component={SinglePost} />
                            </div>
                        </div>
                    </div>
                </Fragment>
            </Router>
        );
    }
}

export default connect()(App)
