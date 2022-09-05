import React, {Component} from "react";
import Login from "../login";
import CreateLottery from "../createLottery";

export default class AdminPanel extends Component {
       state = {
            auth: false,
            loginError: false,
            loginShort: false,
        }

    componentDidMount() {
        this.checkAuth()
    }

    checkAuth() {
        fetch('http://localhost/mrBlackLotery/api/checkAuth.php', {
            crossDomain: true,
            method: 'GET',
            withCredentials: true
        }).then(response => response.json())
            .then(res => {
                this.setState({
                    auth: res.auth
                })
            })
    }

    login = (pass) => {
        if (pass.length > 5) {
            fetch('http://localhost/mrBlackLotery/api/login.php', {
                crossDomain: true,
                method: 'POST',
                withCredentials: true,
                body: JSON.stringify({
                    'password': pass
                })
            }).then(response => response.json())
                .then(res => {
                    this.setState({
                        auth: res.auth
                    })
                }).then(response => response.json())
                .then(res => {
                    this.setState({
                        auth: res.auth,
                        loginError: !res.auth,
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

    render() {
        const {auth, loginError, loginShort} = this.state;

        if (!auth) {
            return <Login login={this.login} loginShort={loginShort} loginError={loginError}/>
        }

        return (
            <>
                <CreateLottery/>
            </>
        );
    }


}