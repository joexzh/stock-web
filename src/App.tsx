import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Menu, {Paths} from "./Menu";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {Paths.map(p => {
                    return (
                        <Route path={p.path} element={<p.el/>} key={p.path}/>
                    )
                })}
            </Routes>
            <Menu/>
        </BrowserRouter>
    );
}

export default App;
