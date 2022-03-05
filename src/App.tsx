import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menu, { Paths } from "./Menu";

function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={<div>loading...</div>} >
                <Routes>
                    {Paths.map(p => {
                        return (
                            <Route path={p.path} element={<p.el />} key={p.path} />
                        )
                    })}
                </Routes>
            </Suspense>
            <Menu />
        </BrowserRouter>
    );
}

export default App;
