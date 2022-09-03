
import axios from "axios";
import React, {Component} from "react";
import Login from "../login";

export default class AdminPanel extends Component {
    constructor() {
        super();
        this.state = {
            auth: false,
            loginError: false,
            loginShort: false,
        }
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        this.checkAuth()

    }

    checkAuth() {
        axios
            .get("./api/checkAuth.php")
            .then(res => {
                this.setState({
                    auth: res.data.auth
                })
            })
    }

    login(pass) {
        if (pass.length > 5) {
            axios
                .post("./api/login.php", {"password": pass})
                .then(res => {
                    this.setState({
                        auth: res.data.auth,
                        loginError: !res.data.auth,
                        loginShort: false,
                    })
                })
        } else {
            this.setState({
                loginError: false,
                loginShort: true
            })
        }
    }

    logout() {
        axios
            .get("./api/logout.php")
            .then(()=>{
                window.location.replace("/");
            })
    }

    render() {
        const {auth, loginError, loginShort} = this.state;

        if (!auth) {
            return <Login login={this.login} loginShort={loginShort} loginError={loginError}/>
        }

        return (
            <>

            </>
        );
    }


}