import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import React from ".";
import AdminPanel from "./components/adminPanel";
import Lottery from "./components/lottery";
import 'bootstrap/dist/css/bootstrap.min.css';
import UserList from "./components/adminPanel/userList";


function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Lottery />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin/userList" element={<UserList />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
