import React from 'react';
import {Route, BrowserRouter, Routes} from "react-router-dom";
import AdminPanel from "./components/adminPanel";
import Lottery from "./components/lottery";

export default function App() {
    return (
        <BrowserRouter basename='/mrBlackLotery/deploy/'>
            <Routes>
                <Route exact path="/" element={<Lottery />} />
                <Route path="/admin" element={<AdminPanel />} />
            </Routes>
        </BrowserRouter>
    );
}
