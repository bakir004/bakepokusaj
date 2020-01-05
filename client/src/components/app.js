import React, { Component } from 'react';
import Sidebar from './sidebar';
import MainRouter from "./mainRouter"

class App extends Component {

    render() {

        return (
            <div className="row">
                <div className="col-lg-2">
                    <Sidebar></Sidebar>
                </div>
                <div className="col-lg-10">
                    <MainRouter></MainRouter>
                </div>
            </div>);
    }
}

export default App;