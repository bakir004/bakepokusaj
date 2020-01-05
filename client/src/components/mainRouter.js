import React from 'react';
import { BrowserRouter, Route } from "react-router-dom"
import CreateMedia from "./createMedia"
import Content from "./contentAndItemDetails"

const MainRouter = () => {
    return (
        <BrowserRouter>
            <Route path="/create" component={CreateMedia}></Route>
            <Route path="/" exact component={Content}></Route>
        </BrowserRouter>);
}

export default MainRouter;