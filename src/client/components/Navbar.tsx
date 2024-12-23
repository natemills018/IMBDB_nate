import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="bg-warning">
            <Link className="btn btn-dark m-2" to={"/"}>
                Home
            </Link>
            <Link className="btn btn-dark m-2" to={"/sightings"}>
                Sightings
            </Link>
            <Link className="btn btn-dark m-2" to={"/create"}>
                New Sighting
            </Link>
            <Link className="btn btn-dark m-2" to={"/login"}>
                Login
            </Link>
            <Link className="btn btn-dark m-2" to={"/register"}>
                Register
            </Link>
        </div>
    );
};

export default Navbar;
