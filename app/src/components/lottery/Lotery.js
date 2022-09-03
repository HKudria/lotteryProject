import React, {Component} from "react";
import Login from "../login";
import {NavLink} from "react-router-dom";

export default class Lottery extends Component{
    render() {
        return (
            <>
                this will be main logic
                <NavLink to='/admin'> Go to admin </NavLink>
            </>
        )
    }
}