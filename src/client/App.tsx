import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Sightings from "./views/Sightings";
import SightingDetails from "./views/SightingDetails";
import Create from "./views/Create";
import Edit from "./views/Edit";

const App = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <main className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/create" element={<Create />} />
                    <Route path="/sightings" element={<Sightings />} />
                    <Route path="/sightings/:id" element={<SightingDetails />} />
                    <Route path="/sightings/:id/edit" element={<Edit />} />
                    <Route path="/login" element={<h1>login</h1>} />
                    <Route path="/register" element={<h1>register</h1>} />
                </Routes>
            </main>
        </BrowserRouter>
    );
};

export default App;
