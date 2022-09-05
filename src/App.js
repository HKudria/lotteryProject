import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import React from ".";
import AdminPanel from "./components/adminPanel";
import Lottery from "./components/lottery";


function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Lottery />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
